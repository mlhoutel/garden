<script lang="ts">
	import { onMount } from 'svelte';
	import TopicPill from '$components/global/TopicPill.svelte';
	import { MEDIA_API, MEDIA_TOKEN_KEY } from '$utils/media';
	import type { MediaEntry } from '$types/types';

	type Status = 'loading' | 'token' | 'error' | 'ready';

	let status = $state<Status>('loading');
	let tokenInput = $state('');
	let tokenMessage = $state('');
	let entries = $state<MediaEntry[]>([]);
	let isAdmin = $state(false);

	// Filters (all client-side, like the search page)
	let searchTerm = $state('');
	let selectedTopics = $state<Set<string>>(new Set());
	let selectedType = $state('');

	let filtered = $derived.by(() => {
		let list = entries;
		if (selectedType) list = list.filter((e) => e.type === selectedType);
		if (selectedTopics.size > 0) {
			list = list.filter((e) => [...selectedTopics].every((t) => e.topics.includes(t)));
		}
		if (searchTerm.trim()) {
			const term = searchTerm.toLowerCase().trim();
			list = list.filter(
				(e) =>
					e.title.toLowerCase().includes(term) ||
					e.author.toLowerCase().includes(term) ||
					e.note.toLowerCase().includes(term)
			);
		}
		return list;
	});

	let allTypes = $derived.by(() => {
		const counts = new Map<string, number>();
		for (const e of entries) counts.set(e.type, (counts.get(e.type) ?? 0) + 1);
		return [...counts.entries()].sort((a, b) => b[1] - a[1]);
	});

	let allTopics = $derived.by(() => {
		const counts = new Map<string, number>();
		for (const e of entries) for (const t of e.topics) counts.set(t, (counts.get(t) ?? 0) + 1);
		return [...counts.entries()].sort((a, b) => b[1] - a[1]);
	});

	onMount(() => {
		const token = localStorage.getItem(MEDIA_TOKEN_KEY);
		if (token) load(token);
		else status = 'token';
	});

	async function load(token: string) {
		status = 'loading';
		let response: Response;
		try {
			response = await fetch(`${MEDIA_API}/entries`, {
				headers: { Authorization: `Bearer ${token}` }
			});
		} catch {
			status = 'error';
			return;
		}
		if (response.status === 401 || response.status === 403) {
			localStorage.removeItem(MEDIA_TOKEN_KEY);
			tokenMessage = 'Invalid token, try again';
			status = 'token';
			return;
		}
		if (!response.ok) {
			status = 'error';
			return;
		}
		const data = await response.json();
		localStorage.setItem(MEDIA_TOKEN_KEY, token);
		entries = data.entries;
		isAdmin = data.role === 'admin';
		status = 'ready';
	}

	function submitToken(event: SubmitEvent) {
		event.preventDefault();
		if (tokenInput.trim()) load(tokenInput.trim());
	}

	function toggleTopic(topic: string) {
		const next = new Set(selectedTopics);
		if (next.has(topic)) next.delete(topic);
		else next.add(topic);
		selectedTopics = next;
	}

	function clearFilters() {
		searchTerm = '';
		selectedType = '';
		selectedTopics = new Set();
	}

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function authHeaders(): Record<string, string> {
		return { Authorization: `Bearer ${localStorage.getItem(MEDIA_TOKEN_KEY) ?? ''}` };
	}

	// ─── Add panel (admin only) ───

	let showForm = $state(false);
	let editingId = $state<string | null>(null);
	let formError = $state('');
	let fetchingMeta = $state(false);
	let saving = $state(false);
	let form = $state({
		url: '',
		title: '',
		type: 'article',
		author: '',
		year: new Date().getFullYear(),
		topics: '',
		rating: 0,
		note: ''
	});

	function resetForm() {
		editingId = null;
		formError = '';
		form = {
			url: '',
			title: '',
			type: form.type,
			author: '',
			year: new Date().getFullYear(),
			topics: '',
			rating: 0,
			note: ''
		};
	}

	function startEdit(entry: MediaEntry) {
		editingId = entry.id;
		formError = '';
		form = {
			url: entry.url,
			title: entry.title,
			type: entry.type,
			author: entry.author,
			year: entry.year ?? new Date().getFullYear(),
			topics: entry.topics.join(', '),
			rating: entry.rating ?? 0,
			note: entry.note
		};
		showForm = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	async function fetchMeta() {
		if (!form.url.trim()) return;
		fetchingMeta = true;
		formError = '';
		try {
			const response = await fetch(`${MEDIA_API}/meta?url=${encodeURIComponent(form.url.trim())}`, {
				headers: authHeaders()
			});
			const data = await response.json();
			if (!response.ok) {
				formError = data.error ?? 'metadata fetch failed';
			} else {
				if (data.title) form.title = data.title;
				if (data.author) form.author = data.author;
				if (data.url) form.url = data.url;
				if (data.warning) formError = data.warning;
			}
		} catch {
			formError = 'metadata fetch failed';
		}
		fetchingMeta = false;
	}

	async function submitEntry(event: SubmitEvent) {
		event.preventDefault();
		saving = true;
		formError = '';
		const payload = {
			title: form.title,
			type: form.type,
			author: form.author,
			url: form.url,
			year: form.year || null,
			topics: form.topics
				.split(',')
				.map((t) => t.trim())
				.filter(Boolean),
			rating: form.rating || null,
			note: form.note
		};
		try {
			const response = await fetch(
				editingId ? `${MEDIA_API}/entries/${editingId}` : `${MEDIA_API}/entries`,
				{
					method: editingId ? 'PUT' : 'POST',
					headers: { ...authHeaders(), 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				}
			);
			const data = await response.json();
			if (!response.ok) {
				formError = data.error ?? 'save failed';
			} else {
				entries = editingId
					? entries.map((e) => (e.id === editingId ? data : e))
					: [data, ...entries];
				resetForm();
				showForm = false;
			}
		} catch {
			formError = 'save failed (network)';
		}
		saving = false;
	}

	async function deleteEntry(entry: MediaEntry) {
		if (!confirm(`Delete "${entry.title}"?`)) return;
		try {
			const response = await fetch(`${MEDIA_API}/entries/${entry.id}`, {
				method: 'DELETE',
				headers: authHeaders()
			});
			if (response.ok) entries = entries.filter((e) => e.id !== entry.id);
		} catch {
			// keep the entry; nothing to do
		}
	}
</script>

<svelte:head>
	<title>Media - Garden</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="mx-auto max-w-[960px] px-4 pt-10 pb-16">
	<h1
		class="mb-2 text-center font-serif text-xl md:text-2xl"
		style="font-variant: small-caps; letter-spacing: 0.1em; font-weight: 400; color: var(--color-text);"
	>
		Media Log
	</h1>
	<div class="separator mb-8"><span class="separator-glyph">◆</span></div>

	{#if status === 'loading'}
		<p class="py-12 text-center font-mono text-xs" style="color: var(--color-text-muted);">
			loading...
		</p>
	{:else if status === 'token'}
		<form onsubmit={submitToken} class="mx-auto max-w-[420px]">
			<div
				class="rounded p-5"
				style="border: 1px solid var(--color-border); background: var(--color-surface);"
			>
				<p class="mb-3 font-serif text-sm" style="color: var(--color-text);">
					This page is private. Enter the access token to view the log.
				</p>
				<div class="flex items-center gap-2">
					<input
						bind:value={tokenInput}
						type="password"
						placeholder="access token"
						autocomplete="off"
						class="flex-1 rounded px-3 py-2 font-mono text-sm outline-none"
						style="border: 1px solid var(--color-border-strong); background: transparent; color: var(--color-text);"
					/>
					<button
						type="submit"
						class="cursor-pointer rounded px-4 py-2 font-mono text-xs transition-colors duration-200"
						style="border: 1px solid var(--color-border-strong); color: var(--color-text-muted); background: none;"
					>
						enter
					</button>
				</div>
				{#if tokenMessage}
					<p class="mt-2 font-mono text-xs" style="color: #b0413e;">{tokenMessage}</p>
				{/if}
			</div>
		</form>
	{:else if status === 'error'}
		<div class="py-12 text-center">
			<p class="font-serif text-base" style="color: var(--color-text-muted);">
				Could not reach the media API
			</p>
			<button
				onclick={() => load(localStorage.getItem(MEDIA_TOKEN_KEY) ?? '')}
				class="mt-2 cursor-pointer font-mono text-xs hover:text-[--color-accent]"
				style="color: var(--color-text-muted); background: none; border: none;"
			>
				retry
			</button>
		</div>
	{:else}
		<div class="flex flex-col gap-6 md:flex-row">
			<!-- Main column -->
			<div class="min-w-0 flex-1">
				<!-- Search + add row -->
				<div class="mb-4 flex items-center gap-2">
					<div
						class="flex flex-1 items-center gap-2 rounded px-3 py-2"
						style="border: 1px solid var(--color-border); background: var(--color-surface);"
					>
						<input
							bind:value={searchTerm}
							type="text"
							placeholder="Filter by title, author, note..."
							class="flex-1 border-none bg-transparent text-sm outline-none"
							style="color: var(--color-text); font-family: var(--font-body);"
						/>
						{#if searchTerm || selectedType || selectedTopics.size > 0}
							<button
								onclick={clearFilters}
								class="cursor-pointer font-mono text-xs transition-colors duration-200 hover:text-[--color-accent]"
								style="color: var(--color-text-muted); background: none; border: none;"
								>clear</button
							>
						{/if}
					</div>
					{#if isAdmin}
						<button
							onclick={() => {
								if (showForm) resetForm();
								showForm = !showForm;
							}}
							class="cursor-pointer rounded px-3 py-2 font-mono text-xs transition-colors duration-200"
							style="border: 1px solid {showForm
								? 'var(--color-accent)'
								: 'var(--color-border-strong)'}; color: {showForm
								? 'var(--color-accent)'
								: 'var(--color-text-muted)'}; background: var(--color-surface);"
						>
							{showForm ? 'close' : '+ add'}
						</button>
					{/if}
				</div>

				<!-- Add panel -->
				{#if isAdmin && showForm}
					<form
						onsubmit={submitEntry}
						class="mb-6 flex flex-col gap-2.5 rounded p-4"
						style="border: 1px solid var(--color-border-strong); background: var(--color-surface);"
					>
						<div class="flex items-center gap-2">
							<input
								bind:value={form.url}
								type="url"
								placeholder="https://... (optional)"
								class="media-input flex-1"
							/>
							<button
								type="button"
								onclick={fetchMeta}
								disabled={fetchingMeta || !form.url.trim()}
								class="cursor-pointer rounded px-3 py-1.5 font-mono text-[0.65rem] transition-colors duration-200 hover:text-[--color-accent] disabled:cursor-default disabled:opacity-40"
								style="border: 1px solid var(--color-border-strong); color: var(--color-text-muted); background: none;"
							>
								{fetchingMeta ? 'fetching...' : 'fetch metadata'}
							</button>
						</div>
						<input bind:value={form.title} required placeholder="Title *" class="media-input" />
						<div class="flex flex-col gap-2.5 sm:flex-row">
							<input
								bind:value={form.type}
								list="media-types"
								placeholder="type"
								class="media-input sm:w-[130px]"
							/>
							<datalist id="media-types">
								{#each ['article', 'book', 'paper', 'film', 'video', 'podcast'] as t}
									<option value={t}></option>
								{/each}
							</datalist>
							<input bind:value={form.author} placeholder="Author" class="media-input flex-1" />
							<input
								bind:value={form.year}
								type="number"
								placeholder="year"
								class="media-input sm:w-[90px]"
							/>
						</div>
						<input
							bind:value={form.topics}
							placeholder="topics, comma, separated"
							class="media-input"
						/>
						<div class="flex items-center gap-2">
							<span class="font-mono text-[0.65rem]" style="color: var(--color-text-muted);"
								>rating</span
							>
							{#each [1, 2, 3, 4, 5] as star}
								<button
									type="button"
									onclick={() => (form.rating = form.rating === star ? 0 : star)}
									class="cursor-pointer text-sm"
									style="background: none; border: none; color: {form.rating >= star
										? 'var(--color-accent)'
										: 'var(--color-border-strong)'};"
								>
									◆
								</button>
							{/each}
						</div>
						<textarea bind:value={form.note} placeholder="Note" rows="2" class="media-input"
						></textarea>
						{#if formError}
							<p class="font-mono text-xs" style="color: #b0413e;">{formError}</p>
						{/if}
						<div class="flex items-center justify-end gap-2">
							{#if editingId}
								<span class="font-mono text-[0.65rem]" style="color: var(--color-text-muted);"
									>editing entry</span
								>
							{/if}
							<button
								type="submit"
								disabled={saving}
								class="cursor-pointer rounded px-4 py-1.5 font-mono text-xs transition-colors duration-200 disabled:opacity-40"
								style="border: 1px solid var(--color-accent); color: var(--color-accent); background: none;"
							>
								{saving ? 'saving...' : editingId ? 'update' : 'save'}
							</button>
						</div>
					</form>
				{/if}

				<!-- Count -->
				<div
					class="mb-4 rounded-sm px-3 py-1.5 font-mono text-[0.7rem]"
					style="background: var(--color-surface); color: var(--color-text-muted);"
				>
					{filtered.length} entr{filtered.length !== 1 ? 'ies' : 'y'}
					{#if selectedType}<span>of type {selectedType}</span>{/if}
					{#if selectedTopics.size > 0}
						<span>for {[...selectedTopics].map((t) => `#${t}`).join(', ')}</span>
					{/if}
				</div>

				<!-- Entries -->
				<div class="flex flex-col">
					{#each filtered as entry (entry.id)}
						<div class="group py-3.5" style="border-bottom: 1px solid var(--color-border);">
							<div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
								<span
									class="shrink-0 font-mono text-[0.65rem]"
									style="color: var(--color-text-muted);"
								>
									{formatDate(entry.added_at)}
								</span>
								{#if entry.url}
									<a
										href={entry.url}
										target="_blank"
										rel="noreferrer"
										class="font-serif text-[1rem] transition-colors duration-200 hover:text-[--color-accent]"
										style="color: var(--color-text);"
									>
										{entry.title}
									</a>
								{:else}
									<span class="font-serif text-[1rem]" style="color: var(--color-text);">
										{entry.title}
									</span>
								{/if}
								{#if entry.author}
									<span class="text-[0.75rem]" style="color: var(--color-text-muted);">
										{entry.author}
									</span>
								{/if}
								<span
									class="hidden font-mono text-[0.55rem] sm:inline"
									style="color: var(--color-text-muted); opacity: 0.4;"
								>
									{entry.type}{entry.year ? ` · ${entry.year}` : ''}
								</span>
								{#if entry.rating}
									<span class="ml-auto shrink-0 text-[0.6rem] tracking-[0.15em]">
										{#each [1, 2, 3, 4, 5] as star}
											<span
												style="color: {entry.rating >= star
													? 'var(--color-accent)'
													: 'var(--color-border-strong)'};">◆</span
											>
										{/each}
									</span>
								{/if}
								{#if isAdmin}
									<span class="flex shrink-0 gap-1.5">
										<button
											onclick={() => startEdit(entry)}
											title="edit entry"
											class="cursor-pointer font-mono text-[0.6rem] opacity-0 transition-opacity duration-200 group-hover:opacity-60 hover:!opacity-100"
											style="color: var(--color-accent); background: none; border: none;"
										>
											✎
										</button>
										<button
											onclick={() => deleteEntry(entry)}
											title="delete entry"
											class="cursor-pointer font-mono text-[0.6rem] opacity-0 transition-opacity duration-200 group-hover:opacity-60 hover:!opacity-100"
											style="color: #b0413e; background: none; border: none;"
										>
											✕
										</button>
									</span>
								{/if}
							</div>
							{#if entry.note}
								<p
									class="mt-0.5 text-[0.8rem] leading-relaxed"
									style="color: var(--color-text-muted);"
								>
									{entry.note}
								</p>
							{/if}
							{#if entry.topics.length > 0}
								<div class="mt-1.5 flex flex-wrap gap-1">
									{#each entry.topics as topic (topic)}
										<TopicPill {topic} disabled onclick={toggleTopic} />
									{/each}
								</div>
							{/if}
						</div>
					{/each}

					{#if filtered.length === 0}
						<div class="py-12 text-center">
							<p class="font-serif text-base" style="color: var(--color-text-muted);">
								{entries.length === 0 ? 'The log is empty' : 'No matching entries'}
							</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- Sidebar: types + topics -->
			<aside class="w-full shrink-0 md:sticky md:top-16 md:w-[240px] md:self-start">
				<div
					class="rounded"
					style="border: 1px solid var(--color-border); background: var(--color-surface);"
				>
					<div class="px-3 py-2" style="border-bottom: 1px solid var(--color-border);">
						<span
							class="font-mono text-[0.65rem] tracking-[0.1em] uppercase"
							style="color: var(--color-text-muted);">Types</span
						>
					</div>
					<div class="flex flex-col gap-0.5 p-2.5">
						{#each allTypes as [type, count] (type)}
							<button
								onclick={() => (selectedType = selectedType === type ? '' : type)}
								class="flex cursor-pointer items-center justify-between rounded px-2 py-1 text-[0.75rem] transition-colors duration-200 hover:text-[--color-accent]"
								style="color: {selectedType === type
									? 'var(--color-accent)'
									: 'var(--color-text-muted)'}; background: none; border: none; font-weight: {selectedType ===
								type
									? '700'
									: '400'};"
							>
								<span class="font-serif" style="font-variant: small-caps;">{type}</span>
								<span class="font-mono text-[0.6rem]" style="opacity: 0.5;">{count}</span>
							</button>
						{/each}
					</div>
				</div>

				{#if allTopics.length > 0}
					<div
						class="mt-3 rounded"
						style="border: 1px solid var(--color-border); background: var(--color-surface);"
					>
						<div
							class="flex items-center justify-between px-3 py-2"
							style="border-bottom: 1px solid var(--color-border);"
						>
							<span
								class="font-mono text-[0.65rem] tracking-[0.1em] uppercase"
								style="color: var(--color-text-muted);">Topics</span
							>
							{#if selectedTopics.size > 0}
								<button
									onclick={() => (selectedTopics = new Set())}
									class="cursor-pointer font-mono text-[0.6rem] transition-colors duration-200 hover:text-[--color-accent]"
									style="color: var(--color-text-muted); background: none; border: none;"
								>
									clear
								</button>
							{/if}
						</div>
						<div class="flex max-h-[50vh] flex-wrap gap-1 overflow-y-auto p-2.5">
							{#each allTopics as [topic, count] (topic)}
								<button
									onclick={() => toggleTopic(topic)}
									class="cursor-pointer rounded-sm border font-mono text-[0.65rem] transition-all duration-150"
									style="
										padding: 1px 6px;
										letter-spacing: 0.03em;
										border-color: {selectedTopics.has(topic) ? '#D4A017' : 'var(--color-border)'};
										color: {selectedTopics.has(topic) ? '#1A1A1A' : 'var(--color-text-muted)'};
										background: {selectedTopics.has(topic) ? '#D4A017' : 'transparent'};
										font-weight: {selectedTopics.has(topic) ? '700' : '400'};
									"
								>
									{topic}
									<span style="opacity: 0.4; font-size: 0.8em;">{count}</span>
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</aside>
		</div>
	{/if}
</div>

<style>
	.media-input {
		border: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text);
		font-family: var(--font-body);
		font-size: 0.85rem;
		padding: 6px 10px;
		border-radius: 4px;
		outline: none;
	}

	.media-input:focus {
		border-color: var(--color-accent);
	}
</style>

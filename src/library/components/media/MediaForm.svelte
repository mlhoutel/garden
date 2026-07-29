<script lang="ts">
	import type { MediaEntry, MediaMeta } from '$types/types';
	import { localDateKey } from '$utils/media';

	let {
		entry = null,
		defaultStatus = 'done',
		bare = false,
		onsave,
		oncancel,
		onfetchmeta,
		findByUrl,
		oneditexisting
	}: {
		entry?: MediaEntry | null;
		defaultStatus?: 'todo' | 'done';
		bare?: boolean;
		onsave: (payload: Record<string, unknown>) => Promise<string | null>;
		oncancel: () => void;
		onfetchmeta: (url: string) => Promise<MediaMeta | null>;
		findByUrl?: (url: string) => MediaEntry | null;
		oneditexisting?: (entry: MediaEntry) => void;
	} = $props();

	const TYPES = ['article', 'book', 'paper', 'film', 'video', 'podcast', 'repo', 'wiki', 'site'];
	const today = localDateKey(new Date());
	const origDate = entry ? localDateKey(new Date(entry.added_at)) : today;

	let url = $state(entry?.url ?? '');
	let title = $state(entry?.title ?? '');
	let type = $state(entry?.type ?? 'article');
	let author = $state(entry?.author ?? '');
	let date = $state(origDate);
	let topics = $state(entry?.topics.join(', ') ?? '');
	let rating = $state(entry?.rating ?? 0);
	let note = $state(entry?.note ?? '');
	let status = $state<'todo' | 'done'>(entry?.status ?? defaultStatus);
	// Publication year is no longer edited (the read date is the only date that
	// matters), but existing values are carried through untouched.
	const year = entry?.year ?? null;

	let urlInput = $state<HTMLInputElement | null>(null);
	let fetchingMeta = $state(false);
	let quickAdding = $state(false);
	let saving = $state(false);
	let error = $state('');
	let suggestion = $state('');

	// URL is the entry's identity: flag when it matches another entry in the log.
	let duplicate = $derived.by(() => {
		if (!findByUrl || !url.trim()) return null;
		const existing = findByUrl(url.trim());
		return existing && existing.id !== entry?.id ? existing : null;
	});

	function resetFields() {
		url = '';
		title = '';
		author = '';
		date = today;
		topics = '';
		rating = 0;
		note = '';
		suggestion = '';
		urlInput?.focus();
	}

	function payloadOf(overrides: Record<string, unknown> = {}) {
		const payload: Record<string, unknown> = {
			title,
			type,
			author,
			url,
			year,
			topics: topics
				.split(',')
				.map((t) => t.trim())
				.filter(Boolean),
			rating: rating || null,
			note,
			status,
			...overrides
		};
		// Only send added_at when the picked day changed, so an untouched edit
		// preserves the exact original timestamp (server-side COALESCE).
		if (date && date !== origDate) {
			payload.added_at = date === today ? new Date().toISOString() : `${date}T12:00:00.000Z`;
		}
		return payload;
	}

	/** Paste a link, one click: fetch metadata and save immediately. */
	async function quickAdd() {
		if (!url.trim() || quickAdding || duplicate) return;
		quickAdding = true;
		error = '';
		const meta = await onfetchmeta(url.trim());
		// Redirects can land on the canonical URL of an entry we already have.
		if (meta?.url && findByUrl?.(meta.url)) {
			quickAdding = false;
			url = meta.url;
			return;
		}
		const fallbackTitle = url
			.trim()
			.replace(/^https?:\/\/(www\.)?/, '')
			.split(/[/?#]/)[0];
		const err = await onsave(
			payloadOf({
				title: meta?.title || fallbackTitle,
				type: meta?.type || type,
				author: meta?.author ?? '',
				url: meta?.url || url.trim(),
				topics: [],
				rating: null,
				note: ''
			})
		);
		quickAdding = false;
		if (err) error = err;
		else resetFields();
	}

	async function fetchMeta() {
		if (!url.trim() || fetchingMeta) return;
		fetchingMeta = true;
		error = '';
		const meta = await onfetchmeta(url.trim());
		fetchingMeta = false;
		if (!meta) {
			error = 'metadata fetch failed';
			return;
		}
		if (meta.warning) error = meta.warning;
		if (meta.title) title = meta.title;
		if (meta.author) author = meta.author;
		if (meta.url) url = meta.url;
		// Only apply the suggested type while the field still holds the default.
		if (meta.type && type === 'article') type = meta.type;
		// Description is offered, never silently applied over an existing note.
		if (meta.description) suggestion = meta.description;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (saving) return;
		if (duplicate) {
			error = 'this url is already in the log';
			return;
		}
		saving = true;
		error = '';
		const err = await onsave(payloadOf());
		saving = false;
		if (err) error = err;
		else if (!entry) resetFields();
	}
</script>

<form
	onsubmit={handleSubmit}
	class="flex flex-col gap-1.5 {bare
		? 'p-3'
		: 'rounded p-3'} [&_.mi]:min-w-0 [&_.mi]:px-1 [&_.mi]:py-1.5 [&_.mi]:text-[0.8rem] [&_.mi]:outline-none"
	style="{bare ? '' : 'border: 1px solid var(--color-border-strong);'} background: {bare
		? 'transparent'
		: 'var(--color-surface)'};
		--mi-border: var(--color-border);"
>
	<div class="flex items-center gap-1.5">
		<input
			bind:this={urlInput}
			bind:value={url}
			type="url"
			placeholder={entry ? 'https://...' : 'paste a link…'}
			class="mi flex-1"
		/>
		{#if !entry}
			<button
				type="button"
				onclick={quickAdd}
				disabled={quickAdding || fetchingMeta || !url.trim()}
				title="fetch metadata and save in one step"
				class="h-[30px] shrink-0 cursor-pointer rounded px-2.5 font-mono text-[0.65rem] transition-colors duration-200 disabled:cursor-default disabled:opacity-40"
				style="border: 1px solid var(--color-accent); color: var(--color-accent); background: none;"
			>
				{quickAdding ? '…' : 'quick add'}
			</button>
		{/if}
		<button
			type="button"
			onclick={fetchMeta}
			disabled={fetchingMeta || quickAdding || !url.trim()}
			title="fill the fields from the page"
			class="h-[30px] shrink-0 cursor-pointer rounded px-2.5 font-mono text-[0.65rem] transition-colors duration-200 hover:text-[--color-accent] disabled:cursor-default disabled:opacity-40"
			style="border: 1px solid var(--color-border-strong); color: var(--color-text-muted); background: none;"
		>
			{fetchingMeta ? '…' : 'fetch'}
		</button>
	</div>

	{#if duplicate}
		<div
			class="flex flex-wrap items-center gap-1.5 font-mono text-[0.65rem]"
			style="color: var(--color-text-muted);"
		>
			<span style="color: var(--color-accent);">◆</span>
			<span>already logged: “{duplicate.title}”</span>
			{#if oneditexisting}
				<button
					type="button"
					onclick={() => oneditexisting(duplicate)}
					class="cursor-pointer underline transition-colors duration-150 hover:text-[--color-accent]"
					style="background: none; border: none; color: inherit;"
				>
					edit it
				</button>
			{/if}
		</div>
	{/if}

	<input bind:value={title} required placeholder="Title *" class="mi" />

	<div class="flex flex-wrap gap-1.5">
		<input bind:value={type} list="media-types" placeholder="type" class="mi w-[92px]" />
		<datalist id="media-types">
			{#each TYPES as t (t)}
				<option value={t}></option>
			{/each}
		</datalist>
		<input bind:value={author} placeholder="author" class="mi min-w-[120px] flex-1" />
		<input bind:value={date} type="date" max={today} title="date read" class="mi w-[132px]" />
	</div>

	<div class="flex flex-wrap items-stretch gap-1.5">
		<input
			bind:value={topics}
			placeholder="topics, comma, separated"
			class="mi min-w-[140px] flex-1"
		/>
		<!-- Rating sits on the same underline as the other fields. -->
		<span
			class="flex shrink-0 items-center px-1"
			style="border-bottom: 1px solid var(--color-border);"
		>
			{#each [1, 2, 3, 4, 5] as star (star)}
				<button
					type="button"
					aria-label="rate {star}"
					onclick={() => (rating = rating === star ? 0 : star)}
					class="flex h-6 w-[18px] cursor-pointer items-center justify-center text-[0.8rem] transition-colors duration-150"
					style="background: none; border: none; color: {rating >= star
						? 'var(--color-accent)'
						: 'var(--color-border-strong)'};"
				>
					◆
				</button>
			{/each}
		</span>
	</div>

	<textarea bind:value={note} placeholder="note" rows="2" class="mi resize-y"></textarea>

	{#if suggestion && !note.trim()}
		<div class="flex items-start gap-2 text-[0.72rem]" style="color: var(--color-text-muted);">
			<span class="min-w-0 flex-1 italic">“{suggestion.slice(0, 160)}…”</span>
			<button
				type="button"
				onclick={() => {
					note = suggestion;
					suggestion = '';
				}}
				class="shrink-0 cursor-pointer font-mono text-[0.62rem] underline transition-colors duration-200 hover:text-[--color-accent]"
				style="border: none; background: none; color: inherit;"
			>
				use
			</button>
		</div>
	{/if}

	{#if error || entry}
		<div class="flex flex-wrap items-center gap-2">
			{#if error}
				<p class="font-mono text-[0.65rem]" style="color: #b0413e;">{error}</p>
			{/if}
			{#if entry}
				<!-- Status is set by the active tab when adding; editing can move an
			     entry back to the backlog. -->
				<button
					type="button"
					onclick={() => (status = status === 'done' ? 'todo' : 'done')}
					class="cursor-pointer rounded px-2 py-0.5 font-mono text-[0.62rem] transition-colors duration-150"
					style="border: 1px solid {status === 'todo'
						? 'var(--color-accent)'
						: 'var(--color-border)'}; color: {status === 'todo'
						? 'var(--color-accent)'
						: 'var(--color-text-muted)'}; background: none;"
				>
					{status === 'todo' ? '◆ to read' : '◇ to read'}
				</button>
			{/if}
		</div>
	{/if}

	<div class="flex gap-1.5">
		<!-- Adding: the panel stays open, so the secondary action empties the
		     fields. Editing: it truly cancels and restores the row. -->
		<button
			type="button"
			onclick={entry ? oncancel : resetFields}
			class="h-9 flex-1 cursor-pointer rounded font-mono text-[0.7rem] tracking-[0.05em] transition-colors duration-200 hover:text-[--color-accent]"
			style="border: 1px solid var(--color-border); color: var(--color-text-muted); background: none;"
		>
			{entry ? 'cancel' : 'clear'}
		</button>
		<button
			type="submit"
			disabled={saving}
			class="h-9 flex-1 cursor-pointer rounded font-mono text-[0.7rem] tracking-[0.05em] transition-colors duration-200 disabled:opacity-40"
			style="border: 1px solid var(--color-accent); color: var(--color-accent); background: none;"
		>
			{saving ? '…' : entry ? 'update' : 'save'}
		</button>
	</div>
</form>

<style>
	/* Underline fields keep the form quiet next to the entry list. */
	form :global(.mi) {
		border: none;
		border-bottom: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text);
		font-family: var(--font-body);
		border-radius: 0;
		transition: border-color 150ms;
	}

	form :global(.mi:focus) {
		border-bottom-color: var(--color-accent);
	}

	form :global(textarea.mi) {
		border: 1px solid var(--color-border);
		border-radius: 4px;
		padding: 6px 8px;
	}

	form :global(textarea.mi:focus) {
		border-color: var(--color-accent);
	}
</style>

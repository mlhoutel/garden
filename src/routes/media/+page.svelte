<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import MediaForm from '$components/media/MediaForm.svelte';
	import MediaRow from '$components/media/MediaRow.svelte';
	import Heatmap from '$components/media/Heatmap.svelte';
	import ToggleDiamond from '$components/media/ToggleDiamond.svelte';
	import {
		MEDIA_API,
		MEDIA_TOKEN_KEY,
		localDateKey,
		normalizeUrl,
		packRows,
		readMediaCache,
		writeMediaCache,
		clearMediaCache
	} from '$utils/media';
	import type { MediaEntry, MediaMeta, MediaSortKey } from '$types/types';

	type Status = 'loading' | 'token' | 'error' | 'ready';
	type Dim = 'type' | 'topics' | 'year' | 'day' | 'rating' | 'search';
	type FacetKey = 'types' | 'topics' | 'years' | 'ratings';

	let status = $state<Status>('loading');
	let tokenInput = $state('');
	let tokenMessage = $state('');
	let entries = $state<MediaEntry[]>([]);
	let isAdmin = $state(false);
	let stale = $state(false);

	// ─── Tabs, filters & sorting (all client-side) ───

	let activeTab = $state<'done' | 'todo'>('done');
	let searchTerm = $state('');
	let selectedTopics = $state<Set<string>>(new Set());
	let selectedTypes = $state<Set<string>>(new Set());
	let selectedYears = $state<Set<number>>(new Set());
	let selectedDay = $state<string | null>(null);
	let minRating = $state(0);
	let sortKey = $state<MediaSortKey>('added');
	let sortAsc = $state(false);
	let mobileFiltersOpen = $state(false);

	const SORT_KEYS: MediaSortKey[] = ['added', 'rating', 'title'];
	const comparators: Record<MediaSortKey, (a: MediaEntry, b: MediaEntry) => number> = {
		added: (a, b) => a.added_at.localeCompare(b.added_at),
		rating: (a, b) => (a.rating ?? 0) - (b.rating ?? 0),
		title: (a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
	};

	let doneEntries = $derived(entries.filter((e) => e.status === 'done'));
	let todoCount = $derived(entries.length - doneEntries.length);
	let tabBase = $derived(entries.filter((e) => e.status === activeTab));

	// One predicate per filter dimension; cross-dimension composition is AND.
	// Types/Years are OR within their facet (an entry has one value), Topics is AND.
	let predicates = $derived.by(() => {
		const preds = new Map<Dim, (e: MediaEntry) => boolean>();
		if (selectedTypes.size) preds.set('type', (e) => selectedTypes.has(e.type));
		if (selectedTopics.size) {
			preds.set('topics', (e) => [...selectedTopics].every((t) => e.topics.includes(t)));
		}
		if (selectedYears.size) {
			preds.set('year', (e) => selectedYears.has(new Date(e.added_at).getFullYear()));
		}
		if (selectedDay) preds.set('day', (e) => localDateKey(new Date(e.added_at)) === selectedDay);
		if (minRating > 0) preds.set('rating', (e) => (e.rating ?? 0) >= minRating);
		const term = searchTerm.toLowerCase().trim();
		if (term) {
			preds.set(
				'search',
				(e) =>
					e.title.toLowerCase().includes(term) ||
					e.author.toLowerCase().includes(term) ||
					e.note.toLowerCase().includes(term) ||
					e.comments.some((c) => c.body.toLowerCase().includes(term))
			);
		}
		return preds;
	});

	function applyFilters(list: MediaEntry[], except?: Dim): MediaEntry[] {
		let out = list;
		for (const [dim, pred] of predicates) if (dim !== except) out = out.filter(pred);
		return out;
	}

	let filteredUnsorted = $derived(applyFilters(tabBase));
	let filtered = $derived(
		[...filteredUnsorted].sort((a, b) => (sortAsc ? 1 : -1) * comparators[sortKey](a, b))
	);

	// ─── Facets: counts computed excluding their own dimension (no dead-ends);
	//     topics are conjunctive so they count over the fully filtered list. ───

	interface FacetRow {
		value: string;
		count: number;
		avg: number | null;
		selected: boolean;
	}

	function aggregate(base: MediaEntry[], key: (e: MediaEntry) => string | null) {
		const m = new Map<string, { count: number; sum: number; rated: number }>();
		for (const e of base) {
			const k = key(e);
			if (k == null) continue;
			const a = m.get(k) ?? { count: 0, sum: 0, rated: 0 };
			a.count++;
			if (e.rating != null) {
				a.sum += e.rating;
				a.rated++;
			}
			m.set(k, a);
		}
		return m;
	}

	// Stable universes/order from the tab base (never reshuffles as filters change).
	let allTypes = $derived.by(() => {
		const counts = new Map<string, number>();
		for (const e of tabBase) counts.set(e.type, (counts.get(e.type) ?? 0) + 1);
		for (const t of selectedTypes) if (!counts.has(t)) counts.set(t, 0);
		return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
	});

	let allTopics = $derived.by(() => {
		const counts = new Map<string, number>();
		for (const e of tabBase) for (const t of e.topics) counts.set(t, (counts.get(t) ?? 0) + 1);
		for (const t of selectedTopics) if (!counts.has(t)) counts.set(t, 0);
		return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
	});

	const readYear = (e: MediaEntry) => new Date(e.added_at).getFullYear();

	let allYears = $derived.by(() => {
		const years = new Set<number>();
		for (const e of tabBase) years.add(readYear(e));
		for (const y of selectedYears) years.add(y);
		return [...years].sort((a, b) => b - a);
	});

	let typeFacet = $derived.by(() => {
		const agg = aggregate(applyFilters(tabBase, 'type'), (e) => e.type);
		return allTypes.map((type): FacetRow => {
			const a = agg.get(type) ?? { count: 0, sum: 0, rated: 0 };
			return {
				value: type,
				count: a.count,
				avg: a.rated ? a.sum / a.rated : null,
				selected: selectedTypes.has(type)
			};
		});
	});
	let typeMax = $derived(Math.max(1, ...typeFacet.map((r) => r.count)));

	let topicFacet = $derived.by(() => {
		const counts = new Map<string, number>();
		for (const e of filteredUnsorted) {
			for (const t of e.topics) counts.set(t, (counts.get(t) ?? 0) + 1);
		}
		return allTopics.map((t) => ({
			value: t,
			count: counts.get(t) ?? 0,
			selected: selectedTopics.has(t)
		}));
	});

	let yearFacet = $derived.by(() => {
		const agg = aggregate(applyFilters(tabBase, 'year'), (e) => String(readYear(e)));
		return allYears.map((year): FacetRow => {
			const a = agg.get(String(year)) ?? { count: 0, sum: 0, rated: 0 };
			return { value: String(year), count: a.count, avg: null, selected: selectedYears.has(year) };
		});
	});
	let yearMax = $derived(Math.max(1, ...yearFacet.map((r) => r.count)));

	let ratingFacet = $derived.by(() => {
		const base = applyFilters(tabBase, 'rating');
		return [5, 4, 3, 2, 1].map((r) => ({
			stars: r,
			count: base.filter((e) => e.rating === r).length
		}));
	});
	let ratingMax = $derived(Math.max(1, ...ratingFacet.map((r) => r.count)));

	// Chips are packed into rows instead of relying on flex-wrap, so a very long
	// label (e.g. "software engineering") can't leave the rest of its row empty.
	let topicsWidth = $state(0);
	let packedTopics = $derived.by(() => {
		const capacity = (topicsWidth || 212) - 6;
		// Monospace chips: width is exactly linear in glyph count (measured fit).
		const CHAR = 7.364;
		const CHROME = 12.1;
		const width = (c: { value: string; count: number }) =>
			CHAR * (c.value.length + 1 + 0.8 * String(c.count).length) + CHROME;
		// Longest chips first: fills rows evenly instead of leaving a long label
		// alone on its own line (counts stay visible on every chip).
		const byWidth = [...topicFacet].sort((a, b) => width(b) - width(a));
		return packRows(byWidth, capacity, width);
	});

	const TOPIC_ROWS = 5;
	let topicsExpanded = $state(false);
	let visibleTopicRows = $derived(
		topicsExpanded ? packedTopics : packedTopics.slice(0, TOPIC_ROWS)
	);
	let hiddenTopicCount = $derived(
		packedTopics.slice(TOPIC_ROWS).reduce((n, row) => n + row.length, 0)
	);

	let overallAvg = $derived.by(() => {
		const rated = tabBase.filter((e) => e.rating != null);
		return rated.length ? rated.reduce((s, e) => s + (e.rating ?? 0), 0) / rated.length : null;
	});
	let thisYearCount = $derived(
		tabBase.filter((e) => readYear(e) === new Date().getFullYear()).length
	);

	let activeFilterCount = $derived(
		selectedTypes.size +
			selectedTopics.size +
			selectedYears.size +
			(selectedDay ? 1 : 0) +
			(minRating > 0 ? 1 : 0)
	);
	let hasFilters = $derived(Boolean(searchTerm) || activeFilterCount > 0);

	// ─── Loading, auth & cache (stale-while-revalidate) ───

	let mutationVersion = 0;

	const currentToken = () => localStorage.getItem(MEDIA_TOKEN_KEY) ?? '';

	function hydrate(raw: MediaEntry[]): MediaEntry[] {
		return raw.map((e) => ({ ...e, comments: e.comments ?? [], status: e.status ?? 'done' }));
	}

	onMount(() => {
		const token = currentToken();
		if (!token) {
			status = 'token';
			return;
		}
		const cached = readMediaCache(token);
		if (cached) {
			entries = hydrate(cached.entries as MediaEntry[]);
			isAdmin = cached.role === 'admin';
			formOpen = isAdmin;
			status = 'ready';
			revalidate(token);
		} else {
			load(token);
		}
	});

	// Persist the working set after any change (mutations, revalidation, first load).
	$effect(() => {
		if (status !== 'ready') return;
		writeMediaCache($state.snapshot(entries), isAdmin ? 'admin' : 'reader', currentToken());
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
			clearMediaCache();
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
		entries = hydrate(data.entries);
		isAdmin = data.role === 'admin';
		formOpen = isAdmin;
		status = 'ready';
	}

	async function revalidate(token: string) {
		const version = mutationVersion;
		let response: Response;
		try {
			response = await fetch(`${MEDIA_API}/entries`, {
				headers: { Authorization: `Bearer ${token}` }
			});
		} catch {
			stale = true;
			return;
		}
		if (response.status === 401 || response.status === 403) {
			localStorage.removeItem(MEDIA_TOKEN_KEY);
			clearMediaCache();
			entries = [];
			isAdmin = false;
			tokenMessage = 'Token expired, enter it again';
			status = 'token';
			return;
		}
		if (!response.ok) {
			stale = true;
			return;
		}
		const data = await response.json();
		// A mutation landed while this fetch was in flight: its payload is older
		// than local state, discard it (next visit converges).
		if (mutationVersion !== version) return;
		entries = hydrate(data.entries);
		isAdmin = data.role === 'admin';
		stale = false;
	}

	function submitToken(event: SubmitEvent) {
		event.preventDefault();
		if (tokenInput.trim()) load(tokenInput.trim());
	}

	function authHeaders(): Record<string, string> {
		return { Authorization: `Bearer ${currentToken()}` };
	}

	// ─── Filter actions ───

	function toggleTopic(topic: string) {
		const next = new Set(selectedTopics);
		if (next.has(topic)) next.delete(topic);
		else next.add(topic);
		selectedTopics = next;
	}

	function toggleType(type: string) {
		const next = new Set(selectedTypes);
		if (next.has(type)) next.delete(type);
		else next.add(type);
		selectedTypes = next;
	}

	function toggleYear(year: number) {
		const next = new Set(selectedYears);
		if (next.has(year)) next.delete(year);
		else next.add(year);
		selectedYears = next;
	}

	function setSort(key: MediaSortKey) {
		if (sortKey === key) sortAsc = !sortAsc;
		else {
			sortKey = key;
			sortAsc = false;
		}
	}

	function clearFilters() {
		searchTerm = '';
		selectedTypes = new Set();
		selectedYears = new Set();
		selectedDay = null;
		minRating = 0;
		selectedTopics = new Set();
	}

	// ─── Edit in place ───

	let formOpen = $state(false);
	let editing = $state<MediaEntry | null>(null);
	let panelsOpen = $state({ types: true, topics: true, years: true, ratings: true });

	// If filters/sort/tab hide the entry being edited, pin it on top so the
	// form (and any unsaved input) survives — keyed each preserves the instance.
	let displayList = $derived.by(() => {
		if (editing && !filtered.some((e) => e.id === editing!.id)) return [editing, ...filtered];
		return filtered;
	});
	let editingPinned = $derived(editing != null && !filtered.some((e) => e.id === editing!.id));

	async function startEdit(entry: MediaEntry) {
		editing = entry;
		// The form is taller than the row it replaces; browsers' scroll anchoring
		// can jump the viewport. Bring the form back with minimal scrolling.
		await tick();
		document.getElementById(`entry-${entry.id}`)?.scrollIntoView({ block: 'nearest' });
	}

	function cancelEdit() {
		editing = null;
	}

	async function editExisting(dup: MediaEntry) {
		editing = dup;
		await tick();
		document
			.getElementById(`entry-${dup.id}`)
			?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	// ─── URL identity ───

	let urlIndex = $derived.by(() => {
		const m = new Map<string, MediaEntry>();
		for (const e of entries) if (e.url) m.set(normalizeUrl(e.url), e);
		return m;
	});
	const findByUrl = (url: string) => urlIndex.get(normalizeUrl(url)) ?? null;

	// ─── Admin actions (passed down to components) ───

	async function saveEntry(payload: Record<string, unknown>): Promise<string | null> {
		try {
			const response = await fetch(
				editing ? `${MEDIA_API}/entries/${editing.id}` : `${MEDIA_API}/entries`,
				{
					method: editing ? 'PUT' : 'POST',
					headers: { ...authHeaders(), 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				}
			);
			const data = await response.json();
			if (!response.ok) return data.error ?? 'save failed';
			const saved = hydrate([data])[0];
			mutationVersion++;
			entries = editing ? entries.map((e) => (e.id === saved.id ? saved : e)) : [saved, ...entries];
			editing = null;
			return null;
		} catch {
			return 'save failed (network)';
		}
	}

	async function markRead(entry: MediaEntry): Promise<void> {
		try {
			const response = await fetch(`${MEDIA_API}/entries/${entry.id}`, {
				method: 'PUT',
				headers: { ...authHeaders(), 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: entry.title,
					type: entry.type,
					author: entry.author,
					url: entry.url,
					year: entry.year,
					topics: entry.topics,
					rating: entry.rating,
					note: entry.note,
					status: 'done',
					added_at: new Date().toISOString()
				})
			});
			if (!response.ok) return;
			const saved = hydrate([await response.json()])[0];
			mutationVersion++;
			entries = entries.map((e) => (e.id === saved.id ? saved : e));
		} catch {
			// row keeps its todo state; user can retry
		}
	}

	async function fetchMetaFor(url: string): Promise<MediaMeta | null> {
		try {
			const response = await fetch(`${MEDIA_API}/meta?url=${encodeURIComponent(url)}`, {
				headers: authHeaders()
			});
			if (!response.ok) return null;
			return await response.json();
		} catch {
			return null;
		}
	}

	async function deleteEntry(entry: MediaEntry): Promise<boolean> {
		try {
			const response = await fetch(`${MEDIA_API}/entries/${entry.id}`, {
				method: 'DELETE',
				headers: authHeaders()
			});
			if (!response.ok) return false;
			mutationVersion++;
			entries = entries.filter((e) => e.id !== entry.id);
			return true;
		} catch {
			return false;
		}
	}

	async function addComment(entry: MediaEntry, body: string): Promise<string | null> {
		try {
			const response = await fetch(`${MEDIA_API}/entries/${entry.id}/comments`, {
				method: 'POST',
				headers: { ...authHeaders(), 'Content-Type': 'application/json' },
				body: JSON.stringify({ body })
			});
			const data = await response.json();
			if (response.status !== 201) return data.error ?? 'comment failed';
			mutationVersion++;
			entries = entries.map((e) =>
				e.id === entry.id ? { ...e, comments: [...e.comments, data] } : e
			);
			return null;
		} catch {
			return 'comment failed (network)';
		}
	}

	async function deleteComment(entry: MediaEntry, cid: string): Promise<void> {
		try {
			const response = await fetch(`${MEDIA_API}/entries/${entry.id}/comments/${cid}`, {
				method: 'DELETE',
				headers: authHeaders()
			});
			if (!response.ok) return;
			mutationVersion++;
			entries = entries.map((e) =>
				e.id === entry.id ? { ...e, comments: e.comments.filter((c) => c.id !== cid) } : e
			);
		} catch {
			// entry keeps the comment; user can retry
		}
	}
</script>

<svelte:head>
	<title>Media - Garden</title>
	<meta name="robots" content="noindex" />
</svelte:head>

{#snippet facetBar(count: number, max: number)}
	<span
		class="h-[3px] min-w-[2px] rounded-full"
		style="width: {Math.round(
			(count / max) * 100
		)}%; background: var(--color-accent); opacity: 0.75;"
	></span>
{/snippet}

{#snippet sectionHeader(key: FacetKey, label: string, active: number)}
	<button
		onclick={() => (panelsOpen[key] = !panelsOpen[key])}
		class="flex w-full cursor-pointer items-center gap-2 px-2.5 py-1.5"
		style="background: none; border: none;"
	>
		<ToggleDiamond open={panelsOpen[key]} tone={active > 0 ? 'accent' : 'muted'} />
		<span
			class="font-mono text-[0.62rem] tracking-[0.12em] uppercase"
			style="color: var(--color-text-muted);"
		>
			{label}
		</span>
		{#if active > 0}
			<span class="font-mono text-[0.6rem]" style="color: var(--color-accent);">{active}</span>
		{/if}
	</button>
{/snippet}

{#snippet facetRow(
	label: string,
	count: number,
	max: number,
	selected: boolean,
	onclick: () => void,
	labelClass: string,
	avg: number | null = null
)}
	<button
		{onclick}
		class="flex cursor-pointer items-center gap-2 px-2.5 py-[3px] text-left transition-colors duration-150 hover:text-[--color-accent]"
		style="color: {selected ? 'var(--color-accent)' : 'var(--color-text-muted)'};
			background: none; border: none;
			font-weight: {selected ? '700' : '400'};
			opacity: {count === 0 && !selected ? 0.35 : 1};"
	>
		<span class="w-[58px] shrink-0 truncate {labelClass}">{label}</span>
		<span class="flex h-[3px] min-w-0 flex-1 rounded-full" style="background: var(--color-border);">
			{@render facetBar(count, max)}
		</span>
		<span class="w-[18px] shrink-0 text-right font-mono text-[0.6rem]" style="opacity: 0.6;">
			{count}
		</span>
		<span
			class="w-[26px] shrink-0 font-mono text-[0.6rem]"
			style="color: var(--color-accent); opacity: 0.85;"
		>
			{avg != null ? `◆${avg.toFixed(1)}` : ''}
		</span>
	</button>
{/snippet}

{#snippet controlStrip()}
	<div
		class="flex flex-wrap items-center gap-x-3 gap-y-1 px-2.5 py-1 font-mono text-[0.68rem]"
		style="color: var(--color-text-muted);"
	>
		<span class="flex items-center gap-2">
			{#each [['done', 'log', doneEntries.length], ['todo', 'to read', todoCount]] as [tab, label, count] (tab)}
				<button
					onclick={() => (activeTab = tab as 'done' | 'todo')}
					aria-label="show {label}"
					aria-pressed={activeTab === tab}
					class="cursor-pointer py-0.5 transition-colors duration-150"
					style="background: none; border: none;
									color: {activeTab === tab ? 'var(--color-accent)' : 'var(--color-text-muted)'};
									font-weight: {activeTab === tab ? '700' : '400'};"
				>
					{activeTab === tab ? '◆' : '◇'}
					{label}
					<span style="opacity: 0.55;">{count}</span>
				</button>
			{/each}
		</span>

		{#if hasFilters}
			<span class="min-w-0 truncate" style="opacity: 0.8;">
				→ {filtered.length}
				{#if selectedTypes.size > 0}<span> · {[...selectedTypes].join(' ')}</span>{/if}
				{#if selectedYears.size > 0}<span> · {[...selectedYears].join(' ')}</span>{/if}
				{#if selectedDay}<span> · {selectedDay}</span>{/if}
				{#if selectedTopics.size > 0}
					<span> · {[...selectedTopics].map((t) => `#${t}`).join(' ')}</span>
				{/if}
			</span>
		{/if}

		{#if stale}
			<button
				onclick={() => {
					stale = false;
					revalidate(currentToken());
				}}
				class="cursor-pointer underline"
				style="background: none; border: none; color: #b0413e;"
			>
				cached · retry
			</button>
		{/if}

		<span class="ml-auto flex items-center gap-1">
			{#each SORT_KEYS as key (key)}
				<button
					onclick={() => setSort(key)}
					class="cursor-pointer px-1 py-0.5 transition-colors duration-150"
					style="background: none; border: none; color: {sortKey === key
						? 'var(--color-accent)'
						: 'var(--color-text-muted)'}; font-weight: {sortKey === key ? '700' : '400'};"
				>
					{key}{sortKey === key ? (sortAsc ? ' ↑' : ' ↓') : ''}
				</button>
			{/each}
			<span class="flex items-center" title="minimum rating">
				{#each [1, 2, 3, 4, 5] as star (star)}
					<button
						aria-label="min rating {star}"
						onclick={() => (minRating = minRating === star ? 0 : star)}
						class="flex h-5 w-[15px] cursor-pointer items-center justify-center text-[0.68rem]"
						style="background: none; border: none; color: {minRating >= star
							? 'var(--color-accent)'
							: 'var(--color-border-strong)'};"
					>
						◆
					</button>
				{/each}
			</span>
		</span>
	</div>
{/snippet}

{#snippet facetPanels()}
	<div class="rounded" style="border: 1px solid var(--color-border);">
		<!-- Summary -->
		<div
			class="flex flex-wrap items-baseline gap-x-2 px-2.5 py-2 font-mono text-[0.6rem]"
			style="border-bottom: 1px solid var(--color-border); color: var(--color-text-muted);"
		>
			<span style="color: var(--color-text);">{tabBase.length}</span>
			<span style="opacity: 0.6;">entries</span>
			{#if overallAvg != null}
				<span style="opacity: 0.4;">·</span>
				<span style="color: var(--color-accent);">◆{overallAvg.toFixed(1)}</span>
			{/if}
			{#if thisYearCount > 0}
				<span style="opacity: 0.4;">·</span>
				<span style="color: var(--color-text);">{thisYearCount}</span>
				<span style="opacity: 0.6;">in {new Date().getFullYear()}</span>
			{/if}
		</div>

		<!-- Types -->
		<div style="border-bottom: 1px solid var(--color-border);">
			{@render sectionHeader('types', 'Types', selectedTypes.size)}
			{#if panelsOpen.types}
				<div class="flex flex-col pb-1.5" transition:slide={{ duration: 160 }}>
					{#each typeFacet as row (row.value)}
						{@render facetRow(
							row.value,
							row.count,
							typeMax,
							row.selected,
							() => toggleType(row.value),
							'font-serif text-[0.75rem] [font-variant:small-caps]',
							row.avg
						)}
					{/each}
				</div>
			{/if}
		</div>

		<!-- Topics: chips packed into evenly filled rows -->
		{#if topicFacet.length > 0}
			<div style="border-bottom: 1px solid var(--color-border);">
				{@render sectionHeader('topics', 'Topics', selectedTopics.size)}
				{#if panelsOpen.topics}
					<div class="px-2.5 pb-2" transition:slide={{ duration: 160 }}>
						<div bind:clientWidth={topicsWidth} class="flex flex-col gap-1">
							{#each visibleTopicRows as row, i (i)}
								<div class="flex gap-1">
									{#each row as chip (chip.value)}
										<button
											onclick={() => toggleTopic(chip.value)}
											class="shrink-0 cursor-pointer rounded-sm border font-mono text-[0.65rem] whitespace-nowrap transition-all duration-150"
											style="
												padding: 1px 5px;
												letter-spacing: 0.03em;
												border-color: {chip.selected ? '#D4A017' : 'var(--color-border)'};
												color: {chip.selected ? '#1A1A1A' : 'var(--color-text-muted)'};
												background: {chip.selected ? '#D4A017' : 'transparent'};
												font-weight: {chip.selected ? '700' : '400'};
												opacity: {chip.count === 0 && !chip.selected ? 0.35 : 1};
											"
										>
											{chip.value}
											<span style="opacity: 0.5; font-size: 0.8em;">{chip.count}</span>
										</button>
									{/each}
								</div>
							{/each}
						</div>
						{#if packedTopics.length > TOPIC_ROWS}
							<button
								onclick={() => (topicsExpanded = !topicsExpanded)}
								class="mt-1 cursor-pointer font-mono text-[0.6rem] transition-colors duration-150 hover:text-[--color-accent]"
								style="background: none; border: none; color: var(--color-text-muted);"
							>
								{topicsExpanded ? '◆ less' : `◇ ${hiddenTopicCount} more`}
							</button>
						{/if}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Years -->
		{#if yearFacet.length > 0}
			<div style="border-bottom: 1px solid var(--color-border);">
				{@render sectionHeader('years', 'Years', selectedYears.size)}
				{#if panelsOpen.years}
					<div class="flex flex-col pb-1.5" transition:slide={{ duration: 160 }}>
						{#each yearFacet as row (row.value)}
							{@render facetRow(
								row.value,
								row.count,
								yearMax,
								row.selected,
								() => toggleYear(Number(row.value)),
								'font-mono text-[0.7rem]'
							)}
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Ratings -->
		<div>
			{@render sectionHeader('ratings', 'Ratings', minRating > 0 ? 1 : 0)}
			{#if panelsOpen.ratings}
				<div class="flex flex-col pb-1.5" transition:slide={{ duration: 160 }}>
					{#each ratingFacet as row (row.stars)}
						{@render facetRow(
							'◆'.repeat(row.stars),
							row.count,
							ratingMax,
							minRating === row.stars,
							() => (minRating = minRating === row.stars ? 0 : row.stars),
							'text-[0.62rem] tracking-[0.12em]'
						)}
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/snippet}

<div class="mx-auto max-w-[960px] px-4 pt-6 pb-16">
	<h1
		class="mb-2 text-center font-serif text-xl md:text-2xl"
		style="font-variant: small-caps; letter-spacing: 0.1em; font-weight: 400; color: var(--color-text);"
	>
		Media Log
	</h1>
	<div class="separator mb-5"><span class="separator-glyph">◆</span></div>

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
						class="min-w-0 flex-1 rounded px-3 py-2 font-mono text-sm outline-none"
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
				onclick={() => load(currentToken())}
				class="mt-2 cursor-pointer font-mono text-xs hover:text-[--color-accent]"
				style="color: var(--color-text-muted); background: none; border: none;"
			>
				retry
			</button>
		</div>
	{:else}
		<Heatmap
			entries={doneEntries.map((e) => ({ title: e.title, added_at: e.added_at }))}
			selected={selectedDay}
			onselect={(day) => (selectedDay = day)}
		/>

		<div class="flex flex-col gap-6 md:flex-row">
			<!-- Main column -->
			<div class="min-w-0 flex-1">
				<!-- Add panel: open by default for admin, minimizable -->
				{#if isAdmin}
					<div
						class="mb-3 rounded"
						style="border: 1px solid var(--color-border); background: var(--color-surface);"
					>
						<button
							onclick={() => (formOpen = !formOpen)}
							class="flex w-full cursor-pointer items-center gap-2 px-2.5 py-1.5"
							style="background: none; border: none;"
						>
							<ToggleDiamond open={formOpen} />
							<span
								class="font-mono text-[0.62rem] tracking-[0.12em] uppercase"
								style="color: var(--color-text-muted);"
							>
								add to {activeTab === 'todo' ? 'backlog' : 'log'}
							</span>
						</button>
						{#if formOpen}
							<div
								style="border-top: 1px solid var(--color-border);"
								transition:slide={{ duration: 200, easing: cubicOut }}
							>
								<!-- keyed on the tab so a new entry lands in the visible list -->
								{#key activeTab}
									<MediaForm
										entry={null}
										defaultStatus={activeTab}
										bare
										onsave={saveEntry}
										oncancel={() => (formOpen = false)}
										onfetchmeta={fetchMetaFor}
										{findByUrl}
										oneditexisting={editExisting}
									/>
								{/key}
							</div>
						{/if}
					</div>
				{/if}

				<!-- Search + controls: one box -->
				<div class="mb-3 rounded" style="border: 1px solid var(--color-border);">
					<div
						class="flex min-w-0 items-center gap-2 px-2.5 py-1.5"
						style="border-bottom: 1px solid var(--color-border);"
					>
						<input
							bind:value={searchTerm}
							type="text"
							placeholder="filter by title, author, note, comment…"
							class="min-w-0 flex-1 border-none bg-transparent text-[0.85rem] outline-none"
							style="color: var(--color-text); font-family: var(--font-body);"
						/>
						{#if hasFilters}
							<button
								onclick={clearFilters}
								class="shrink-0 cursor-pointer font-mono text-[0.65rem] transition-colors duration-200 hover:text-[--color-accent]"
								style="color: var(--color-text-muted); background: none; border: none;"
								>clear</button
							>
						{/if}
					</div>
					{@render controlStrip()}
				</div>

				<!-- Mobile filters (same panels as the sidebar) -->
				<div class="mb-3 md:hidden">
					<button
						onclick={() => (mobileFiltersOpen = !mobileFiltersOpen)}
						class="flex w-full cursor-pointer items-center gap-2 rounded px-2.5 py-1.5"
						style="border: 1px solid var(--color-border);"
					>
						<ToggleDiamond open={mobileFiltersOpen} />
						<span
							class="font-mono text-[0.62rem] tracking-[0.12em] uppercase"
							style="color: var(--color-text-muted);"
						>
							filters{activeFilterCount > 0 ? ` · ${activeFilterCount}` : ''}
						</span>
					</button>
					{#if mobileFiltersOpen}
						<div class="mt-2" transition:slide={{ duration: 200, easing: cubicOut }}>
							{@render facetPanels()}
						</div>
					{/if}
				</div>

				<!-- Entries (inline edit swaps the row for the form, in place) -->
				<div class="flex flex-col">
					{#each displayList as entry (entry.id)}
						<div id="entry-{entry.id}">
							{#if editing?.id === entry.id}
								<div class="py-4" style="border-bottom: 1px solid var(--color-border);">
									{#if editingPinned}
										<p
											class="mb-1 font-mono text-[0.65rem]"
											style="color: var(--color-text-muted);"
										>
											◆ pinned while editing (hidden by current filters)
										</p>
									{/if}
									<MediaForm
										entry={editing}
										onsave={saveEntry}
										oncancel={cancelEdit}
										onfetchmeta={fetchMetaFor}
										{findByUrl}
										oneditexisting={editExisting}
									/>
								</div>
							{:else}
								<MediaRow
									{entry}
									{isAdmin}
									ontopic={toggleTopic}
									onedit={startEdit}
									ondelete={deleteEntry}
									onaddcomment={addComment}
									ondeletecomment={deleteComment}
									onmarkread={markRead}
								/>
							{/if}
						</div>
					{/each}

					{#if displayList.length === 0}
						<div class="py-12 text-center">
							<p class="font-serif text-base" style="color: var(--color-text-muted);">
								{tabBase.length === 0
									? activeTab === 'todo'
										? 'The backlog is empty'
										: 'The log is empty'
									: 'No matching entries'}
							</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- Sidebar: faceted filters + stats (desktop) -->
			<!-- Sticky and internally scrollable: bottom panels stay reachable
			     without scrolling the whole page. -->
			<aside
				class="hidden w-full shrink-0 md:sticky md:top-16 md:block md:max-h-[calc(100vh-5rem)] md:w-[240px] md:self-start md:overflow-y-auto"
			>
				{@render facetPanels()}
			</aside>
		</div>
	{/if}
</div>

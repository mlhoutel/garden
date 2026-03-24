<script lang="ts">
	import type { SearchItem, SearchIndex, SearchMode, Page } from '$types/types';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import FlexSearch from 'flexsearch';
	import type { Document, DocumentData, Id } from 'flexsearch';
	import pagesManifest from '$meta/manifest.json';

	// Local helper type: override DocumentData only for this page
	type DocumentFor<T> = Document<T & Record<string, any>>;

	let { mode = 'compact' as SearchMode, initialTopics = [] as string[] } = $props();

	let searchBar: HTMLInputElement;
	let isActive = $state(false);
	let searchTerm = $state('');
	let searchResults = $state<SearchItem[]>([]);
	let selectedTopics = $state<Set<string>>(new Set(initialTopics));
	let availableTopics = $state<string[]>([]);
	let matchingTopics = $state<string[]>([]);
	let currentFocusIndex = $state(-1);

	let index: DocumentFor<SearchItem>;
	let searchData: SearchIndex = {};
	let idToSlugMap: string[] = [];
	let allContent: SearchItem[] = [];

	const contextWindowWords = 40;
	const numCompactResults = 6;
	const numFullPageResults = 50;

	let numResults = $derived(mode === 'compact' ? numCompactResults : numFullPageResults);

	$effect(() => {
		if (initialTopics.length > 0) {
			selectedTopics = new Set(initialTopics);
			performSearch();
		}
	});

	const encoder = (str: string) => {
		return str
			.toLowerCase()
			.split(/\s+/)
			.filter((token) => token.length > 0);
	};

	onMount(async () => {
		index = new FlexSearch.Document({
			encode: encoder,
			document: {
				id: 'id',
				tag: 'tags',
				index: [
					{ field: 'title', tokenize: 'forward' },
					{ field: 'content', tokenize: 'forward' },
					{ field: 'tags', tokenize: 'forward' },
					{ field: 'topics', tokenize: 'forward' }
				]
			}
		});

		await loadSearchData();

		if (mode === 'compact') {
			window.addEventListener('keydown', handleKeydown);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined' && mode === 'compact') {
			window.removeEventListener('keydown', handleKeydown);
		}
	});

	async function loadSearchData() {
		try {
			// Build search index directly from manifest -no API calls needed
			const pages = (pagesManifest as Page[]).filter((p) => p.meta.published !== false);

			let id = 0;
			const topicsSet = new Set<string>();

			for (const item of pages) {
				const slug = item.path.replace('.md', '');
				const itemTopics = item.meta.topic ? item.meta.topic.split(' ').filter(Boolean) : [];

				itemTopics.forEach((t: string) => topicsSet.add(t));

				const searchItem: SearchItem = {
					id,
					slug,
					title: item.meta.title || '',
					content: item.meta.short || '',
					tags: [],
					topics: itemTopics,
					meta: item.meta
				};

				idToSlugMap[id] = slug;
				allContent.push(searchItem);

				await index.addAsync(id, searchItem);
				id++;
			}

			availableTopics = Array.from(topicsSet).sort();

			if (mode === 'fullpage') {
				performSearch();
			}
		} catch (error) {
			console.error('Failed to load search data:', error);
		}
	}

	function tokenizeTerm(term: string): string[] {
		const tokens = term.split(/\s+/).filter((t) => t.trim() !== '');
		const tokenLen = tokens.length;
		if (tokenLen > 1) {
			for (let i = 1; i < tokenLen; i++) {
				tokens.push(tokens.slice(0, i + 1).join(' '));
			}
		}
		return tokens.sort((a, b) => b.length - a.length);
	}

	function highlight(searchTerm: string, text: string, trim = false): string {
		if (!text) return '';

		const tokenizedTerms = tokenizeTerm(searchTerm);
		let tokenizedText = text.split(/\s+/).filter((t) => t !== '');

		let startIndex = 0;
		let endIndex = tokenizedText.length - 1;

		if (trim) {
			const includesCheck = (tok: string) =>
				tokenizedTerms.some((term) => tok.toLowerCase().startsWith(term.toLowerCase()));
			const occurrencesIndices = tokenizedText.map(includesCheck);

			let bestSum = 0;
			let bestIndex = 0;
			for (let i = 0; i < Math.max(tokenizedText.length - contextWindowWords, 0); i++) {
				const window = occurrencesIndices.slice(i, i + contextWindowWords);
				const windowSum = window.reduce((total, cur) => total + (cur ? 1 : 0), 0);
				if (windowSum >= bestSum) {
					bestSum = windowSum;
					bestIndex = i;
				}
			}

			startIndex = Math.max(bestIndex - contextWindowWords, 0);
			endIndex = Math.min(startIndex + 2 * contextWindowWords, tokenizedText.length - 1);
			tokenizedText = tokenizedText.slice(startIndex, endIndex);
		}

		const slice = tokenizedText
			.map((tok) => {
				for (const searchTok of tokenizedTerms) {
					if (tok.toLowerCase().includes(searchTok.toLowerCase())) {
						const regex = new RegExp(searchTok, 'gi');
						return tok.replace(regex, '<mark>$&</mark>');
					}
				}
				return tok;
			})
			.join(' ');

		return `${startIndex === 0 ? '' : '...'}${slice}${
			endIndex === tokenizedText.length - 1 ? '' : '...'
		}`;
	}

	async function performSearch() {
		if (!index) {
			searchResults = [];
			return;
		}

		let filteredResults: SearchItem[] = [...allContent];

		// Filter by selected topics
		if (selectedTopics.size > 0) {
			filteredResults = filteredResults.filter((item) =>
				item.topics.some((topic: string) => selectedTopics.has(topic))
			);
		}

		// If there's a search term, use FlexSearch
		if (searchTerm.trim()) {
			const results = await index.searchAsync({
				query: searchTerm,
				limit: numResults * 10, // Get more for filtering
				index: ['title', 'content']
			});

			const getByField = (field: string): number[] => {
				const fieldResults = results.filter((x: any) => x.field === field);
				return fieldResults.length === 0 ? [] : ([...fieldResults[0].result] as number[]);
			};

			const matchedIds = new Set([...getByField('title'), ...getByField('content')]);

			// Filter by search matches and topics
			filteredResults = filteredResults.filter((item) => matchedIds.has(item.id));
		}

		// Format results with highlighting
		searchResults = filteredResults.slice(0, numResults).map((item) => ({
			...item,
			title: searchTerm ? highlight(searchTerm, item.title) : item.title,
			content: searchTerm ? highlight(searchTerm, item.content, true) : item.content.slice(0, 200)
		}));

		// Find matching topics for suggestions
		if (searchTerm.trim() && mode === 'compact') {
			const term = searchTerm.toLowerCase().trim();
			matchingTopics = availableTopics.filter((t) => t.toLowerCase().includes(term)).slice(0, 5);
		} else {
			matchingTopics = [];
		}

		currentFocusIndex = -1;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (mode !== 'compact') return;

		// Cmd/Ctrl + K to toggle search
		if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			toggleSearch();
			return;
		}

		if (!isActive) return;

		if (e.key === 'Escape') {
			closeSearch();
			return;
		}

		if (e.key === 'Enter' && searchResults.length > 0) {
			e.preventDefault();
			const index = currentFocusIndex >= 0 ? currentFocusIndex : 0;
			if (searchResults[index]) {
				navigateToResult(searchResults[index].slug);
			}
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			currentFocusIndex = Math.min(currentFocusIndex + 1, searchResults.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			currentFocusIndex = Math.max(currentFocusIndex - 1, -1);
			if (currentFocusIndex === -1) {
				searchBar?.focus();
			}
		}
	}

	function toggleSearch() {
		if (isActive) {
			closeSearch();
		} else {
			openSearch();
		}
	}

	function openSearch() {
		isActive = true;
		setTimeout(() => searchBar?.focus(), 10);
	}

	function closeSearch() {
		isActive = false;
		searchTerm = '';
		searchResults = [];
		currentFocusIndex = -1;
	}

	function handleInput() {
		performSearch();
	}

	function navigateToResult(slug: string) {
		if (mode === 'compact') {
			closeSearch();
		}
		goto(`${base}/${slug}`);
	}

	function toggleTopic(topic: string) {
		const newTopics = new Set(selectedTopics);
		if (newTopics.has(topic)) {
			newTopics.delete(topic);
		} else {
			newTopics.add(topic);
		}
		selectedTopics = newTopics;
		performSearch();

		// Update URL in fullpage mode
		if (mode === 'fullpage') {
			const params = new URLSearchParams();
			if (newTopics.size > 0) {
				params.set('topics', Array.from(newTopics).join(','));
			}
			if (searchTerm) {
				params.set('q', searchTerm);
			}
			const queryString = params.toString();
			goto(`${base}/search${queryString ? '?' + queryString : ''}`, {
				replaceState: true,
				noScroll: true
			});
		}
	}

	function clearFilters() {
		selectedTopics = new Set();
		searchTerm = '';
		performSearch();
	}
</script>

{#if mode === 'compact'}
	<!-- Compact top bar search -->
	<div class="search-compact">
		<button class="search-button" onclick={openSearch} aria-label="Search" title="Search (Cmd+K)">
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
				<path
					d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"
					fill="currentColor"
				/>
			</svg>
			<span class="search-hint">Search</span>
			<kbd>⌘K</kbd>
		</button>

		{#if isActive}
			<div class="search-overlay" onclick={closeSearch} role="button" tabindex="-1"></div>
			<div class="search-popover">
				<div class="search-input-wrapper">
					<svg class="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<path
							d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"
							fill="currentColor"
						/>
					</svg>
					<input
						bind:this={searchBar}
						bind:value={searchTerm}
						oninput={handleInput}
						type="text"
						placeholder="Search articles..."
						class="search-input"
					/>
					<button class="close-btn" onclick={closeSearch} aria-label="Close">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path
								d="M12 4L4 12M4 4l8 8"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
							/>
						</svg>
					</button>
				</div>

				<div class="search-results">
					<!-- Topic suggestions -->
					{#if matchingTopics.length > 0}
						<div class="topic-suggestions">
							<span class="suggestion-label">Topics</span>
							<div class="suggestion-pills">
								{#each matchingTopics as topic (topic)}
									<button
										class="suggestion-pill"
										onclick={() => {
											closeSearch();
											goto(`${base}/search?topics=${topic}`);
										}}
									>
										#{topic}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					{#if searchTerm && searchResults.length === 0 && matchingTopics.length === 0}
						<div class="no-results">
							<p>No results found</p>
							<p class="hint">Try different keywords</p>
						</div>
					{:else if searchResults.length > 0}
						{#each searchResults as result, i (result.id)}
							<button
								class="result-card"
								class:focused={i === currentFocusIndex}
								onclick={() => navigateToResult(result.slug)}
								onmouseenter={() => (currentFocusIndex = i)}
							>
								{#if result.topics.length > 0}
									<div class="result-overline">
										{#each result.topics.slice(0, 3) as topic, i (i)}
											<span class="topic-badge">{topic}</span>
										{/each}
									</div>
								{/if}
								<h3 class="result-title">{@html result.title}</h3>
								<p class="result-content">{@html result.content}</p>
							</button>
						{/each}
					{:else}
						<div class="search-hint-text">
							<p>Start typing to search articles...</p>
							<p class="hint">Or use Cmd+K to open/close</p>
						</div>
					{/if}
				</div>

				<div class="search-footer">
					<div class="shortcuts">
						<span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
						<span><kbd>Enter</kbd> Open</span>
						<span><kbd>Esc</kbd> Close</span>
					</div>
				</div>
			</div>
		{/if}
	</div>
{:else}
	<!-- Full page search -->
	<div class="search-fullpage">
		<div class="search-header">
			<h1>Search</h1>
			<div class="search-input-wrapper">
				<svg class="search-icon" width="20" height="20" viewBox="0 0 18 18" fill="none">
					<path
						d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"
						fill="currentColor"
					/>
				</svg>
				<input
					bind:this={searchBar}
					bind:value={searchTerm}
					oninput={handleInput}
					type="text"
					placeholder="Search articles..."
					class="search-input"
				/>
			</div>
		</div>

		<div class="filters-section">
			<div class="filter-header">
				<h3>Filter by Topics</h3>
				{#if selectedTopics.size > 0 || searchTerm}
					<button class="clear-filters" onclick={clearFilters}>Clear all</button>
				{/if}
			</div>
			<div class="topic-filters">
				{#each availableTopics as topic, i (i)}
					<button
						class="topic-filter"
						class:active={selectedTopics.has(topic)}
						onclick={() => toggleTopic(topic)}
					>
						{topic}
					</button>
				{/each}
			</div>
		</div>

		<div class="results-info">
			<p>{searchResults.length} article{searchResults.length !== 1 ? 's' : ''} found</p>
		</div>

		<div class="search-results-list">
			{#each searchResults as result (result.id)}
				<article class="result-item">
					{#if result.topics.length > 0}
						<div class="result-overline">
							{#each result.topics as topic, i (i)}
								<button class="topic-badge clickable" onclick={() => toggleTopic(topic)}>
									{topic}
								</button>
							{/each}
						</div>
					{/if}
					<a href="{base}/{result.slug}" class="result-link">
						<h2 class="result-title">{@html result.title}</h2>
						<p class="result-content">{@html result.content}</p>
					</a>
				</article>
			{/each}
		</div>
	</div>
{/if}

<style>
	/* Topic suggestions in compact search */
	.topic-suggestions {
		padding: 0.6rem 0.85rem;
		border-bottom: 1px solid rgba(212, 160, 23, 0.1);
	}

	.suggestion-label {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #6b6460;
		margin-bottom: 0.4rem;
	}

	.suggestion-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
	}

	.suggestion-pill {
		padding: 0.15rem 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: #d4a017;
		background: rgba(212, 160, 23, 0.08);
		border: 1px solid rgba(212, 160, 23, 0.2);
		border-radius: 2px;
		cursor: pointer;
		transition: all 0.15s;
		letter-spacing: 0.03em;
	}

	.suggestion-pill:hover {
		background: rgba(212, 160, 23, 0.2);
		border-color: #d4a017;
	}
	/* Compact Mode -always dark-themed to match the header */
	.search-compact {
		position: relative;
	}

	.search-button {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.3rem 0.5rem;
		background: transparent;
		border: 1px solid rgba(212, 160, 23, 0.2);
		border-radius: 4px;
		cursor: pointer;
		color: #9a928a;
		transition: all 0.2s;
		font-size: 0.75rem;
	}

	.search-button:hover {
		border-color: #d4a017;
		color: #d4a017;
	}

	.search-button svg {
		width: 14px;
		height: 14px;
	}

	.search-hint {
		display: none;
	}

	@media (min-width: 640px) {
		.search-hint {
			display: inline;
			font-family: var(--font-serif);
			letter-spacing: 0.05em;
		}
	}

	.search-button kbd {
		display: none;
		padding: 0.1rem 0.3rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(212, 160, 23, 0.15);
		border-radius: 2px;
		font-family: var(--font-mono);
		font-size: 0.6rem;
		color: #9a928a;
	}

	@media (min-width: 768px) {
		.search-button kbd {
			display: inline;
		}
	}

	/* Overlay + Popover -dark themed */
	.search-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(6px);
		z-index: 100;
		animation: fadeIn 0.2s;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.search-popover {
		position: fixed;
		top: 60px;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		max-width: 600px;
		max-height: 70vh;
		background: #1e1e1e;
		border: 1px solid rgba(212, 160, 23, 0.15);
		border-radius: 8px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
		z-index: 101;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		animation: slideDown 0.2s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translate(-50%, -10px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}

	.search-input-wrapper {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.85rem 1rem;
		border-bottom: 1px solid rgba(212, 160, 23, 0.1);
	}

	.search-icon {
		color: #d4a017;
		flex-shrink: 0;
	}

	.search-input {
		flex: 1;
		border: none;
		background: transparent;
		font-size: 0.95rem;
		outline: none;
		color: #e8e0d4;
		font-family: var(--font-body);
	}

	.search-input::placeholder {
		color: #6b6460;
	}

	.close-btn {
		padding: 0.25rem;
		background: transparent;
		border: none;
		cursor: pointer;
		color: #6b6460;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.close-btn:hover {
		color: #d4a017;
	}

	.search-results {
		flex: 1;
		overflow-y: auto;
		padding: 0.5rem;
	}

	.no-results,
	.search-hint-text {
		padding: 2.5rem 1rem;
		text-align: center;
		color: #6b6460;
	}

	.hint {
		font-size: 0.8rem;
		margin-top: 0.5rem;
		opacity: 0.6;
	}

	.result-card {
		width: 100%;
		padding: 0.75rem 0.85rem;
		margin-bottom: 0.2rem;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 6px;
		text-align: left;
		cursor: pointer;
		transition: all 0.15s;
	}

	.result-card:hover,
	.result-card.focused {
		background: rgba(212, 160, 23, 0.06);
		border-color: rgba(212, 160, 23, 0.2);
	}

	.result-overline {
		display: flex;
		gap: 0.3rem;
		flex-wrap: wrap;
		margin-bottom: 0.4rem;
	}

	.topic-badge {
		font-size: 0.65rem;
		padding: 0.1rem 0.4rem;
		background: rgba(212, 160, 23, 0.15);
		color: #d4a017;
		border-radius: 2px;
		font-weight: 500;
		border: none;
		font-family: var(--font-mono);
	}

	.topic-badge.clickable {
		cursor: pointer;
		transition: all 0.15s;
	}

	.topic-badge.clickable:hover {
		background: rgba(212, 160, 23, 0.3);
	}

	.result-title {
		margin: 0 0 0.35rem 0;
		font-size: 0.9rem;
		font-weight: 500;
		line-height: 1.4;
		color: #e8e0d4;
		font-family: var(--font-serif);
	}

	.result-content {
		margin: 0;
		font-size: 0.8rem;
		color: #9a928a;
		line-height: 1.5;
	}

	.search-footer {
		padding: 0.6rem 0.85rem;
		border-top: 1px solid rgba(212, 160, 23, 0.1);
		background: rgba(0, 0, 0, 0.2);
	}

	.shortcuts {
		display: flex;
		gap: 0.75rem;
		font-size: 0.7rem;
		color: #6b6460;
		justify-content: center;
	}

	kbd {
		padding: 0.1rem 0.3rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(212, 160, 23, 0.12);
		border-radius: 2px;
		font-family: var(--font-mono);
		font-size: 0.6rem;
		color: #9a928a;
	}

	/* Full Page Mode -uses design system tokens */
	.search-fullpage {
		max-width: 680px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.search-header {
		margin-bottom: 2rem;
	}

	.search-header h1 {
		margin-bottom: 1rem;
		font-family: var(--font-serif);
		font-variant: small-caps;
		letter-spacing: 0.05em;
	}

	.search-fullpage .search-input-wrapper {
		border: 1px solid var(--color-border);
		border-radius: 4px;
		padding: 0.75rem 1rem;
	}

	.search-fullpage .search-input {
		font-size: 1rem;
		color: var(--color-text);
	}

	.search-fullpage .search-input::placeholder {
		color: var(--color-text-muted);
	}

	.search-fullpage .search-icon {
		color: var(--color-accent);
	}

	.filters-section {
		margin-bottom: 2rem;
	}

	.filter-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.filter-header h3 {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin: 0;
		font-family: var(--font-mono);
	}

	.clear-filters {
		padding: 0.25rem 0.75rem;
		background: transparent;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		font-size: 0.8rem;
		cursor: pointer;
		color: var(--color-text-muted);
		transition: all 0.15s;
		font-family: var(--font-mono);
	}

	.clear-filters:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.topic-filters {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.topic-filter {
		padding: 3px 8px;
		background: transparent;
		border: 1px solid var(--color-border);
		border-radius: 2px;
		font-size: 0.75rem;
		cursor: pointer;
		transition: all 0.15s;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		letter-spacing: 0.03em;
	}

	.topic-filter:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.topic-filter.active {
		background: var(--color-accent);
		color: #1a1a1a;
		border-color: var(--color-accent);
		font-weight: 700;
	}

	.results-info {
		margin-bottom: 1.5rem;
		padding: 0.6rem 1rem;
		background: var(--color-surface);
		border-radius: 4px;
		text-align: center;
	}

	.results-info p {
		margin: 0;
		font-size: 0.8rem;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
	}

	.search-results-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.result-item {
		padding: 1.25rem 0;
		background: transparent;
		border-bottom: 1px solid var(--color-border);
		transition: all 0.2s;
	}

	.result-item:hover {
		padding-left: 0.5rem;
	}

	.result-link {
		text-decoration: none;
		color: inherit;
	}

	.result-item .result-title {
		font-size: 1.1rem;
		margin-bottom: 0.4rem;
		font-family: var(--font-serif);
		color: var(--color-text);
		transition: color 0.2s;
	}

	.result-item:hover .result-title {
		color: var(--color-accent);
	}

	.result-item .result-content {
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--color-text-muted);
	}

	:global(mark) {
		background: rgba(212, 160, 23, 0.2);
		color: inherit;
		padding: 0.1rem 0.2rem;
		border-radius: 2px;
		font-weight: 500;
	}
</style>

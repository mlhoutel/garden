<script lang="ts">
	import type { SearchItem, SearchIndex, SearchMode } from '$types/types';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import FlexSearch from 'flexsearch';
	import type { Document, DocumentData, Id } from 'flexsearch';

	// Local helper type: override DocumentData only for this page
	type DocumentFor<T> = Document<T & Record<string, any>>;

	export let mode: SearchMode = 'compact';
	export let initialTopics: string[] = [];

	let searchBar: HTMLInputElement;
	let isActive = false;
	let searchTerm = '';
	let searchResults: SearchItem[] = [];
	let selectedTopics: Set<string> = new Set(initialTopics);
	let availableTopics: string[] = [];
	let currentFocusIndex = -1;

	let index: DocumentFor<SearchItem>;
	let searchData: SearchIndex = {};
	let idToSlugMap: string[] = [];
	let allContent: SearchItem[] = [];

	const contextWindowWords = 40;
	const numCompactResults = 6;
	const numFullPageResults = 50;

	$: numResults = mode === 'compact' ? numCompactResults : numFullPageResults;
	$: if (initialTopics.length > 0) {
		selectedTopics = new Set(initialTopics);
		performSearch();
	}

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
		if (mode === 'compact') {
			window.removeEventListener('keydown', handleKeydown);
		}
	});

	async function loadSearchData() {
		try {
			// Load from your existing API
			const sectionsRes = await fetch(`${base}/api/sections`);
			const sections = await sectionsRes.json();

			const results = await Promise.all(
				sections.map(async (section: string) => {
					const res = await fetch(`${base}/api/${section}`);
					return res.ok ? await res.json() : [];
				})
			);

			const content = results.flat();

			// Build search index from API data
			let id = 0;
			const topicsSet = new Set<string>();

			for (const item of content) {
				const slug = item.slug || item.id || `item-${id}`;
				const itemTopics = item.meta?.topic ? item.meta.topic.split(' ') : [];

				itemTopics.forEach((t: string) => topicsSet.add(t));

				const searchItem: SearchItem = {
					id,
					slug,
					title: item.meta?.title || item.title || '',
					content: item.content || '',
					tags: item.meta?.tags || [],
					topics: itemTopics,
					meta: item.meta
				};

				idToSlugMap[id] = slug;
				allContent.push(searchItem);

				await index.addAsync(id, searchItem);
				id++;
			}

			availableTopics = Array.from(topicsSet).sort();

			// Initial search if in fullpage mode
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
		<button class="search-button" on:click={openSearch} aria-label="Search" title="Search (Cmd+K)">
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
			<div class="search-overlay" on:click={closeSearch}></div>
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
						on:input={handleInput}
						type="text"
						placeholder="Search articles..."
						class="search-input"
					/>
					<button class="close-btn" on:click={closeSearch} aria-label="Close">
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
					{#if searchTerm && searchResults.length === 0}
						<div class="no-results">
							<p>No results found</p>
							<p class="hint">Try different keywords</p>
						</div>
					{:else if searchResults.length > 0}
						{#each searchResults as result, i (result.id)}
							<button
								class="result-card"
								class:focused={i === currentFocusIndex}
								on:click={() => navigateToResult(result.slug)}
								on:mouseenter={() => (currentFocusIndex = i)}
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
					on:input={handleInput}
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
					<button class="clear-filters" on:click={clearFilters}>Clear all</button>
				{/if}
			</div>
			<div class="topic-filters">
				{#each availableTopics as topic, i (i)}
					<button
						class="topic-filter"
						class:active={selectedTopics.has(topic)}
						on:click={() => toggleTopic(topic)}
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
								<button class="topic-badge clickable" on:click={() => toggleTopic(topic)}>
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
	/* Compact Mode Styles */
	.search-compact {
		position: relative;
	}

	.search-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: transparent;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 6px;
		cursor: pointer;
		color: var(--text-secondary, #6b7280);
		transition: all 0.2s;
		font-size: 0.875rem;
	}

	.search-button:hover {
		background: var(--hover-bg, #f9fafb);
		border-color: var(--border-hover, #d1d5db);
	}

	.search-hint {
		display: none;
	}

	@media (min-width: 640px) {
		.search-hint {
			display: inline;
		}
	}

	.search-button kbd {
		display: none;
		padding: 0.125rem 0.375rem;
		background: var(--kbd-bg, #f3f4f6);
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 3px;
		font-family: monospace;
		font-size: 0.7rem;
	}

	@media (min-width: 768px) {
		.search-button kbd {
			display: inline;
		}
	}

	.search-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
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
		top: 80px;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		max-width: 640px;
		max-height: 70vh;
		background: var(--bg, white);
		border-radius: 12px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--border, #e5e7eb);
	}

	.search-icon {
		color: var(--text-secondary, #9ca3af);
		flex-shrink: 0;
	}

	.search-input {
		flex: 1;
		border: none;
		background: transparent;
		font-size: 1rem;
		outline: none;
		color: var(--text, #111827);
	}

	.search-input::placeholder {
		color: var(--text-secondary, #9ca3af);
	}

	.close-btn {
		padding: 0.25rem;
		background: transparent;
		border: none;
		cursor: pointer;
		color: var(--text-secondary, #9ca3af);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: background 0.2s;
	}

	.close-btn:hover {
		background: var(--hover-bg, #f3f4f6);
	}

	.search-results {
		flex: 1;
		overflow-y: auto;
		padding: 0.5rem;
	}

	.no-results,
	.search-hint-text {
		padding: 3rem 1rem;
		text-align: center;
		color: var(--text-secondary, #6b7280);
	}

	.hint {
		font-size: 0.875rem;
		margin-top: 0.5rem;
		opacity: 0.7;
	}

	.result-card {
		width: 100%;
		padding: 0.875rem 1rem;
		margin-bottom: 0.25rem;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 8px;
		text-align: left;
		cursor: pointer;
		transition: all 0.15s;
	}

	.result-card:hover,
	.result-card.focused {
		background: var(--hover-bg, #f9fafb);
		border-color: var(--accent, #3b82f6);
	}

	.result-overline {
		display: flex;
		gap: 0.375rem;
		flex-wrap: wrap;
		margin-bottom: 0.5rem;
	}

	.topic-badge {
		font-size: 0.7rem;
		padding: 0.125rem 0.5rem;
		background: var(--topic-bg, #e0e7ff);
		color: var(--topic-color, #4f46e5);
		border-radius: 4px;
		font-weight: 500;
		border: none;
	}

	.topic-badge.clickable {
		cursor: pointer;
		transition: all 0.15s;
	}

	.topic-badge.clickable:hover {
		background: var(--topic-hover-bg, #c7d2fe);
	}

	.result-title {
		margin: 0 0 0.5rem 0;
		font-size: 0.95rem;
		font-weight: 600;
		line-height: 1.4;
		color: var(--text, #111827);
	}

	.result-content {
		margin: 0;
		font-size: 0.85rem;
		color: var(--text-secondary, #6b7280);
		line-height: 1.5;
	}

	.search-footer {
		padding: 0.75rem 1rem;
		border-top: 1px solid var(--border, #e5e7eb);
		background: var(--footer-bg, #f9fafb);
	}

	.shortcuts {
		display: flex;
		gap: 1rem;
		font-size: 0.75rem;
		color: var(--text-secondary, #6b7280);
		justify-content: center;
	}

	kbd {
		padding: 0.125rem 0.375rem;
		background: var(--kbd-bg, white);
		border: 1px solid var(--border, #d1d5db);
		border-radius: 3px;
		font-family: monospace;
		font-size: 0.7rem;
	}

	/* Full Page Mode Styles */
	.search-fullpage {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.search-header {
		margin-bottom: 2rem;
	}

	.search-header h1 {
		margin-bottom: 1rem;
	}

	.search-fullpage .search-input-wrapper {
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 8px;
		padding: 0.75rem 1rem;
	}

	.search-fullpage .search-input {
		font-size: 1.125rem;
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
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary, #6b7280);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.clear-filters {
		padding: 0.25rem 0.75rem;
		background: transparent;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 6px;
		font-size: 0.875rem;
		cursor: pointer;
		color: var(--text-secondary, #6b7280);
		transition: all 0.15s;
	}

	.clear-filters:hover {
		background: var(--hover-bg, #f9fafb);
		border-color: var(--accent, #3b82f6);
		color: var(--accent, #3b82f6);
	}

	.topic-filters {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.topic-filter {
		padding: 0.5rem 1rem;
		background: var(--filter-bg, #f3f4f6);
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 6px;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.15s;
		color: var(--text, #111827);
	}

	.topic-filter:hover {
		background: var(--hover-bg, #e5e7eb);
	}

	.topic-filter.active {
		background: var(--accent, #3b82f6);
		color: white;
		border-color: var(--accent, #3b82f6);
	}

	.results-info {
		margin-bottom: 1.5rem;
		padding: 0.75rem 1rem;
		background: var(--info-bg, #f9fafb);
		border-radius: 8px;
		text-align: center;
	}

	.results-info p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary, #6b7280);
	}

	.search-results-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.result-item {
		padding: 1.5rem;
		background: var(--card-bg, white);
		border: 1px solid var(--border, #e5e7eb);
		border-radius: 8px;
		transition: all 0.2s;
	}

	.result-item:hover {
		border-color: var(--accent, #3b82f6);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.result-link {
		text-decoration: none;
		color: inherit;
	}

	.result-item .result-title {
		font-size: 1.25rem;
		margin-bottom: 0.75rem;
	}

	.result-item .result-content {
		font-size: 0.95rem;
		line-height: 1.6;
	}

	:global(mark) {
		background: var(--highlight-bg, #fef08a);
		color: inherit;
		padding: 0.125rem 0.25rem;
		border-radius: 2px;
		font-weight: 500;
	}
</style>

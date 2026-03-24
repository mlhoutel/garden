<script lang="ts">
	import type { Page } from '$types/types';
	import { base } from '$app/paths';

	let { items = [] }: { items: Page[] } = $props();

	let visibleCount = $state(12);
	let sentinel: HTMLDivElement;
	let allCategories = $derived([...new Set(items.map((i) => i.meta.subsection))].sort());
	let selectedCategory = $state<string | null>(null);

	let filtered = $derived(
		selectedCategory ? items.filter((i) => i.meta.subsection === selectedCategory) : items
	);
	let visible = $derived(filtered.slice(0, visibleCount));
	let hasMore = $derived(visibleCount < filtered.length);

	// Detect language from topics
	const langMap: Record<string, string> = {
		javascript: 'JS', js: 'JS', typescript: 'TS', python: 'PY',
		rust: 'RS', cpp: 'C++', java: 'JAVA', haskell: 'HS',
		maths: 'MATH', functions: 'FN', graphs: 'GRAPH', solving: 'ALG'
	};

	function langBadge(page: Page): string {
		const topics = page.meta.topic?.split(' ').filter(Boolean) || [];
		const match = topics.find((t) => langMap[t.toLowerCase()]);
		return match ? langMap[match.toLowerCase()] : page.meta.subsection?.toUpperCase().slice(0, 4) || 'CODE';
	}

	import { onMount, onDestroy } from 'svelte';

	let observer: IntersectionObserver;

	onMount(() => {
		if (!sentinel) return;
		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && hasMore) {
					visibleCount += 8;
				}
			},
			{ rootMargin: '200px' }
		);
		observer.observe(sentinel);
	});

	onDestroy(() => observer?.disconnect());
</script>

<!-- Category filter bar -->
<div class="mb-6 flex flex-wrap gap-2">
	<button
		onclick={() => { selectedCategory = null; visibleCount = 12; }}
		class="cursor-pointer rounded-sm border px-3 py-1 font-mono text-[0.7rem] tracking-[0.05em] transition-all duration-150"
		style="
			border-color: {selectedCategory === null ? 'var(--color-accent)' : 'var(--color-border)'};
			color: {selectedCategory === null ? '#1A1A1A' : 'var(--color-text-muted)'};
			background: {selectedCategory === null ? 'var(--color-accent)' : 'transparent'};
			font-weight: {selectedCategory === null ? '700' : '400'};
		"
	>
		all ({items.length})
	</button>
	{#each allCategories as cat}
		{@const count = items.filter((i) => i.meta.subsection === cat).length}
		<button
			onclick={() => { selectedCategory = selectedCategory === cat ? null : cat; visibleCount = 12; }}
			class="cursor-pointer rounded-sm border px-3 py-1 font-mono text-[0.7rem] tracking-[0.05em] transition-all duration-150"
			style="
				border-color: {selectedCategory === cat ? 'var(--color-accent)' : 'var(--color-border)'};
				color: {selectedCategory === cat ? '#1A1A1A' : 'var(--color-text-muted)'};
				background: {selectedCategory === cat ? 'var(--color-accent)' : 'transparent'};
				font-weight: {selectedCategory === cat ? '700' : '400'};
			"
		>
			{cat} ({count})
		</button>
	{/each}
</div>

<!-- Feed grid -->
<div class="grid gap-3 sm:grid-cols-2">
	{#each visible as page (page.path)}
		<a
			href="{base}/{page.path.replace('.md', '')}"
			class="group flex flex-col overflow-hidden rounded-md border transition-all duration-200 hover:border-[--color-accent]"
			style="border-color: var(--color-border); background: var(--color-surface);"
			data-sveltekit-preload-code="hover"
		>
			<!-- Card header -->
			<div class="flex items-center justify-between px-3 py-2" style="border-bottom: 1px solid var(--color-border);">
				<div class="min-w-0 flex-1">
					<span class="truncate font-serif text-[0.92rem] transition-colors duration-200 group-hover:text-[--color-accent]" style="color: var(--color-text);">
						{page.meta.title}
					</span>
				</div>
				<span
					class="ml-2 shrink-0 rounded-sm px-1.5 py-0.5 font-mono text-[0.55rem] tracking-wider"
					style="background: rgba(212,160,23,0.1); color: var(--color-accent); border: 1px solid rgba(212,160,23,0.2);"
				>
					{langBadge(page)}
				</span>
			</div>

			<!-- Description -->
			{#if page.meta.short}
				<div class="px-3 py-2">
					<p class="line-clamp-2 text-[0.78rem] leading-relaxed" style="color: var(--color-text-muted);">
						{page.meta.short}
					</p>
				</div>
			{/if}

			<!-- Topics -->
			{#if page.meta.topic}
				<div class="mt-auto flex flex-wrap gap-1 px-3 py-2" style="border-top: 1px solid var(--color-border);">
					{#each page.meta.topic.split(' ').filter(Boolean).slice(0, 4) as topic}
						<span class="font-mono text-[0.6rem]" style="color: var(--color-text-muted); opacity: 0.6;">
							#{topic}
						</span>
					{/each}
				</div>
			{/if}
		</a>
	{/each}
</div>

<!-- Infinite scroll sentinel -->
<div bind:this={sentinel} class="h-4"></div>

{#if !hasMore && filtered.length > 0}
	<div class="separator mt-4"><span class="separator-glyph">◆</span></div>
	<p class="text-center font-mono text-[0.7rem]" style="color: var(--color-text-muted); opacity: 0.5;">
		{filtered.length} snippets
	</p>
{/if}

{#if filtered.length === 0}
	<p class="py-12 text-center font-serif" style="color: var(--color-text-muted);">
		No snippets in this category.
	</p>
{/if}

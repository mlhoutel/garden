<script lang="ts">
	import TreeList from '$components/lists/TreeList.svelte';
	import { toUpper } from '$utils/format';
	import { base } from '$app/paths';
	import seedrandom from 'seedrandom';
	import { randomQuote } from '$utils/quotes';
	import type { SectionLoadReturn, NestedListItem } from '$types/types';

	let { data }: { data: SectionLoadReturn } = $props();

	let items = $derived(data.tree ?? ([] as NestedListItem[]));
	let title = $derived(data.title || toUpper(data.section ?? 'Content'));

	const sectionDescriptions: Record<string, string> = {
		Articles: 'Blog posts exploring topics that interest me.',
		Sheets: 'Quick reference guides and cheat sheets.',
		Snippets: 'Small code examples and algorithmic demos.'
	};

	const sectionIcons: Record<string, string> = {
		Articles: '◇ ─── ◆ ─── ◇',
		Sheets: '═══ ◆ ═══',
		Snippets: '{ ◆ }'
	};

	const selectedQuote = randomQuote();

	let description = $derived(sectionDescriptions[title] || '');
	let icon = $derived(sectionIcons[title] || '◆');

	// Constellation stars for header
	const rng = seedrandom(`section-${title}`);
	const stars: { cx: number; cy: number; r: number; opacity: number }[] = [];
	for (let i = 0; i < 150; i++) {
		stars.push({
			cx: rng() * 100,
			cy: rng() * 100,
			r: 0.02 + rng() * 0.06,
			opacity: 0.06 + rng() * 0.3
		});
	}

	// Constellation lines -connect nearby stars
	const geomRng = seedrandom(`section-geom-${title}`);
</script>

<svelte:head>
	<title>{title} - Garden</title>
	<meta name="description" content={description || `${title} section of the Garden.`} />
</svelte:head>

<!-- Section header with constellation sky -->
<div class="relative w-full" style="height: 22vh; min-height: 140px; background: #1A1A1A;">
	<svg
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid slice"
		class="absolute inset-0 h-full w-full"
	>
		<!-- Stars -->
		{#each stars as s, i (i)}
			<circle cx={s.cx} cy={s.cy} r={s.r} fill="#FFFEF6" opacity={s.opacity} />
		{/each}

		<!-- Geometric constellation lines around center -->
		{#each Array(8) as _, i}
			{@const a1 = geomRng() * Math.PI * 2}
			{@const a2 = a1 + 0.3 + geomRng() * 1.2}
			{@const r1 = 8 + geomRng() * 20}
			{@const r2 = 8 + geomRng() * 20}
			<line
				x1={50 + Math.cos(a1) * r1}
				y1={50 + Math.sin(a1) * r1}
				x2={50 + Math.cos(a2) * r2}
				y2={50 + Math.sin(a2) * r2}
				stroke="#D4A017"
				stroke-width="0.03"
				opacity="0.06"
			/>
		{/each}

		<!-- Center decorative ring -->
		<circle
			cx="50"
			cy="50"
			r="15"
			fill="none"
			stroke="#D4A017"
			stroke-width="0.03"
			opacity="0.05"
			stroke-dasharray="0.5 1"
		/>
		<circle cx="50" cy="50" r="8" fill="none" stroke="#D4A017" stroke-width="0.04" opacity="0.04" />

		<!-- Small diamonds at key positions -->
		{#each Array(5) as _, i}
			{@const a = geomRng() * Math.PI * 2}
			{@const d = 10 + geomRng() * 25}
			{@const x = 50 + Math.cos(a) * d}
			{@const y = 50 + Math.sin(a) * d}
			<polygon
				points="{x},{y - 0.4} {x + 0.25},{y} {x},{y + 0.4} {x - 0.25},{y}"
				fill="#D4A017"
				opacity="0.08"
			/>
		{/each}
	</svg>

	<!-- Title centered in the sky -->
	<div class="absolute inset-0 flex flex-col items-center justify-center px-4" style="z-index: 5;">
		<!-- Decorative icon -->
		<span
			class="mb-2 font-mono text-[0.65rem] tracking-[0.3em]"
			style="color: #D4A017; opacity: 0.4;">{icon}</span
		>
		<h1
			class="text-3xl tracking-[0.12em] md:text-5xl"
			style="font-family: var(--font-display); color: #FFFEF6; font-weight: 400; letter-spacing: 0.12em;"
		>
			{title}
		</h1>
		{#if description}
			<p class="mt-2 max-w-[28em] text-center text-[0.85rem]" style="color: #9A928A;">
				{description}
			</p>
		{/if}
	</div>
</div>

<!-- Golden separator at sky/page boundary -->
<div class="relative" style="z-index: 15; margin-top: -10px;">
	<svg
		viewBox="0 0 800 24"
		class="mx-auto block w-full"
		style="max-width: 800px; height: 24px;"
		preserveAspectRatio="xMidYMid meet"
	>
		<line x1="0" y1="12" x2="300" y2="12" stroke="#D4A017" stroke-width="0.7" opacity="0.3" />
		<polygon points="304,12 308,9 312,12 308,15" fill="#D4A017" opacity="0.45" />
		<circle cx="325" cy="12" r="2" fill="none" stroke="#D4A017" stroke-width="0.5" opacity="0.4" />
		<line x1="330" y1="12" x2="370" y2="12" stroke="#D4A017" stroke-width="0.7" opacity="0.4" />
		<polygon
			points="400,4 407,12 400,20 393,12"
			fill="none"
			stroke="#D4A017"
			stroke-width="0.6"
			opacity="0.5"
		/>
		<polygon points="400,7 404,12 400,17 396,12" fill="#D4A017" opacity="0.3" />
		<line x1="430" y1="12" x2="470" y2="12" stroke="#D4A017" stroke-width="0.7" opacity="0.4" />
		<circle cx="475" cy="12" r="2" fill="none" stroke="#D4A017" stroke-width="0.5" opacity="0.4" />
		<polygon points="488,12 492,9 496,12 492,15" fill="#D4A017" opacity="0.45" />
		<line x1="500" y1="12" x2="800" y2="12" stroke="#D4A017" stroke-width="0.7" opacity="0.3" />
	</svg>
	<!-- Quote -->
	<div class="mx-auto flex max-w-[680px] justify-end px-4 pt-0">
		<p class="font-serif text-sm italic" style="color: var(--color-text-muted);">
			"{selectedQuote.text}" ·
			<span class="text-xs not-italic">{selectedQuote.author}</span>
		</p>
	</div>
</div>

<!-- Breadcrumb -->
<div class="mx-auto max-w-[680px] px-4 pt-6">
	<nav
		class="text-[0.75rem]"
		style="color: var(--color-text-muted); font-variant: small-caps; letter-spacing: 0.05em;"
		aria-label="Breadcrumb"
	>
		<ol class="flex items-center gap-1.5">
			<li>
				<a href="{base}/" class="transition-colors duration-200 hover:text-[--color-accent]">home</a
				>
			</li>
			<li style="opacity: 0.3;">/</li>
			<li style="font-weight: 500;" aria-current="page">{title.toLowerCase()}</li>
		</ol>
	</nav>
</div>

<!-- Content -->
<div class="mx-auto max-w-[680px] px-4 pt-4 pb-16">
	{#if items.length > 0}
		<TreeList {items} />
	{:else}
		<p class="py-16 text-center" style="color: var(--color-text-muted);">
			No content available in this section.
		</p>
	{/if}
</div>

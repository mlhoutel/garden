<script lang="ts">
	import { base } from '$app/paths';
	let { data } = $props();

	import GraphTopics from '$components/global/GraphTopics.svelte';
	import DuneOverlay from '$components/global/DuneOverlay.svelte';
	import SandDunes from '$components/global/SandDunes.svelte';

	let graphLoading = $state(true);

	let sortedTopics = $derived(data.nodes.sort((a, b) => b.size - a.size));
	let topCount = $derived(Math.min(5, sortedTopics.length));
	let midCount = $derived(Math.min(15, sortedTopics.length));

	function topicTier(i: number): 'large' | 'medium' | 'small' {
		if (i < topCount) return 'large';
		if (i < midCount) return 'medium';
		return 'small';
	}
</script>

<!-- Shared wrapper: graph + dunes + title. z-index 2 so dunes (inside)
     render above page content (z-index 1) that follows. -->
<div class="relative w-full" style="z-index: 2;">
	<!-- Graph hero -->
	<GraphTopics nodes={data.nodes} edges={data.edges} bind:loading={graphLoading} />
	<!-- Golden halo overlay — above graph and loading overlay -->
	<DuneOverlay loading={graphLoading} />
	<!-- Sand dunes: absolutely positioned at bottom of graph, overflows downward.
	     z-index 10 puts it above the page content (z-index 5) that follows. -->
	<div class="absolute right-0 left-0" style="bottom: -390px; z-index: 10; pointer-events: none;">
		<SandDunes lightSand="#FFFEF6" lightShadow="#E8C878" darkSand="#23201E" darkShadow="#151210" />
	</div>
</div>

<!-- Hero text section — sits at graph/page boundary, above dunes -->
<div
	class="relative mx-auto max-w-[680px] px-4 pt-2 pb-4 text-center md:pt-4"
	style="z-index: 3; margin-top: -50px;"
>
	<!-- Title with geometric ornaments and 3D shadow -->
	<div class="relative inline-flex items-center justify-center gap-4 md:gap-6">
		<!-- Left geometric ornament -->
		<svg
			class="h-8 w-16 flex-shrink-0 md:h-10 md:w-24"
			viewBox="0 0 96 40"
			fill="none"
			style="color: var(--color-accent);"
		>
			<line
				x1="96"
				y1="20"
				x2="44"
				y2="20"
				stroke="currentColor"
				stroke-width="0.5"
				opacity="0.4"
			/>
			<polygon points="40,20 48,14 48,26" fill="currentColor" opacity="0.25" />
			<circle
				cx="32"
				cy="20"
				r="3"
				stroke="currentColor"
				stroke-width="0.5"
				fill="none"
				opacity="0.3"
			/>
			<rect
				x="16"
				y="16"
				width="8"
				height="8"
				transform="rotate(45 20 20)"
				stroke="currentColor"
				stroke-width="0.5"
				fill="none"
				opacity="0.2"
			/>
			<line x1="8" y1="20" x2="0" y2="20" stroke="currentColor" stroke-width="0.5" opacity="0.15" />
			<circle cx="4" cy="20" r="1" fill="currentColor" opacity="0.15" />
		</svg>

		<div class="relative">
			<!-- 3D shadow layers -stacked offset copies for depth -->
			<h1
				class="pointer-events-none absolute top-[4px] left-[4px] text-[3.2rem] leading-[1.1] tracking-[0.12em] select-none md:top-[5px] md:left-[5px] md:text-[5rem]"
				style="font-family: var(--font-display); color: var(--color-accent); opacity: 0.06; font-weight: 400;"
				aria-hidden="true"
			>
				Garden
			</h1>
			<h1
				class="pointer-events-none absolute top-[3px] left-[3px] text-[3.2rem] leading-[1.1] tracking-[0.12em] select-none md:top-[4px] md:left-[4px] md:text-[5rem]"
				style="font-family: var(--font-display); color: var(--color-accent); opacity: 0.1; font-weight: 400;"
				aria-hidden="true"
			>
				Garden
			</h1>
			<h1
				class="pointer-events-none absolute top-[2px] left-[2px] text-[3.2rem] leading-[1.1] tracking-[0.12em] select-none md:top-[3px] md:left-[3px] md:text-[5rem]"
				style="font-family: var(--font-display); color: var(--color-accent); opacity: 0.15; font-weight: 400;"
				aria-hidden="true"
			>
				Garden
			</h1>
			<h1
				class="pointer-events-none absolute top-[1px] left-[1px] text-[3.2rem] leading-[1.1] tracking-[0.12em] select-none md:top-[2px] md:left-[2px] md:text-[5rem]"
				style="font-family: var(--font-display); color: var(--color-accent); opacity: 0.22; font-weight: 400;"
				aria-hidden="true"
			>
				Garden
			</h1>

			<!-- Main title -->
			<h1
				class="relative text-[3.2rem] leading-[1.1] tracking-[0.12em] md:text-[5rem]"
				style="font-family: var(--font-display); color: var(--color-text); font-weight: 400;"
			>
				Garden
			</h1>

			<!-- Oval drop shadow right beneath title -->
			<div
				class="mx-auto -mt-1"
				style="
					width: 80%;
					height: 8px;
					background: radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 65%);
					opacity: 0.25;
					filter: blur(4px);
				"
			></div>
		</div>

		<!-- Right geometric ornament (mirrored) -->
		<svg
			class="h-8 w-16 flex-shrink-0 md:h-10 md:w-24"
			viewBox="0 0 96 40"
			fill="none"
			style="color: var(--color-accent); transform: scaleX(-1);"
		>
			<line
				x1="96"
				y1="20"
				x2="44"
				y2="20"
				stroke="currentColor"
				stroke-width="0.5"
				opacity="0.4"
			/>
			<polygon points="40,20 48,14 48,26" fill="currentColor" opacity="0.25" />
			<circle
				cx="32"
				cy="20"
				r="3"
				stroke="currentColor"
				stroke-width="0.5"
				fill="none"
				opacity="0.3"
			/>
			<rect
				x="16"
				y="16"
				width="8"
				height="8"
				transform="rotate(45 20 20)"
				stroke="currentColor"
				stroke-width="0.5"
				fill="none"
				opacity="0.2"
			/>
			<line x1="8" y1="20" x2="0" y2="20" stroke="currentColor" stroke-width="0.5" opacity="0.15" />
			<circle cx="4" cy="20" r="1" fill="currentColor" opacity="0.15" />
		</svg>
	</div>
	<p
		class="mx-auto mt-5 max-w-[28em] text-[0.95rem] leading-relaxed md:text-base"
		style="color: var(--color-text-muted);"
	>
		A digital garden of thoughts, notes, and reference guides.
	</p>

	<div class="mx-auto mt-10 flex max-w-[420px] items-center justify-center gap-6 md:gap-10">
		<a
			href="{base}/articles"
			class="group flex flex-col items-center gap-1 transition-all"
			data-sveltekit-preload-code="hover"
		>
			<span class="font-serif text-3xl md:text-4xl" style="color: var(--color-accent);"
				>{data.sections.articles}</span
			>
			<span
				class="text-xs tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-[--color-accent]"
				style="color: var(--color-text-muted);"
			>
				articles
			</span>
		</a>
		<div class="h-10 w-px" style="background-color: var(--color-border);"></div>
		<a
			href="{base}/sheets"
			class="group flex flex-col items-center gap-1 transition-all"
			data-sveltekit-preload-code="hover"
		>
			<span class="font-serif text-3xl md:text-4xl" style="color: var(--color-accent);"
				>{data.sections.sheets}</span
			>
			<span
				class="text-xs tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-[--color-accent]"
				style="color: var(--color-text-muted);"
			>
				sheets
			</span>
		</a>
		<div class="h-10 w-px" style="background-color: var(--color-border);"></div>
		<a
			href="{base}/snippets"
			class="group flex flex-col items-center gap-1 transition-all"
			data-sveltekit-preload-code="hover"
		>
			<span class="font-serif text-3xl md:text-4xl" style="color: var(--color-accent);"
				>{data.sections.snippets}</span
			>
			<span
				class="text-xs tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-[--color-accent]"
				style="color: var(--color-text-muted);"
			>
				snippets
			</span>
		</a>
	</div>
</div>

<!-- Page content: z-index 1, below the graph wrapper (z-index 2) so dunes render above.
     padding-top creates space where dunes are visible above the content background. -->
<div class="relative" style="z-index: 1;">

<!-- Separator -->
<div class="separator mx-auto max-w-[680px] px-4">
	<span class="separator-glyph">◆</span>
</div>

<!-- Latest Writings -->
{#if data.latestArticles?.length}
	<div class="mx-auto max-w-[680px] px-4 pt-6 pb-8">
		<h2
			class="mb-6 font-serif text-[1.75rem] md:text-[2.25rem]"
			style="font-variant: small-caps; letter-spacing: 0.05em; color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;"
		>
			Latest Writings
		</h2>

		<div class="flex flex-col">
			{#each data.latestArticles as article, i (i)}
				<a
					href="{base}/{article.path.replace('.md', '')}"
					class="group block py-4 transition-colors duration-200"
					style="border-bottom: 1px solid var(--color-border);"
					data-sveltekit-preload-code="hover"
				>
					<div class="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
						<span class="shrink-0 font-mono text-[0.75rem]" style="color: var(--color-text-muted);">
							{new Date(article.meta.date).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric'
							})}
						</span>
						<span
							class="font-serif text-[1.25rem] font-bold transition-colors duration-200 group-hover:text-[--color-accent]"
							style="color: var(--color-text);"
						>
							{article.meta.title}
						</span>
					</div>
					{#if article.meta.short}
						<p
							class="mt-1 text-[0.85rem] leading-relaxed md:ml-[calc(8ch+1rem)]"
							style="color: var(--color-text-muted);"
						>
							{article.meta.short}
						</p>
					{/if}
					{#if article.meta.topic}
						<div class="mt-2 flex flex-wrap gap-1.5 md:ml-[calc(8ch+1rem)]">
							{#each article.meta.topic.split(' ').filter(Boolean).slice(0, 4) as topic}
								<span class="pill">{topic}</span>
							{/each}
						</div>
					{/if}
				</a>
			{/each}
		</div>

		<a
			href="{base}/articles"
			class="mt-4 inline-block font-serif text-sm transition-colors duration-200 hover:underline"
			style="color: var(--color-accent);"
			data-sveltekit-preload-code="hover"
		>
			View all articles &rarr;
		</a>
	</div>
{/if}

<!-- Separator -->
<div class="separator mx-auto max-w-[680px] px-4">
	<span class="separator-glyph">◆</span>
</div>

<!-- Topics — tiered pills -->
<div class="mx-auto max-w-[680px] px-4 pt-6 pb-16">
	<h2
		class="mb-6 font-serif text-[1.75rem] md:text-[2.25rem]"
		style="font-variant: small-caps; letter-spacing: 0.05em; color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;"
	>
		Topics
	</h2>

	<div class="flex flex-wrap gap-2">
		{#each sortedTopics as node, i (i)}
			{@const tier = topicTier(i)}
			<a
				href="{base}/search?topics={node.label}"
				class="inline-flex items-center gap-1 rounded-sm border transition-all duration-200 hover:border-[--color-accent] hover:text-[--color-accent]"
				style="
					border-color: var(--color-border);
					color: {tier === 'small' ? 'var(--color-text-muted)' : 'var(--color-text)'};
					font-family: var(--font-mono);
					font-size: {tier === 'large' ? '0.85rem' : tier === 'medium' ? '0.75rem' : '0.65rem'};
					padding: {tier === 'large' ? '4px 10px' : tier === 'medium' ? '3px 8px' : '2px 6px'};
					letter-spacing: 0.03em;
				"
			>
				<span style="opacity: 0.5; font-size: 0.8em;">{node.meta.pages}</span>
				{node.label}
			</a>
		{/each}
	</div>
</div>
</div><!-- end page content wrapper -->

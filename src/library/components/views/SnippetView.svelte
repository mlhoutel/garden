<script lang="ts">
	import type { PageLoadReturn } from '$types/types';
	import { base } from '$app/paths';
	import seedrandom from 'seedrandom';

	let { data }: { data: PageLoadReturn } = $props();

	const rng = seedrandom(`snippet-${data.title}`);
	const stars: { cx: number; cy: number; r: number; opacity: number }[] = [];
	for (let i = 0; i < 40; i++) {
		stars.push({ cx: rng() * 100, cy: rng() * 100, r: 0.02 + rng() * 0.04, opacity: 0.06 + rng() * 0.15 });
	}

	// Detect language from topics or content
	const langMap: Record<string, string> = {
		javascript: 'JS', js: 'JS', typescript: 'TS', python: 'PY',
		rust: 'RS', cpp: 'C++', java: 'JAVA', haskell: 'HS'
	};
	const topics = data.topic?.split(' ').filter(Boolean) || [];
	const detectedLang = topics.find((t) => langMap[t.toLowerCase()]);
	const langBadge = detectedLang ? langMap[detectedLang.toLowerCase()] : 'CODE';
</script>

<!-- Minimal header bar — no big sky, just breadcrumbs on dark strip -->
<div class="w-full" style="background: #1A1A1A; border-bottom: 1px solid rgba(212,160,23,0.08);">
	<div class="mx-auto flex max-w-[800px] items-center justify-between px-4 py-2.5">
		<nav class="text-[0.7rem]" style="color: #9A928A; font-variant: small-caps; letter-spacing: 0.05em;" aria-label="Breadcrumb">
			<ol class="flex flex-wrap items-center gap-1">
				<li><a href="{base}/" class="transition-colors duration-200 hover:text-[#D4A017]">home</a></li>
				<li style="opacity: 0.3;">/</li>
				<li><a href="{base}/{data.section}" class="transition-colors duration-200 hover:text-[#D4A017]">{data.section}</a></li>
				<li style="opacity: 0.3;">/</li>
				<li style="opacity: 0.5;">{data.subsection}</li>
				<li style="opacity: 0.3;">/</li>
				<li class="truncate" style="color: #E8E0D4; max-width: 200px;" aria-current="page">{data.title}</li>
			</ol>
		</nav>

		<!-- Language badge -->
		<span
			class="rounded-sm px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.1em]"
			style="background: rgba(212,160,23,0.15); color: #D4A017; border: 1px solid rgba(212,160,23,0.25);"
		>
			{langBadge}
		</span>
	</div>
</div>

<!-- Title + description -->
<div class="mx-auto max-w-[800px] px-4 pt-6">
	<h1
		class="text-[1.8rem] md:text-[2.4rem]"
		style="font-family: var(--font-display); font-weight: 400; letter-spacing: 0.06em; color: var(--color-text);"
	>
		{data.title}
	</h1>

	{#if data.short}
		<p class="mt-2 text-[0.88rem] leading-relaxed" style="color: var(--color-text-muted);">
			{data.short}
		</p>
	{/if}

	{#if topics.length > 0}
		<div class="mt-3 flex flex-wrap gap-1.5">
			{#each topics as topic}
				<a
					href="{base}/search?topics={topic}"
					class="pill"
					data-sveltekit-preload-code="hover"
				>
					{topic}
				</a>
			{/each}
		</div>
	{/if}

	<!-- Thin gold separator -->
	<div class="my-4 flex items-center gap-3" style="max-width: 120px;">
		<div class="h-px flex-1" style="background: var(--color-accent); opacity: 0.3;"></div>
		<svg viewBox="0 0 6 6" style="width: 4px; height: 4px;"><polygon points="3,0 6,3 3,6 0,3" fill="var(--color-accent)" opacity="0.4" /></svg>
		<div class="h-px flex-1" style="background: var(--color-accent); opacity: 0.3;"></div>
	</div>
</div>

<!-- Code content — the hero -->
<article class="snippet-article">
	<div class="px-4 pb-6 md:px-0">
		{@html data.content}
	</div>
</article>

<!-- Related snippets feed -->
{#if data.related && data.related.length > 0}
	<div class="mx-auto max-w-[800px] px-4 pb-16">
		<div class="separator"><span class="separator-glyph">◆</span></div>

		<h3
			class="mb-4 font-serif text-[1.2rem]"
			style="font-variant: small-caps; letter-spacing: 0.05em; color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 0.3rem;"
		>
			Related Snippets
		</h3>

		<div class="flex flex-col gap-0">
			{#each data.related as page (page.path)}
				<a
					href="{base}/{page.path.replace('.md', '')}"
					class="group flex items-center justify-between py-3 transition-all duration-200"
					style="border-bottom: 1px solid var(--color-border);"
					data-sveltekit-preload-code="hover"
				>
					<div class="min-w-0 flex-1">
						<div class="flex items-center gap-2">
							<span
								class="shrink-0 rounded-sm px-1.5 py-0.5 font-mono text-[0.55rem] tracking-wider"
								style="background: rgba(212,160,23,0.08); color: var(--color-accent); border: 1px solid var(--color-border);"
							>
								{page.meta.subsection}
							</span>
							<span class="truncate font-serif text-[0.95rem] transition-colors duration-200 group-hover:text-[--color-accent]" style="color: var(--color-text);">
								{page.meta.title}
							</span>
						</div>
						{#if page.meta.short}
							<p class="mt-0.5 truncate text-[0.75rem]" style="color: var(--color-text-muted);">{page.meta.short}</p>
						{/if}
					</div>
					<span class="ml-3 font-serif text-[0.8rem] transition-colors duration-200 group-hover:text-[--color-accent]" style="color: var(--color-text-muted);">
						&rarr;
					</span>
				</a>
			{/each}
		</div>

		<!-- Back to all snippets -->
		<a
			href="{base}/snippets"
			class="mt-6 inline-block font-serif text-sm transition-colors duration-200 hover:underline"
			style="color: var(--color-accent);"
			data-sveltekit-preload-code="hover"
		>
			&larr; All snippets
		</a>
	</div>
{/if}

<style>
	.snippet-article {
		max-width: 800px;
		margin: auto;
	}
</style>

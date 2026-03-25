<script lang="ts">
	import type { PageLoadReturn } from '$types/types';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import seedrandom from 'seedrandom';

	let { data }: { data: PageLoadReturn } = $props();

	let tocItems: { id: string; text: string; level: number }[] = $state([]);
	let activeHeading = $state('');

	const rng = seedrandom(`sheet-${data.title}`);
	const stars: { cx: number; cy: number; r: number; opacity: number }[] = [];
	for (let i = 0; i < 60; i++) {
		stars.push({ cx: rng() * 100, cy: rng() * 100, r: 0.02 + rng() * 0.05, opacity: 0.06 + rng() * 0.2 });
	}

	onMount(() => {
		const article = document.querySelector('article');
		if (!article) return;

		const headings = article.querySelectorAll('h2, h3');
		tocItems = Array.from(headings)
			.filter((h) => h.id)
			.map((h) => ({ id: h.id, text: h.textContent?.trim() || '', level: parseInt(h.tagName[1]) }));

		// Scroll spy: highlight current heading in TOC
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeHeading = entry.target.id;
					}
				}
			},
			{ rootMargin: '-60px 0px -70% 0px' }
		);

		headings.forEach((h) => observer.observe(h));
		return () => observer.disconnect();
	});
</script>

<!-- Compact sky header -->
<div class="relative w-full" style="height: 8vh; min-height: 56px; background: #1A1A1A;">
	<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" class="absolute inset-0 h-full w-full">
		{#each stars as s, i (i)}
			<circle cx={s.cx} cy={s.cy} r={s.r} fill="#FFFEF6" opacity={s.opacity} />
		{/each}
	</svg>
	<div class="absolute inset-0 flex items-end px-4 pb-2" style="z-index: 5;">
		<div class="mx-auto w-full max-w-[960px]">
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
		</div>
	</div>
</div>

<!-- Thin separator -->
<div class="mx-auto w-full max-w-[960px]">
	<div class="h-px" style="background: var(--color-border);"></div>
</div>

<!-- Main layout: sidebar TOC + article content -->
<div class="mx-auto flex max-w-[960px] gap-0 px-4 pt-4 pb-16 lg:gap-8">
	<!-- Sidebar TOC (desktop only) -->
	{#if tocItems.length > 1}
		<aside class="hidden w-[200px] shrink-0 lg:block">
			<nav class="sticky top-[50px]" aria-label="Table of contents">
				<h4 class="mb-3 font-mono text-[0.6rem] tracking-[0.12em] uppercase" style="color: var(--color-text-muted);">
					On this page
				</h4>
				<ul class="list-none space-y-0.5" style="border-left: 1px solid var(--color-border);">
					{#each tocItems as item (item.id)}
						<li style="padding-left: {4 + (item.level - 2) * 10}px;">
							<a
								href="#{item.id}"
								class="block py-0.5 text-[0.72rem] leading-snug transition-colors duration-150"
								style="color: {activeHeading === item.id ? 'var(--color-accent)' : 'var(--color-text-muted)'}; border-left: 2px solid {activeHeading === item.id ? 'var(--color-accent)' : 'transparent'}; padding-left: 8px; margin-left: -1px;"
							>
								{item.text}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}

	<!-- Article content -->
	<article class="sheet-article min-w-0 flex-1">
		<h1 class="!pt-4 !text-[2rem] !md:text-[2.8rem]">{data.title}</h1>

		{#if data.topic}
			<div class="mt-2 flex flex-wrap gap-1.5 px-4 md:px-0">
				{#each data.topic.split(' ').filter(Boolean) as topic}
					<span class="pill">{topic}</span>
				{/each}
			</div>
		{/if}

		<!-- Mobile TOC (collapsible) -->
		{#if tocItems.length > 1}
			<details class="mb-4 mt-4 rounded px-4 md:px-0 lg:hidden" style="border: 1px solid var(--color-border);">
				<summary class="cursor-pointer px-3 py-2 font-serif text-[0.85rem] select-none" style="font-variant: small-caps; color: var(--color-text);">
					Table of Contents ({tocItems.length})
				</summary>
				<nav class="px-3 pb-3" aria-label="Table of contents">
					<ul class="list-none space-y-0.5" style="border-left: 1px solid var(--color-border); margin-left: 4px;">
						{#each tocItems as item (item.id)}
							<li style="padding-left: {8 + (item.level - 2) * 12}px">
								<a href="#{item.id}" class="text-[0.75rem] transition-colors duration-200 hover:text-[--color-accent]" style="color: var(--color-text-muted);">
									{item.text}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</details>
		{/if}

		<div class="py-4 px-4 md:px-0">
			{@html data.content}
		</div>

		<!-- Related sheets -->
		{#if data.related && data.related.length > 0}
			<div class="separator mt-8 px-4 md:px-0"><span class="separator-glyph">◆</span></div>
			<div class="px-4 pt-4 pb-8 md:px-0">
				<h3 class="mb-3 font-serif text-[1.1rem]" style="font-variant: small-caps; letter-spacing: 0.05em; color: var(--color-text);">
					Related in {data.subsection}
				</h3>
				<div class="flex flex-col gap-0">
					{#each data.related as page (page.path)}
						<a
							href="{base}/{page.path.replace('.md', '')}"
							class="group block py-2.5 transition-colors duration-200"
							style="border-bottom: 1px solid var(--color-border);"
							data-sveltekit-preload-code="hover"
						>
							<span class="font-serif text-[0.95rem] transition-colors duration-200 group-hover:text-[--color-accent]" style="color: var(--color-text);">
								{page.meta.title}
							</span>
							{#if page.meta.short}
								<p class="mt-0.5 text-[0.78rem]" style="color: var(--color-text-muted);">{page.meta.short}</p>
							{/if}
						</a>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Back nav -->
		<div class="flex items-center gap-4 px-4 pt-3 pb-8 md:px-0">
			<a href="{base}/{data.section}" class="font-serif text-sm transition-colors duration-200 hover:text-[--color-accent]" style="color: var(--color-text-muted);" data-sveltekit-preload-code="hover">
				&larr; All {data.section}
			</a>
		</div>
	</article>
</div>

<style>
	/* Override article defaults for sheet layout */
	.sheet-article {
		max-width: 100%;
	}
</style>

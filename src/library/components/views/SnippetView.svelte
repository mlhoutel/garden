<script lang="ts">
	import type { PageLoadReturn } from '$types/types';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	let { data }: { data: PageLoadReturn } = $props();

	// Detect language from topics
	const langMap: Record<string, string> = {
		javascript: 'JS', js: 'JS', typescript: 'TS', python: 'PY',
		rust: 'RS', cpp: 'C++', java: 'JAVA', haskell: 'HS'
	};

	function getLangBadge(topicStr?: string, sub?: string): string {
		const topics = topicStr?.split(' ').filter(Boolean) || [];
		const detected = topics.find((t) => langMap[t.toLowerCase()]);
		if (detected) return langMap[detected.toLowerCase()];
		if (sub) {
			const mapped = langMap[sub.toLowerCase()];
			if (mapped) return mapped;
			return sub.slice(0, 4).toUpperCase();
		}
		return 'CODE';
	}

	const topics = data.topic?.split(' ').filter(Boolean) || [];
	const langBadge = getLangBadge(data.topic, data.subsection);

	// Infinite scroll: progressively reveal related snippets
	let visibleCount = $state(3);
	let sentinel: HTMLDivElement | undefined = $state();

	const feedItems = data.relatedRendered || [];

	$effect(() => {
		if (!sentinel) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && visibleCount < feedItems.length) {
					visibleCount += 2;
				}
			},
			{ rootMargin: '400px' }
		);
		observer.observe(sentinel);
		return () => observer.disconnect();
	});
</script>

<!-- Minimal header bar -->
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

		<span
			class="rounded-sm px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.1em]"
			style="background: rgba(212,160,23,0.15); color: #D4A017; border: 1px solid rgba(212,160,23,0.25);"
		>
			{langBadge}
		</span>
	</div>
</div>

<!-- Main snippet (the one the user navigated to) -->
<div class="snippet-card">
	<div class="snippet-header">
		<h1 class="snippet-title">{data.title}</h1>
		{#if data.short}
			<p class="snippet-desc">{data.short}</p>
		{/if}
		{#if topics.length > 0}
			<div class="mt-2 flex flex-wrap gap-1.5">
				{#each topics as topic}
					<a href="{base}/search?topics={topic}" class="pill" data-sveltekit-preload-code="hover">{topic}</a>
				{/each}
			</div>
		{/if}
	</div>

	<article class="snippet-article">
		<div class="px-4 pb-4 md:px-0">
			{@html data.content}
		</div>
	</article>
</div>

<!-- Infinite feed of related snippets -->
{#if feedItems.length > 0}
	{#each feedItems.slice(0, visibleCount) as item, i (item.path)}
		<div class="snippet-card">
			<div class="snippet-divider">
				<div class="divider-line"></div>
				<span class="divider-dot"></span>
				<div class="divider-line"></div>
			</div>

			<div class="snippet-header">
				<div class="flex items-center gap-2">
					<span class="snippet-badge">{item.meta.subsection}</span>
					<span class="snippet-lang">{getLangBadge(item.meta.topic, item.meta.subsection)}</span>
				</div>
				<button
					class="snippet-title-link"
					onclick={() => goto(`${base}/${item.path.replace('.md', '')}`)}
				>
					{item.meta.title}
				</button>
				{#if item.meta.short}
					<p class="snippet-desc">{item.meta.short}</p>
				{/if}
				{#if item.meta.topic}
					<div class="mt-1.5 flex flex-wrap gap-1">
						{#each item.meta.topic.split(' ').filter(Boolean).slice(0, 4) as t}
							<a href="{base}/search?topics={t}" class="pill" data-sveltekit-preload-code="hover">{t}</a>
						{/each}
					</div>
				{/if}
			</div>

			<article class="snippet-article">
				<div class="px-4 pb-4 md:px-0">
					{@html item.content}
				</div>
			</article>
		</div>
	{/each}

	<!-- Sentinel for infinite scroll -->
	{#if visibleCount < feedItems.length}
		<div bind:this={sentinel} class="flex justify-center py-8">
			<div class="loading-dots">
				<span></span><span></span><span></span>
			</div>
		</div>
	{:else}
		<div class="mx-auto max-w-[800px] px-4 pb-12 pt-6 text-center">
			<a
				href="{base}/snippets"
				class="font-serif text-sm transition-colors duration-200 hover:underline"
				style="color: var(--color-accent);"
				data-sveltekit-preload-code="hover"
			>
				&larr; All snippets
			</a>
		</div>
	{/if}
{/if}

<style>
	.snippet-card {
		max-width: 800px;
		margin: 0 auto;
	}

	.snippet-article {
		max-width: 800px;
		margin: auto;
	}

	.snippet-header {
		padding: 1.2rem 1rem 0.6rem;
	}

	.snippet-title {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 1.8rem;
		letter-spacing: 0.06em;
		color: var(--color-text);
	}

	@media (min-width: 768px) {
		.snippet-title {
			font-size: 2.4rem;
		}
		.snippet-header {
			padding-left: 0;
			padding-right: 0;
		}
	}

	.snippet-title-link {
		display: block;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 1.3rem;
		letter-spacing: 0.04em;
		color: var(--color-text);
		cursor: pointer;
		background: none;
		border: none;
		padding: 0;
		text-align: left;
		transition: color 0.2s;
	}

	.snippet-title-link:hover {
		color: var(--color-accent);
	}

	.snippet-desc {
		margin-top: 0.3rem;
		font-size: 0.85rem;
		line-height: 1.5;
		color: var(--color-text-muted);
	}

	.snippet-badge {
		font-family: monospace;
		font-size: 0.55rem;
		letter-spacing: 0.08em;
		padding: 0.15rem 0.4rem;
		border-radius: 2px;
		background: rgba(212,160,23,0.08);
		color: var(--color-accent);
		border: 1px solid var(--color-border);
	}

	.snippet-lang {
		font-family: monospace;
		font-size: 0.5rem;
		letter-spacing: 0.1em;
		padding: 0.1rem 0.35rem;
		border-radius: 2px;
		background: rgba(212,160,23,0.12);
		color: var(--color-accent);
	}

	.snippet-divider {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 1.5rem 1rem 0;
		max-width: 120px;
	}

	@media (min-width: 768px) {
		.snippet-divider {
			padding-left: 0;
			padding-right: 0;
		}
	}

	.divider-line {
		flex: 1;
		height: 1px;
		background: var(--color-accent);
		opacity: 0.25;
	}

	.divider-dot {
		width: 4px;
		height: 4px;
		background: var(--color-accent);
		opacity: 0.35;
		clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
	}

	.loading-dots {
		display: flex;
		gap: 0.4rem;
	}

	.loading-dots span {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--color-accent);
		opacity: 0.3;
		animation: dotPulse 1.2s ease-in-out infinite;
	}

	.loading-dots span:nth-child(2) { animation-delay: 0.15s; }
	.loading-dots span:nth-child(3) { animation-delay: 0.3s; }

	@keyframes dotPulse {
		0%, 80%, 100% { opacity: 0.15; transform: scale(0.8); }
		40% { opacity: 0.5; transform: scale(1); }
	}
</style>

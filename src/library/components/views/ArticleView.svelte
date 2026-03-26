<script lang="ts">
	import type { PageLoadReturn } from '$types/types';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import seedrandom from 'seedrandom';
	import IFrame from '$components/global/IFrame.svelte';
	import AuthorBadge from '$components/global/AuthorBadge.svelte';

	let { data }: { data: PageLoadReturn } = $props();

	let readingProgress = $state(0);
	let tocItems: { id: string; text: string; level: number }[] = $state([]);
	let tocOpen = $state(false);

	const rng = seedrandom(`article-${data.title}`);
	const stars: { cx: number; cy: number; r: number; opacity: number }[] = [];
	for (let i = 0; i < 100; i++) {
		stars.push({ cx: rng() * 100, cy: rng() * 100, r: 0.02 + rng() * 0.06, opacity: 0.06 + rng() * 0.3 });
	}

	onMount(() => {
		function updateProgress() {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			readingProgress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
		}
		window.addEventListener('scroll', updateProgress, { passive: true });

		const stickyCleanups: (() => void)[] = [];
		const article = document.querySelector('article');
		if (article) {
			const headings = article.querySelectorAll('h2, h3');
			tocItems = Array.from(headings)
				.filter((h) => h.id)
				.map((h) => ({ id: h.id, text: h.textContent?.trim() || '', level: parseInt(h.tagName[1]) }));

			// Sticky iframe logic
			const stickyWrappers = article.querySelectorAll('.embed-sticky-wrapper');
			stickyWrappers.forEach((wrapper) => {
				const w = wrapper as HTMLElement;
				const embed = w.querySelector('.embed-fullwidth') as HTMLElement | null;
				if (!embed) return;

				const TRAVEL = Math.round(window.innerHeight * 1.5);
				const header = document.querySelector('nav');
				const HEADER_H = header ? header.offsetHeight : 50;
				const embedH = embed.offsetHeight;
				w.style.minHeight = (embedH + TRAVEL) + 'px';

				let state: 'normal' | 'fixed' | 'bottom' = 'normal';
				let minimized = false;

				function updateSticky() {
					if (minimized) return;
					const wRect = w.getBoundingClientRect();
					const triggerTop = HEADER_H;
					const shouldFix = wRect.top <= triggerTop && wRect.bottom > embedH + triggerTop;
					const pastEnd = wRect.bottom <= embedH + triggerTop;

					if (shouldFix && state !== 'fixed') {
						state = 'fixed';
						const vw = document.documentElement.clientWidth;
						embed.style.position = 'fixed';
						embed.style.top = HEADER_H + 'px';
						embed.style.bottom = '';
						embed.style.left = '0';
						embed.style.width = vw + 'px';
						embed.style.maxWidth = 'none';
						embed.style.transform = 'none';
						embed.style.zIndex = '20';
						embed.classList.add('embed-in-view');
					} else if (shouldFix && state === 'fixed') {
						const vw = document.documentElement.clientWidth;
						embed.style.left = '0';
						embed.style.width = vw + 'px';
						embed.style.maxWidth = 'none';
					} else if (pastEnd && state !== 'bottom') {
						state = 'bottom';
						embed.style.position = 'absolute';
						embed.style.top = '';
						embed.style.bottom = '0';
						embed.style.left = '0';
						embed.style.width = '100%';
						embed.style.maxWidth = '100%';
						embed.style.transform = '';
						embed.style.zIndex = '';
						embed.classList.remove('embed-in-view');
					} else if (!shouldFix && !pastEnd && state !== 'normal') {
						state = 'normal';
						embed.style.position = '';
						embed.style.top = '';
						embed.style.bottom = '';
						embed.style.left = '';
						embed.style.width = '';
						embed.style.maxWidth = '';
						embed.style.transform = '';
						embed.style.zIndex = '';
						embed.classList.remove('embed-in-view');
					}
				}

				window.addEventListener('scroll', updateSticky, { passive: true });
				window.addEventListener('resize', () => {
					if (minimized) return;
					embed.style.position = '';
					embed.style.top = '';
					embed.style.bottom = '';
					embed.style.left = '';
					embed.style.width = '';
					embed.style.maxWidth = '';
					embed.style.transform = '';
					embed.classList.remove('embed-in-view');
					state = 'normal';
					const newTravel = Math.round(window.innerHeight * 1.5);
					w.style.minHeight = (embed.offsetHeight + newTravel) + 'px';
					updateSticky();
				});
				updateSticky();

				const minimizeBtn = embed.querySelector('.embed-minimize-btn');
				if (minimizeBtn) {
					minimizeBtn.addEventListener('click', () => {
						minimized = !minimized;
						if (minimized) {
							embed.style.position = '';
							embed.style.top = '';
							embed.style.bottom = '';
							embed.style.left = '';
							embed.style.width = '';
							embed.style.maxWidth = '';
							embed.style.transform = '';
							embed.style.zIndex = '';
							embed.classList.remove('embed-in-view');
							state = 'normal';
							embed.classList.add('embed-minimized');
							w.style.minHeight = '0';
							w.style.paddingBottom = '0';
							minimizeBtn.textContent = '\u25A1';
							minimizeBtn.setAttribute('title', 'Restore');
							minimizeBtn.setAttribute('aria-label', 'Restore');
						} else {
							embed.classList.remove('embed-minimized');
							const newTravel = Math.round(window.innerHeight * 1.5);
							w.style.minHeight = (embed.offsetHeight + newTravel) + 'px';
							w.style.paddingBottom = '';
							minimizeBtn.textContent = '\u2500';
							minimizeBtn.setAttribute('title', 'Minimize');
							minimizeBtn.setAttribute('aria-label', 'Minimize');
							updateSticky();
						}
					});
				}

				stickyCleanups.push(() => window.removeEventListener('scroll', updateSticky));
			});
		}

		return () => {
			window.removeEventListener('scroll', updateProgress);
			stickyCleanups.forEach((fn) => fn());
		};
	});
</script>

<!-- Reading progress -->
<div
	class="fixed top-0 left-0 z-50 transition-[width] duration-100"
	style="width: {readingProgress}%; height: 2px; background-color: var(--color-accent); border-radius: 0 1px 1px 0;"
	role="progressbar"
	aria-valuenow={Math.round(readingProgress)}
	aria-valuemin={0}
	aria-valuemax={100}
	aria-label="Reading progress"
></div>

<!-- Iframe at absolute top if present -->
{#if data.iframe}
	<div style="height: 100vh; width: 100%; border: none">
		<IFrame src={data.iframe} title="iframe" />
	</div>
{/if}

<!-- Dark sky header with breadcrumbs -->
<div class="relative w-full" style="height: 12vh; min-height: 80px; background: #1A1A1A;">
	<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" class="absolute inset-0 h-full w-full">
		{#each stars as s, i (i)}
			<circle cx={s.cx} cy={s.cy} r={s.r} fill="#FFFEF6" opacity={s.opacity} />
		{/each}
		<circle cx="50" cy="50" r="15" fill="none" stroke="#D4A017" stroke-width="0.03" opacity="0.04" stroke-dasharray="0.5 1.5" />
	</svg>
	<div class="absolute inset-0 flex items-end px-4 pb-3" style="z-index: 5;">
		<div class="mx-auto w-full max-w-[680px]">
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

<!-- Golden separator -->
<div class="relative" style="z-index: 15;">
	<svg viewBox="0 0 800 12" class="mx-auto w-full" style="max-width: 800px; height: 12px; margin-top: -6px;">
		<line x1="0" y1="6" x2="340" y2="6" stroke="#D4A017" stroke-width="0.4" opacity="0.1" />
		<polygon points="350,6 354,3.5 358,6 354,8.5" fill="#D4A017" opacity="0.2" />
		<line x1="368" y1="6" x2="432" y2="6" stroke="#D4A017" stroke-width="0.5" opacity="0.15" />
		<polygon points="442,6 446,3.5 450,6 446,8.5" fill="#D4A017" opacity="0.2" />
		<line x1="460" y1="6" x2="800" y2="6" stroke="#D4A017" stroke-width="0.4" opacity="0.1" />
	</svg>
</div>

<article>
	<h1>{data.title}</h1>

	<!-- Meta -->
	<div class="mt-4 flex flex-col gap-2 px-4 md:flex-row md:items-center md:justify-between md:px-0">
		<div class="flex items-center gap-3">
			<AuthorBadge />
			<span style="opacity: 0.2; color: var(--color-text-muted);">·</span>
			<span style="color: var(--color-text-muted); font-size: 0.8rem;">
				{new Date(data.date || '').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
			</span>
		</div>
		<div style="opacity: 0.5; font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-text-muted);">
			{data.words?.toLocaleString()} words · {Math.ceil((data.time || 0) / 60000)} min read
		</div>
	</div>

	<!-- Diamond separator -->
	<div class="mx-auto my-4 flex items-center gap-3 px-4 md:px-0" style="max-width: 200px;">
		<div class="h-px flex-1" style="background: var(--color-border);"></div>
		<svg viewBox="0 0 8 8" style="width: 5px; height: 5px;"><polygon points="4,0 8,4 4,8 0,4" fill="var(--color-accent)" opacity="0.3" /></svg>
		<div class="h-px flex-1" style="background: var(--color-border);"></div>
	</div>

	<!-- Table of Contents -->
	{#if tocItems.length > 2}
		<div class="mb-6 px-4 md:px-0">
			<button
				class="group flex w-full cursor-pointer items-center gap-3 rounded py-2.5 px-3 text-left transition-all duration-200 select-none"
				onclick={() => tocOpen = !tocOpen}
				style="background: var(--color-surface); border: 1px solid var(--color-border); border-left: 3px solid var(--color-accent);"
			>
				<svg viewBox="0 0 16 16" style="width: 14px; height: 14px; color: var(--color-accent); transition: transform 0.2s; transform: rotate({tocOpen ? 90 : 0}deg);">
					<path d="M5 3 L11 8 L5 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
				<span class="font-serif text-[0.88rem]" style="font-variant: small-caps; letter-spacing: 0.05em; color: var(--color-text);">Table of Contents</span>
				<span class="font-mono text-[0.6rem]" style="color: var(--color-text-muted); opacity: 0.5;">{tocItems.length} sections</span>
			</button>
			{#if tocOpen}
				<nav class="mt-1 rounded-b px-3 pt-1 pb-3" style="background: var(--color-surface); border: 1px solid var(--color-border); border-top: none;" aria-label="Table of contents">
					<ul class="list-none space-y-0.5" style="border-left: 1px solid var(--color-border); margin-left: 4px;">
						{#each tocItems as item (item.id)}
							<li style="padding-left: {8 + (item.level - 2) * 14}px">
								<a href="#{item.id}" class="text-[0.78rem] transition-colors duration-200 hover:text-[--color-accent]" style="color: var(--color-text-muted);">
									{item.text}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			{/if}
		</div>
	{/if}

	<div class="py-4 px-4 md:px-0">
		{@html data.content}
	</div>

	<!-- Bottom separator -->
	<div class="px-4 md:px-0">
		<svg viewBox="0 0 680 12" class="mx-auto w-full" style="max-width: 680px; height: 12px;">
			<line x1="0" y1="6" x2="300" y2="6" stroke="var(--color-border)" stroke-width="0.5" />
			<polygon points="340,6 344,3.5 348,6 344,8.5" fill="var(--color-accent)" opacity="0.2" />
			<line x1="380" y1="6" x2="680" y2="6" stroke="var(--color-border)" stroke-width="0.5" />
		</svg>
	</div>

	<!-- Bottom navigation -->
	<div class="flex w-full items-center gap-4 px-4 pt-3 pb-8 md:px-0">
		<a href="{base}/{data.section}" class="flex-1 py-2 text-left font-serif text-sm transition-colors duration-200 hover:text-[--color-accent]" style="color: var(--color-text-muted);" data-sveltekit-preload-code="hover">
			&larr; All {data.section}
		</a>
		{#if data.next}
			<a href="{base}/{data.next.path.replace('.md', '')}" class="flex-1 truncate py-2 text-right font-serif text-sm transition-colors duration-200 hover:text-[--color-accent]" style="color: var(--color-text-muted);" data-sveltekit-preload-code="hover">
				{data.next.meta.title} &rarr;
			</a>
		{/if}
	</div>
</article>

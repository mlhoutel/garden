<script lang="ts">
	import { base } from '$app/paths';
	import { onMount, onDestroy } from 'svelte';
	import seedrandom from 'seedrandom';
	import SandDunes from '$components/global/SandDunes.svelte';
	import type { Page } from '$types/types';

	let { data }: { data: { content: Page[]; topics: { name: string; count: number }[] } } = $props();

	let searchTerm = $state('');
	let selectedTopics = $state<Set<string>>(new Set());
	let results = $state<Page[]>([]);
	let initialized = $state(false);
	let debounceTimer: ReturnType<typeof setTimeout>;

	const recRng = seedrandom('search-rec');
	let recommendations = $derived(
		[...data.content]
			.filter((p) => p.meta.section === 'articles')
			.sort(() => recRng() - 0.5)
			.slice(0, 5)
	);

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		// Restore from URL first, then sessionStorage as fallback
		searchTerm = params.get('q') || sessionStorage.getItem('garden-search-q') || '';
		const t = params.get('topics') || sessionStorage.getItem('garden-search-topics') || '';
		if (t) selectedTopics = new Set(t.split(',').filter(Boolean));
		initialized = true;
		doSearch();
		updateUrl();
	});

	function doSearch() {
		let filtered = data.content;
		if (selectedTopics.size > 0) {
			filtered = filtered.filter((p) => {
				const pageTops = p.meta.topic ? p.meta.topic.split(' ') : [];
				return [...selectedTopics].every((t) => pageTops.includes(t));
			});
		}
		if (searchTerm.trim()) {
			const term = searchTerm.toLowerCase().trim();
			filtered = filtered.filter(
				(p) =>
					p.meta.title?.toLowerCase().includes(term) ||
					p.meta.short?.toLowerCase().includes(term) ||
					p.meta.topic?.toLowerCase().includes(term)
			);
		}
		results = filtered.sort(
			(a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
		);
	}

	function handleSearch() {
		doSearch();
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(updateUrl, 300);
	}
	function toggleTopic(topic: string) {
		const next = new Set(selectedTopics);
		if (next.has(topic)) next.delete(topic);
		else next.add(topic);
		selectedTopics = next;
		doSearch();
		updateUrl();
	}
	function clearFilters() {
		selectedTopics = new Set();
		searchTerm = '';
		sessionStorage.removeItem('garden-search-q');
		sessionStorage.removeItem('garden-search-topics');
		doSearch();
		updateUrl();
	}
	function updateUrl() {
		const params = new URLSearchParams();
		if (searchTerm) params.set('q', searchTerm);
		if (selectedTopics.size > 0) params.set('topics', [...selectedTopics].join(','));
		const qs = params.toString();
		history.replaceState({}, '', `${base}/search${qs ? '?' + qs : ''}`);
		// Persist to sessionStorage as reload fallback
		if (searchTerm) sessionStorage.setItem('garden-search-q', searchTerm);
		else sessionStorage.removeItem('garden-search-q');
		if (selectedTopics.size > 0) sessionStorage.setItem('garden-search-topics', [...selectedTopics].join(','));
		else sessionStorage.removeItem('garden-search-topics');
	}

	// ─── Light-speed canvas effect ───
	let skyCanvas: HTMLCanvasElement;
	let skyContainer: HTMLDivElement;
	let animFrame: number;
	let lightActive = false;

	interface LightTrail {
		angle: number;
		speed: number;
		dist: number;
		maxDist: number;
		width: number;
		length: number;
		opacity: number;
		color: string;
	}

	const TRAIL_COLORS = ['#FFFEF6', '#FFFEF6', '#F5E6B8', '#E8D5A3', '#C8D8E8', '#D4A017'];
	const trails: LightTrail[] = [];
	const MAX_TRAILS = 120;

	function spawnTrail() {
		const angle = Math.random() * Math.PI * 2;
		trails.push({
			angle,
			speed: 0.8 + Math.random() * 4,
			dist: 1 + Math.random() * 8,
			maxDist: 80 + Math.random() * 70,
			width: 0.2 + Math.random() * 0.8,
			length: 3 + Math.random() * 18,
			opacity: 0.02 + Math.random() * 0.12,
			color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)]
		});
	}

	function drawSky() {
		if (!skyCanvas || !skyContainer) return;
		const w = skyContainer.clientWidth;
		const h = skyContainer.clientHeight;
		if (skyCanvas.width !== w) skyCanvas.width = w;
		if (skyCanvas.height !== h) skyCanvas.height = h;

		const ctx = skyCanvas.getContext('2d');
		if (!ctx) return;

		const cx = w / 2,
			cy = h / 2;
		const scale = Math.min(w, h) / 100;

		ctx.clearRect(0, 0, w, h);

		// Background stars (static, tiny)
		const starRng = seedrandom('search-stars');
		for (let i = 0; i < 250; i++) {
			const sx = starRng() * w,
				sy = starRng() * h;
			const sr = 0.3 + starRng() * 0.8;
			ctx.fillStyle = `rgba(255, 254, 246, ${0.06 + starRng() * 0.25})`;
			ctx.beginPath();
			ctx.arc(sx, sy, sr, 0, Math.PI * 2);
			ctx.fill();
		}

		// Concentric viewport circles -large, filling the viewport
		const maxRing = Math.max(w, h) * 0.5;
		const rings = [0.85, 0.65, 0.48, 0.33, 0.2, 0.1];
		for (const f of rings) {
			const r = maxRing * f;
			ctx.strokeStyle = `rgba(212, 160, 23, ${0.015 + (1 - f) * 0.015})`;
			ctx.lineWidth = 0.5;
			if (f > 0.6) {
				ctx.setLineDash([3, 8]);
			} else {
				ctx.setLineDash([]);
			}
			ctx.beginPath();
			ctx.arc(cx, cy, r, 0, Math.PI * 2);
			ctx.stroke();
		}
		ctx.setLineDash([]);

		// Crosshair at center
		const chSize = 8 * scale;
		ctx.strokeStyle = 'rgba(212, 160, 23, 0.06)';
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		ctx.moveTo(cx - chSize, cy);
		ctx.lineTo(cx - chSize * 0.3, cy);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(cx + chSize * 0.3, cy);
		ctx.lineTo(cx + chSize, cy);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(cx, cy - chSize);
		ctx.lineTo(cx, cy - chSize * 0.3);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(cx, cy + chSize * 0.3);
		ctx.lineTo(cx, cy + chSize);
		ctx.stroke();

		// Radial tick marks -extend further
		for (let i = 0; i < 24; i++) {
			const a = (i / 24) * Math.PI * 2;
			const r1 = maxRing * 0.32,
				r2 = maxRing * 0.36;
			ctx.strokeStyle = 'rgba(212, 160, 23, 0.04)';
			ctx.lineWidth = 0.3;
			ctx.beginPath();
			ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
			ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
			ctx.stroke();
		}

		// Spawn new trails
		if (Math.random() < 0.4) spawnTrail();
		if (Math.random() < 0.15) spawnTrail();

		// Draw and update light trails
		for (let i = trails.length - 1; i >= 0; i--) {
			const t = trails[i];
			const x1 = cx + Math.cos(t.angle) * t.dist * scale;
			const y1 = cy + Math.sin(t.angle) * t.dist * scale;
			const x2 = cx + Math.cos(t.angle) * (t.dist + t.length) * scale;
			const y2 = cy + Math.sin(t.angle) * (t.dist + t.length) * scale;

			// Fade in near center, full mid, fade out at edges
			const normDist = t.dist / t.maxDist;
			const alpha = t.opacity * Math.sin(normDist * Math.PI);

			ctx.strokeStyle = t.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', '');
			// Use hex color directly with globalAlpha
			ctx.globalAlpha = alpha;
			ctx.strokeStyle = t.color;
			ctx.lineWidth = t.width;
			ctx.lineCap = 'round';
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
			ctx.globalAlpha = 1;

			t.dist += t.speed;
			// Length grows as trail moves outward -accelerates
			t.length += t.speed * 0.6;

			if (t.dist > t.maxDist) trails.splice(i, 1);
		}

		// Cap trail count
		while (trails.length > MAX_TRAILS) trails.shift();

		if (lightActive) animFrame = requestAnimationFrame(drawSky);
	}

	onMount(() => {
		lightActive = true;
		drawSky();
	});
	onDestroy(() => {
		lightActive = false;
		if (typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(animFrame);
	});
</script>

<svelte:head>
	<title>Search - Garden</title>
</svelte:head>

<!-- Full-bleed dark sky with light-speed effect -->
<div
	bind:this={skyContainer}
	class="relative w-full"
	style="height: 45vh; min-height: 280px; background: #1A1A1A;"
>
	<canvas bind:this={skyCanvas} class="absolute inset-0 h-full w-full"></canvas>

	<!-- Search bar -positioned in upper portion -->
	<div class="absolute inset-x-0 top-[18%] flex justify-center px-4" style="z-index: 5;">
		<div class="w-full max-w-[560px]">
			<h1
				class="mb-4 text-center font-serif text-xl md:text-2xl"
				style="color: #FFFEF6; font-variant: small-caps; letter-spacing: 0.1em; font-weight: 400;"
			>
				Search the Garden
			</h1>
			<div
				class="flex items-center gap-3 rounded px-4 py-2.5"
				style="background: rgba(255,254,246,0.03); border: 1px solid rgba(212,160,23,0.12); backdrop-filter: blur(8px);"
			>
				<svg
					width="15"
					height="15"
					viewBox="0 0 18 18"
					fill="none"
					style="color: #D4A017; flex-shrink: 0;"
				>
					<path
						d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"
						fill="currentColor"
					/>
				</svg>
				<input
					bind:value={searchTerm}
					oninput={handleSearch}
					type="text"
					placeholder="Search articles, sheets, snippets..."
					class="flex-1 border-none bg-transparent text-sm outline-none md:text-base"
					style="color: #E8E0D4; font-family: var(--font-body);"
				/>
				{#if searchTerm || selectedTopics.size > 0}
					<button
						onclick={clearFilters}
						class="cursor-pointer font-mono text-xs transition-colors duration-200 hover:text-[#D4A017]"
						style="color: #6B6460; background: none; border: none;">clear</button
					>
				{/if}
			</div>
		</div>
	</div>

	<!-- Dunes at bottom, overflow onto page -->
	<div class="absolute right-0 bottom-0 left-0" style="z-index: 10; pointer-events: none;">
		<SandDunes lightSand="#FFFEF6" lightShadow="#E8C878" darkSand="#23201E" darkShadow="#151210" />
	</div>
</div>

<!-- Split layout: results (2/3 left) + topic sidebar (1/3 right) -starts higher, overlapping dunes -->
<div
	class="relative mx-auto flex max-w-[960px] flex-col gap-6 px-4 pb-16 md:flex-row"
	style="z-index: 15; margin-top: -8vh;"
>
	<!-- Results column (main, wider) -->
	<div class="min-w-0 flex-1">
		<!-- Results count -->
		<div
			class="mb-4 rounded-sm px-3 py-1.5 font-mono text-[0.7rem]"
			style="background: var(--color-surface); color: var(--color-text-muted);"
		>
			{results.length} result{results.length !== 1 ? 's' : ''} found
			{#if selectedTopics.size > 0}
				<span>for {[...selectedTopics].map((t) => `#${t}`).join(', ')}</span>
			{/if}
			{#if searchTerm}
				<span>matching "{searchTerm}"</span>
			{/if}
		</div>

		<div class="flex flex-col">
			{#each results as article (article.path)}
				<a
					href="{base}/{article.path.replace('.md', '')}"
					class="group block py-3.5"
					style="border-bottom: 1px solid var(--color-border);"
					data-sveltekit-preload-code="hover"
				>
					<div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
						<span class="shrink-0 font-mono text-[0.65rem]" style="color: var(--color-text-muted);">
							{new Date(article.meta.date).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric'
							})}
						</span>
						<span
							class="font-serif text-[1rem] transition-colors duration-200 group-hover:text-[--color-accent]"
							style="color: var(--color-text);"
						>
							{article.meta.title}
						</span>
						<span
							class="hidden font-mono text-[0.55rem] sm:inline"
							style="color: var(--color-text-muted); opacity: 0.4;"
						>
							{article.meta.section}
						</span>
					</div>
					{#if article.meta.short}
						<p class="mt-0.5 text-[0.8rem] leading-relaxed" style="color: var(--color-text-muted);">
							{article.meta.short}
						</p>
					{/if}
				</a>
			{/each}

			{#if results.length === 0 && initialized}
				<div class="py-12 text-center">
					<p class="font-serif text-base" style="color: var(--color-text-muted);">
						No results found
					</p>
					<p class="mt-1 text-sm" style="color: var(--color-text-muted); opacity: 0.5;">
						Try different keywords or clear the filters
					</p>
				</div>
			{/if}
		</div>

		<!-- Recommendations when idle -->
		{#if !searchTerm && selectedTopics.size === 0 && recommendations.length > 0}
			<div class="separator mt-8"><span class="separator-glyph">◆</span></div>
			<div class="pt-3">
				<h3
					class="mb-4 font-serif text-[1.2rem]"
					style="font-variant: small-caps; letter-spacing: 0.05em; color: var(--color-text); border-bottom: 1px solid var(--color-border); padding-bottom: 0.3rem;"
				>
					You might enjoy
				</h3>
				{#each recommendations as article (article.path)}
					<a
						href="{base}/{article.path.replace('.md', '')}"
						class="group block py-2.5"
						style="border-bottom: 1px solid var(--color-border);"
						data-sveltekit-preload-code="hover"
					>
						<span
							class="font-serif text-[0.9rem] transition-colors duration-200 group-hover:text-[--color-accent]"
							style="color: var(--color-text);">{article.meta.title}</span
						>
						{#if article.meta.short}
							<p
								class="mt-0.5 text-[0.75rem] leading-relaxed"
								style="color: var(--color-text-muted);"
							>
								{article.meta.short}
							</p>
						{/if}
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Topic sidebar (right, narrower) -sticky on desktop -->
	<aside class="w-full shrink-0 md:sticky md:top-16 md:w-[240px] md:self-start">
		<div
			class="rounded"
			style="border: 1px solid var(--color-border); background: var(--color-surface);"
		>
			<div
				class="flex items-center justify-between px-3 py-2"
				style="border-bottom: 1px solid var(--color-border);"
			>
				<span
					class="font-mono text-[0.65rem] tracking-[0.1em] uppercase"
					style="color: var(--color-text-muted);">Topics</span
				>
				{#if selectedTopics.size > 0}
					<button
						onclick={clearFilters}
						class="cursor-pointer font-mono text-[0.6rem] transition-colors duration-200 hover:text-[--color-accent]"
						style="color: var(--color-text-muted); background: none; border: none;"
					>
						clear
					</button>
				{/if}
			</div>
			<div class="flex max-h-[50vh] flex-wrap gap-1 overflow-y-auto p-2.5">
				{#each data.topics as topic (topic.name)}
					<button
						onclick={() => toggleTopic(topic.name)}
						class="cursor-pointer rounded-sm border font-mono text-[0.65rem] transition-all duration-150"
						style="
							padding: 1px 6px;
							letter-spacing: 0.03em;
							border-color: {selectedTopics.has(topic.name) ? '#D4A017' : 'var(--color-border)'};
							color: {selectedTopics.has(topic.name) ? '#1A1A1A' : 'var(--color-text-muted)'};
							background: {selectedTopics.has(topic.name) ? '#D4A017' : 'transparent'};
							font-weight: {selectedTopics.has(topic.name) ? '700' : '400'};
						"
					>
						{topic.name}
						<span style="opacity: 0.4; font-size: 0.8em;">{topic.count}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Section filter -->
		<div
			class="mt-3 rounded"
			style="border: 1px solid var(--color-border); background: var(--color-surface);"
		>
			<div class="px-3 py-2" style="border-bottom: 1px solid var(--color-border);">
				<span
					class="font-mono text-[0.65rem] tracking-[0.1em] uppercase"
					style="color: var(--color-text-muted);">Sections</span
				>
			</div>
			<div class="flex flex-col gap-0.5 p-2.5">
				{#each ['articles', 'sheets', 'snippets'] as section}
					{@const count = data.content.filter((p) => p.meta.section === section).length}
					<a
						href="{base}/{section}"
						class="flex items-center justify-between rounded px-2 py-1 text-[0.75rem] transition-colors duration-200 hover:text-[--color-accent]"
						style="color: var(--color-text-muted);"
						data-sveltekit-preload-code="hover"
					>
						<span class="font-serif" style="font-variant: small-caps;">{section}</span>
						<span class="font-mono text-[0.6rem]" style="opacity: 0.5;">{count}</span>
					</a>
				{/each}
			</div>
		</div>
	</aside>
</div>

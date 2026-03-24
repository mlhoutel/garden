<script lang="ts">
	import type { Page } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';
	import seedrandom from 'seedrandom';
	import SandDunes from '$components/global/SandDunes.svelte';

	function preformat(page: Page) {
		switch (page.status) {
			case 404: return { status: page.status, short: 'Page not found.', message: 'The page you are looking for was moved, removed, renamed or never existed.' };
			default: return { status: page.status, short: 'Something went wrong.', message: page.error?.message ?? 'Unknown error' };
		}
	}

	const { status, short, message } = preformat(get(page));

	const rng = seedrandom('error-sky');
	const stars: { cx: number; cy: number; r: number; opacity: number }[] = [];
	for (let i = 0; i < 300; i++) {
		stars.push({ cx: rng() * 100, cy: rng() * 100, r: 0.02 + rng() * 0.06, opacity: 0.06 + rng() * 0.35 });
	}
	const geomRng = seedrandom('error-geom');

	let starsContainer: SVGGElement;
	let shootingTimer: ReturnType<typeof setTimeout>;
	let active = false;
	const STAR_COLORS = ['#F5E6B8', '#FFFEF6', '#FFFEF6', '#E8D5A3', '#C8D8E8'];

	function spawnShootingStar() {
		if (!active || !starsContainer) return;
		const ns = 'http://www.w3.org/2000/svg';
		const angle = Math.PI * 0.3 + (Math.random() - 0.5) * Math.PI * 0.8;
		const sx = Math.random() * 100, sy = Math.random() * 60;
		const len = 1 + Math.random() * 5;
		const ex = sx + Math.cos(angle) * len, ey = sy + Math.sin(angle) * len;
		const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
		const line = document.createElementNS(ns, 'line');
		line.setAttribute('x1', String(sx)); line.setAttribute('y1', String(sy));
		line.setAttribute('x2', String(sx)); line.setAttribute('y2', String(sy));
		line.setAttribute('stroke', color); line.setAttribute('stroke-width', String(0.015 + Math.random() * 0.04));
		line.setAttribute('stroke-linecap', 'round'); line.setAttribute('opacity', '0');
		starsContainer.appendChild(line);
		const speed = 120 + Math.random() * 250;
		setTimeout(() => line.setAttribute('opacity', String(0.03 + Math.random() * 0.1)), 10);
		setTimeout(() => { line.setAttribute('x2', String(ex)); line.setAttribute('y2', String(ey)); }, 80);
		setTimeout(() => line.setAttribute('opacity', '0'), 80 + speed);
		setTimeout(() => line.remove(), 80 + speed + 200);
	}

	function scheduleNextStar() {
		if (!active) return;
		shootingTimer = setTimeout(() => {
			if (!active) return;
			spawnShootingStar();
			if (Math.random() < 0.25) setTimeout(spawnShootingStar, 40 + Math.random() * 120);
			scheduleNextStar();
		}, 300 + Math.random() * 2000);
	}

	onMount(() => { active = true; scheduleNextStar(); });
	onDestroy(() => { active = false; if (shootingTimer) clearTimeout(shootingTimer); });
</script>

<svelte:head>
	<title>{status} - Garden</title>
</svelte:head>

<!-- Full-height sky with moon, 404 text overlaid, dunes at bottom -->
<div class="relative flex w-full flex-col" style="min-height: 100vh; min-height: 100dvh; background: #1A1A1A;">
	<!-- Sky SVG background -->
	<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" class="absolute inset-0 h-full w-full">
		<defs>
			<radialGradient id="err-glow">
				<stop offset="0%" stop-color="#D4A017" stop-opacity="0.1" />
				<stop offset="40%" stop-color="#D4A017" stop-opacity="0.03" />
				<stop offset="100%" stop-color="#D4A017" stop-opacity="0" />
			</radialGradient>
			<clipPath id="moon-clip"><circle cx="50" cy="32" r="7" /></clipPath>
		</defs>

		<!-- Stars -->
		{#each stars as s, i (i)}
			<circle cx={s.cx} cy={s.cy} r={s.r} fill="#FFFEF6" opacity={s.opacity} />
		{/each}

		<!-- Moon glow -->
		<circle cx="50" cy="32" r="20" fill="url(#err-glow)" />

		<!-- Esoteric rings -->
		<circle cx="50" cy="32" r="18" fill="none" stroke="#D4A017" stroke-width="0.04" opacity="0.08" stroke-dasharray="0.6 1.5" />
		<circle cx="50" cy="32" r="14" fill="none" stroke="#D4A017" stroke-width="0.05" opacity="0.1" />
		<circle cx="50" cy="32" r="10.5" fill="none" stroke="#D4A017" stroke-width="0.04" opacity="0.06" stroke-dasharray="0.3 0.8" />
		{#each Array(16) as _, i}
			{@const angle = (i / 16) * Math.PI * 2}
			<line x1={50 + Math.cos(angle) * 10.8} y1={32 + Math.sin(angle) * 10.8} x2={50 + Math.cos(angle) * 14.5} y2={32 + Math.sin(angle) * 14.5} stroke="#D4A017" stroke-width="0.03" opacity="0.06" />
		{/each}
		<!-- Cardinal dots + diamonds -->
		{#each [[50, 18], [50, 46], [36, 32], [64, 32]] as [cx, cy]}
			<circle {cx} {cy} r="0.25" fill="#D4A017" opacity="0.15" />
		{/each}
		{#each [45, 135, 225, 315] as deg}
			{@const a = (deg * Math.PI) / 180}
			{@const dx = 50 + Math.cos(a) * 14}
			{@const dy = 32 + Math.sin(a) * 14}
			<polygon points="{dx},{dy - 0.4} {dx + 0.25},{dy} {dx},{dy + 0.4} {dx - 0.25},{dy}" fill="#D4A017" opacity="0.1" />
		{/each}
		<!-- Arc segments -->
		<path d="M 50 14 A 18 18 0 0 1 65 24" fill="none" stroke="#D4A017" stroke-width="0.03" opacity="0.05" />
		<path d="M 35 40 A 18 18 0 0 1 50 50" fill="none" stroke="#D4A017" stroke-width="0.03" opacity="0.05" />

		<!-- Toon-shaded moon: flat yellow disc + dark crescent shadow -->
		<circle cx="50" cy="32" r="7" fill="#E8C45A" />
		<g clip-path="url(#moon-clip)">
			<!-- Shadow crescent: offset darker circle clipped to the moon shape -->
			<circle cx="53" cy="35" r="6.5" fill="#A07808" opacity="0.45" />
		</g>
		<!-- Rim highlight at top-left -->
		<path d="M 44.8 28.5 A 7 7 0 0 1 50.5 25.2" fill="none" stroke="#FFF8E0" stroke-width="0.25" opacity="0.35" />

		<!-- Scattered diamonds -->
		{#each Array(8) as _, i}
			{@const a = geomRng() * Math.PI * 2}
			{@const d = 22 + geomRng() * 26}
			{@const x = 50 + Math.cos(a) * d}
			{@const y = 50 + Math.sin(a) * d}
			{@const sz = 0.2 + geomRng() * 0.5}
			<polygon points="{x},{y - sz} {x + sz * 0.5},{y} {x},{y + sz} {x - sz * 0.5},{y}" fill="none" stroke="#D4A017" stroke-width="0.03" opacity="0.04" />
		{/each}

		<g bind:this={starsContainer}></g>
	</svg>

	<!-- Dunes at bottom of sky -->
	<div class="absolute bottom-0 left-0 right-0" style="z-index: 10; pointer-events: none;">
		<SandDunes lightSand="#FFFEF6" lightShadow="#E8C878" darkSand="#23201E" darkShadow="#151210" />
	</div>

	<!-- Error content: centered, above dunes -->
	<div class="relative z-20 mt-auto mb-[12vh] flex flex-col items-center px-4 text-center md:mb-[15vh]">
		<span class="inline-flex items-center justify-center">
			<h1 class="text-5xl md:text-8xl" style="font-family: var(--font-display); color: #FFFEF6; text-shadow: 0 2px 20px rgba(212,160,23,0.3);">
				{status}
			</h1>
			<p class="mx-3 h-[40px] w-[2px] md:mx-8 md:h-[80px]" style="background-color: #D4A017; opacity: 0.5;"></p>
			<h2 class="font-serif text-lg md:text-3xl" style="color: #E8E0D4; opacity: 0.8;">{short}</h2>
		</span>

		<p class="mt-4 max-w-[28em] text-sm md:text-base" style="color: #9A928A;">{message}</p>

		<div class="mt-6 flex flex-wrap justify-center gap-4">
			<a class="font-serif text-sm transition-colors duration-200 hover:underline md:text-base" style="color: #D4A017;" href="{base}/" data-sveltekit-preload-code="hover">&larr; Return Home</a>
			<a href="{base}/search" class="font-serif text-sm transition-colors duration-200 hover:underline md:text-base" style="color: #D4A017;" data-sveltekit-preload-code="hover">Search</a>
			<a href="https://github.com/mlhoutel/garden/issues" class="font-serif text-sm transition-colors duration-200 hover:underline md:text-base" style="color: #D4A017;" target="_blank" rel="noreferrer">Report issue &rarr;</a>
		</div>
	</div>
</div>

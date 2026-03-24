<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import seedrandom from 'seedrandom';
	import IFrame from '$components/global/IFrame.svelte';

	const title = 'About';
	let lang = $state<'en' | 'fr'>('en');

	function toggleLang() {
		lang = lang === 'en' ? 'fr' : 'en';
	}

	let iframeSrc = $derived(
		lang === 'en'
			? 'https://mlhoutel-curriculum.vercel.app/en'
			: 'https://mlhoutel-curriculum.vercel.app/fr'
	);

	function print() {
		if (browser) {
			window.print();
		}
	}

	// Preload Mukta font for the CV iframe
	if (browser) {
		const googleapis = document.createElement('link');
		googleapis.rel = 'preconnect';
		googleapis.href = 'https://fonts.googleapis.com';
		document.head.appendChild(googleapis);

		const gstatic = document.createElement('link');
		gstatic.rel = 'preconnect';
		gstatic.href = 'https://fonts.gstatic.com';
		gstatic.setAttribute('crossorigin', '');
		document.head.appendChild(gstatic);

		const fonts = document.createElement('link');
		fonts.href = 'https://fonts.googleapis.com/css2?family=Mukta:wght@200;700&display=swap';
		fonts.rel = 'stylesheet';
		document.head.appendChild(fonts);
	}

	// Constellation stars for header
	const rng = seedrandom('section-About');
	const stars: { cx: number; cy: number; r: number; opacity: number }[] = [];
	for (let i = 0; i < 150; i++) {
		stars.push({
			cx: rng() * 100,
			cy: rng() * 100,
			r: 0.02 + rng() * 0.06,
			opacity: 0.06 + rng() * 0.3
		});
	}
	const geomRng = seedrandom('section-geom-About');

	// Esoteric rays generator
	const rayRng = seedrandom('about-rays');
</script>

<svelte:head>
	<title>About - Garden</title>
	<meta name="description" content="About Maël Lhoutellier - software engineer." />
</svelte:head>

<!-- Full-bleed wrapper: escape layout's px-3 and pt-[100px] -->
<div style="margin: -100px -12px 0 -12px;">
	<!-- Constellation sky header -->
	<div
		class="relative w-full overflow-hidden"
		style="height: 22vh; min-height: 140px; background: #1A1A1A;"
	>
		<svg
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid slice"
			class="absolute inset-0 h-full w-full"
		>
			{#each stars as s, i (i)}
				<circle cx={s.cx} cy={s.cy} r={s.r} fill="#FFFEF6" opacity={s.opacity} />
			{/each}

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
			<circle
				cx="50"
				cy="50"
				r="8"
				fill="none"
				stroke="#D4A017"
				stroke-width="0.04"
				opacity="0.04"
			/>

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

		<div
			class="absolute inset-0 flex flex-col items-center justify-center px-4"
			style="z-index: 5;"
		>
			<span
				class="mb-2 font-mono text-[0.65rem] tracking-[0.3em]"
				style="color: #D4A017; opacity: 0.4;">◇ ─── ◈ ─── ◇</span
			>
			<h1
				class="text-3xl tracking-[0.12em] md:text-5xl"
				style="font-family: var(--font-display); color: #FFFEF6; font-weight: 400; letter-spacing: 0.12em;"
			>
				About
			</h1>
			<p class="mt-2 max-w-[28em] text-center text-[0.85rem]" style="color: #9A928A;">
				A map of the cartographer.
			</p>
		</div>
	</div>

	<!-- Golden separator -->
	<div class="relative" style="z-index: 15;">
		<svg
			viewBox="0 0 800 16"
			class="mx-auto w-full"
			style="max-width: 800px; height: 16px; margin-top: -8px;"
		>
			<line x1="0" y1="8" x2="300" y2="8" stroke="#D4A017" stroke-width="0.5" opacity="0.12" />
			<polygon points="304,8 308,5.5 312,8 308,10.5" fill="#D4A017" opacity="0.2" />
			<circle
				cx="325"
				cy="8"
				r="1.5"
				fill="none"
				stroke="#D4A017"
				stroke-width="0.4"
				opacity="0.18"
			/>
			<line x1="330" y1="8" x2="370" y2="8" stroke="#D4A017" stroke-width="0.5" opacity="0.18" />
			<polygon
				points="400,2 406,8 400,14 394,8"
				fill="none"
				stroke="#D4A017"
				stroke-width="0.5"
				opacity="0.25"
			/>
			<polygon points="400,4.5 403,8 400,11.5 397,8" fill="#D4A017" opacity="0.12" />
			<line x1="430" y1="8" x2="470" y2="8" stroke="#D4A017" stroke-width="0.5" opacity="0.18" />
			<circle
				cx="475"
				cy="8"
				r="1.5"
				fill="none"
				stroke="#D4A017"
				stroke-width="0.4"
				opacity="0.18"
			/>
			<polygon points="488,8 492,5.5 496,8 492,10.5" fill="#D4A017" opacity="0.2" />
			<line x1="500" y1="8" x2="800" y2="8" stroke="#D4A017" stroke-width="0.5" opacity="0.12" />
		</svg>
	</div>
</div>

<!-- Breadcrumb -->
<div class="mx-auto max-w-[680px] px-1 pt-3 pb-4">
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
			<li style="font-weight: 500;" aria-current="page">about</li>
		</ol>
	</nav>
</div>

<!-- CV section: mandala + title bar + iframe.
     clip-path clips top/bottom so mandala doesn't bleed into header/footer,
     but horizontal overflow is free (clipped only by html overflow-x:hidden). -->
<div class="relative mx-auto" style="max-width: 260mm; clip-path: inset(0 -100vw); overflow: visible;">
	<!-- Esoteric mandala: zero-height wrapper so it doesn't push content down.
	     Overflows horizontally (clipped by html overflow-x:hidden).
	     Overflows vertically within this wrapper (clipped by overflow-y:clip above). -->
	<div
		class="pointer-events-none absolute left-1/2"
		style="z-index: 0; top: 80px; transform: translateX(-50%); width: 150vw; height: 150vw; max-width: 2000px; max-height: 2000px;"
	>
		<svg
			viewBox="-600 -600 1200 1200"
			class="h-full w-full"
			style="overflow: visible;"
			preserveAspectRatio="xMidYMid meet"
		>
			<!-- Concentric circles -->
			{#each [80, 140, 210, 290, 380, 480, 560] as r, i}
				<circle
					cx="0"
					cy="0"
					{r}
					fill="none"
					stroke="#D4A017"
					stroke-width={i < 3 ? 1.2 : 0.6}
					opacity={0.12 - i * 0.01}
					stroke-dasharray={i % 2 === 0 ? 'none' : `${3 + i * 2} ${5 + i * 3}`}
				/>
			{/each}

			<!-- 36 primary sun rays -->
			{#each Array(36) as _, i}
				{@const angle = (i * 10 * Math.PI) / 180}
				{@const innerR = 60 + rayRng() * 30}
				{@const outerR = 400 + rayRng() * 200}
				<line
					x1={Math.cos(angle) * innerR}
					y1={Math.sin(angle) * innerR}
					x2={Math.cos(angle) * outerR}
					y2={Math.sin(angle) * outerR}
					stroke="#D4A017"
					stroke-width={i % 3 === 0 ? 0.8 : 0.4}
					opacity={i % 3 === 0 ? 0.1 : 0.05}
				/>
			{/each}

			<!-- 36 secondary rays -->
			{#each Array(36) as _, i}
				{@const angle = ((i * 10 + 5) * Math.PI) / 180}
				{@const innerR = 120 + rayRng() * 40}
				{@const outerR = 300 + rayRng() * 250}
				<line
					x1={Math.cos(angle) * innerR}
					y1={Math.sin(angle) * innerR}
					x2={Math.cos(angle) * outerR}
					y2={Math.sin(angle) * outerR}
					stroke="#D4A017"
					stroke-width="0.3"
					opacity="0.04"
				/>
			{/each}

			<!-- Cardinal diamonds -->
			{#each [0, 45, 90, 135, 180, 225, 270, 315] as deg, i}
				{@const angle = (deg * Math.PI) / 180}
				{@const d = i % 2 === 0 ? 200 : 160}
				{@const x = Math.cos(angle) * d}
				{@const y = Math.sin(angle) * d}
				{@const s = i % 2 === 0 ? 8 : 5}
				<polygon
					points="{x},{y - s} {x + s * 0.6},{y} {x},{y + s} {x - s * 0.6},{y}"
					fill="#D4A017"
					opacity={i % 2 === 0 ? 0.1 : 0.07}
				/>
			{/each}

			<!-- 12 circles on inner ring -->
			{#each Array(12) as _, i}
				{@const angle = (i * 30 * Math.PI) / 180}
				<circle
					cx={Math.cos(angle) * 140}
					cy={Math.sin(angle) * 140}
					r="3"
					fill="none"
					stroke="#D4A017"
					stroke-width="0.6"
					opacity="0.08"
				/>
			{/each}

			<!-- Dashed arc segments -->
			{#each Array(8) as _, i}
				{@const sa = i * 45 + 5}
				{@const ea = i * 45 + 40}
				{@const r = 340}
				<path
					d="M {Math.cos((sa * Math.PI) / 180) * r} {Math.sin((sa * Math.PI) / 180) *
						r} A {r} {r} 0 0 1 {Math.cos((ea * Math.PI) / 180) * r} {Math.sin(
						(ea * Math.PI) / 180
					) * r}"
					fill="none"
					stroke="#D4A017"
					stroke-width="0.7"
					opacity="0.06"
					stroke-dasharray="4 6"
				/>
			{/each}

			<!-- Scattered stars -->
			{#each Array(24) as _, i}
				{@const angle = rayRng() * Math.PI * 2}
				{@const d = 250 + rayRng() * 280}
				<circle
					cx={Math.cos(angle) * d}
					cy={Math.sin(angle) * d}
					r={1 + rayRng() * 1.5}
					fill="#D4A017"
					opacity={0.04 + rayRng() * 0.06}
				/>
			{/each}

			<!-- Inner ornate ring with tick marks -->
			<circle cx="0" cy="0" r="60" fill="none" stroke="#D4A017" stroke-width="0.8" opacity="0.1" />
			{#each Array(60) as _, i}
				{@const angle = (i * 6 * Math.PI) / 180}
				{@const inner = i % 5 === 0 ? 50 : 55}
				<line
					x1={Math.cos(angle) * inner}
					y1={Math.sin(angle) * inner}
					x2={Math.cos(angle) * 60}
					y2={Math.sin(angle) * 60}
					stroke="#D4A017"
					stroke-width={i % 5 === 0 ? 0.8 : 0.4}
					opacity={i % 5 === 0 ? 0.1 : 0.05}
				/>
			{/each}

			<!-- Center -->
			<circle cx="0" cy="0" r="3" fill="#D4A017" opacity="0.1" />
			<circle cx="0" cy="0" r="8" fill="none" stroke="#D4A017" stroke-width="0.6" opacity="0.08" />
		</svg>
	</div>

	<!-- Ornate title bar — futuristic gold window chrome -->
	<div id="print" class="relative mx-auto flex items-center md:justify-center" style="z-index: 2;">
		<div
			class="flex w-full items-center"
			style="max-width: 230mm; background: #1A1A1A; border: 1px solid rgba(212,160,23,0.15); border-bottom: 2px solid rgba(212,160,23,0.25);"
		>
			<!-- Left ornament -->
			<svg
				viewBox="0 0 60 24"
				class="hidden h-6 flex-shrink-0 sm:block"
				style="width: 60px;"
				preserveAspectRatio="xMidYMid meet"
			>
				<line x1="4" y1="12" x2="52" y2="12" stroke="#D4A017" stroke-width="0.5" opacity="0.3" />
				<circle cx="8" cy="12" r="1.2" fill="#D4A017" opacity="0.25" />
				<polygon points="54,12 58,9.5 58,14.5" fill="#D4A017" opacity="0.2" />
			</svg>

			<span class="hidden px-1 sm:inline" style="color: #D4A017; opacity: 0.3; font-size: 0.5rem;"
				>◆</span
			>

			<!-- Title -->
			<span
				class="flex-shrink-0 px-2 py-2 font-mono text-[0.6rem] tracking-[0.25em] uppercase"
				style="color: #D4A017; opacity: 0.7;"
			>
				Curriculum Vitae
			</span>

			<span class="hidden px-1 sm:inline" style="color: #D4A017; opacity: 0.3; font-size: 0.5rem;"
				>◆</span
			>

			<!-- Right ornament line (fills remaining space) -->
			<svg
				viewBox="0 0 200 24"
				class="hidden h-6 flex-1 sm:block"
				preserveAspectRatio="xMinYMid meet"
			>
				<line x1="2" y1="12" x2="196" y2="12" stroke="#D4A017" stroke-width="0.5" opacity="0.2" />
				<polygon points="2,12 6,9.5 6,14.5" fill="#D4A017" opacity="0.2" />
			</svg>

			<!-- Spacer on mobile -->
			<div class="flex-1 sm:hidden"></div>

			<!-- Action buttons -->
			<div class="ml-auto flex items-center pr-3">
				<button
					onclick={print}
					class="titlebar-btn px-2 py-2 font-mono text-[0.6rem] tracking-[0.15em] uppercase"
				>
					⎙ print
				</button>
				<span style="color: #D4A017; opacity: 0.2; font-size: 0.5rem;">·</span>
				<button
					onclick={toggleLang}
					class="titlebar-btn px-2 py-2 font-mono text-[0.6rem] tracking-[0.15em] uppercase"
				>
					{lang === 'en' ? 'FR' : 'EN'}
				</button>
			</div>
		</div>
	</div>

	<!-- CV container -->
	<container id="cv" class="relative md:flex md:justify-center" style="z-index: 2;">
		<div
			class="A4 relative font-thin tracking-wider"
			style="background: white; box-shadow: 0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);"
		>
			<IFrame title="curriculum" src={iframeSrc} />
		</div>
	</container>
</div>

<style>
	.titlebar-btn {
		color: rgba(212, 160, 23, 0.5);
		background: transparent;
		border: none;
		cursor: pointer;
		transition: color 0.2s;
	}
	.titlebar-btn:hover {
		color: rgba(212, 160, 23, 0.9);
	}

	@media print {
		:global(*) {
			visibility: hidden;
		}

		:global(#navbar) {
			display: none;
		}

		#print {
			display: none;
		}

		#cv,
		#cv * {
			visibility: visible;
			overflow: hidden;
		}

		#cv {
			width: 230mm;
			height: 325mm;
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	@page {
		size: A4;
		margin: 0;
		overflow: hidden;
	}

	.A4 {
		overflow: hidden;
		width: 230mm;
		height: 325mm;
		line-height: 1.2em !important;
		text-align: justify;
		font-family: 'Mukta', sans-serif;
		color: black;
	}
</style>

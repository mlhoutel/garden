<script lang="ts">
	import { base } from '$app/paths';
	import { onMount, onDestroy } from 'svelte';

	let {
		overlap = '0px',
		lightSand = '#FFFEF6',
		lightShadow = '#E8C878',
		darkSand = '#23201E',
		darkShadow = '#151210',
		class: className = ''
	}: {
		overlap?: string;
		lightSand?: string;
		lightShadow?: string;
		darkSand?: string;
		darkShadow?: string;
		class?: string;
	} = $props();

	let svgContent = $state('');
	let rawSvg = '';
	let observer: MutationObserver;
	let parallaxX = $state(0);
	let parallaxY = $state(0);
	let innerEl: HTMLDivElement;

	const svgCache =
		typeof window !== 'undefined'
			? ((window as any).__dunesSvgCache as { raw?: string }) ||
				((window as any).__dunesSvgCache = {})
			: {};

	function isDark(): boolean {
		return document.documentElement.classList.contains('dark');
	}

	function applyColors() {
		if (!rawSvg) return;
		const dark = isDark();
		const sand = dark ? darkSand : lightSand;
		const shadow = dark ? darkShadow : lightShadow;

		let svg = rawSvg;
		svg = svg.replace(/fill:#ffffff/gi, `fill:${sand}`);
		svg = svg.replace(/fill:#fff(?![\da-f])/gi, `fill:${sand}`);
		svg = svg.replace(/fill:#000000/gi, `fill:${shadow}`);
		svg = svg.replace(/fill:#000(?![\da-f])/gi, `fill:${shadow}`);
		svgContent = svg;
	}

	function handleMouseMove(e: MouseEvent) {
		const nx = (e.clientX / window.innerWidth - 0.5) * 2;
		parallaxX = nx * 2;
	}

	function handleScroll() {
		// Dunes drift down slightly as you scroll down (inverted, very slow)
		parallaxY = -(window.scrollY * 0.015);
	}

	onMount(async () => {
		try {
			if (svgCache.raw) {
				rawSvg = svgCache.raw;
			} else {
				const res = await fetch(`${base}/images/desert.svg`);
				if (!res.ok) return; // SVG not found — silently skip
				let raw = await res.text();
				// Verify it's actually SVG, not a 404 HTML page
				if (!raw.includes('<svg')) return;
				raw = raw.replace(/\s*width="[^"]*"/, '');
				raw = raw.replace(/\s*height="[^"]*"/, '');
				raw = raw.replace(/preserveAspectRatio="[^"]*"/g, '');
				raw = raw.replace(/viewBox="[^"]*"/, 'viewBox="0 20 165.63 72.60"');
				raw = raw.replace(/<svg/, '<svg preserveAspectRatio="xMidYMin slice"');
				rawSvg = raw;
				svgCache.raw = raw;
			}
			applyColors();
		} catch (e) {
			console.error('Failed to load desert SVG:', e);
		}

		observer = new MutationObserver(() => applyColors());
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // initial position
	});

	onDestroy(() => {
		observer?.disconnect();
		if (typeof window !== 'undefined') {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<div class="pointer-events-none relative w-full {className}" style="margin-top: -{overlap};">
	{#if svgContent}
		<div
			bind:this={innerEl}
			class="dunes-inner"
			style="transform: translateX(calc(-50% + {parallaxX}px)) translateY({parallaxY}px);"
		>
			{@html svgContent}
		</div>
	{/if}
</div>

<style>
	.dunes-inner {
		width: 100vw;
		position: relative;
		left: 50%;
		top: min(500px, 50vh);
		overflow: hidden;
		/* Very slow, dreamy parallax -like heat shimmer over sand */
		transition: transform 2.5s cubic-bezier(0.15, 0, 0.25, 1);
		/* Slight extra width so parallax shift doesn't reveal edges */
		width: calc(100vw + 20px);
		margin-left: -10px;
	}

	.dunes-inner :global(svg) {
		width: 100%;
		/* Taller on mobile for coverage, capped on desktop */
		height: clamp(350px, 70vh, 500px);
		display: block;
	}

	@media (max-width: 480px) {
		.dunes-inner :global(svg) {
			height: clamp(300px, 60vh, 400px);
		}
	}
</style>

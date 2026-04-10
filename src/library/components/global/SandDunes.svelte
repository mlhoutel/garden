<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import rawDesertSvg from '$library/assets/desert.svg?raw';

	let {
		overlap = '0px',
		class: className = ''
	}: {
		overlap?: string;
		class?: string;
	} = $props();

	let parallaxX = $state(0);
	let parallaxY = $state(0);
	let mounted = $state(false);
	let innerEl: HTMLDivElement;

	// Process SVG at module scope (runs during SSR and client).
	// Replace hardcoded fills with CSS custom properties so dark/light
	// mode is handled purely by CSS, no JS color-swapping needed.
	function prepareSvg(raw: string): string {
		raw = raw.replace(/\s*width="[^"]*"/, '');
		raw = raw.replace(/\s*height="[^"]*"/, '');
		raw = raw.replace(/preserveAspectRatio="[^"]*"/g, '');
		raw = raw.replace(/viewBox="[^"]*"/, 'viewBox="0 20 165.63 72.60"');
		raw = raw.replace(/<svg/, '<svg preserveAspectRatio="xMidYMin slice"');
		raw = raw.replace(/fill:#ffffff/gi, 'fill:var(--dune-sand)');
		raw = raw.replace(/fill:#fff(?![\da-f])/gi, 'fill:var(--dune-sand)');
		raw = raw.replace(/fill:#000000/gi, 'fill:var(--dune-shadow)');
		raw = raw.replace(/fill:#000(?![\da-f])/gi, 'fill:var(--dune-shadow)');
		return raw;
	}

	const processedSvg = prepareSvg(rawDesertSvg);

	function handleMouseMove(e: MouseEvent) {
		const nx = (e.clientX / window.innerWidth - 0.5) * 2;
		parallaxX = nx * 2;
	}

	function handleScroll() {
		parallaxY = -(window.scrollY * 0.015);
	}

	onMount(() => {
		// Enable transition only after mount so the initial SSR position
		// doesn't trigger a 2.5s slide animation during hydration.
		mounted = true;

		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<div class="pointer-events-none relative w-full {className}" style="margin-top: -{overlap}; overflow: hidden;">
	<div
		bind:this={innerEl}
		class="dunes-inner"
		class:has-transition={mounted}
		style="transform: translateX(calc(-50% + {parallaxX}px)) translateY({parallaxY}px);"
	>
		{@html processedSvg}
	</div>
</div>

<style>
	.dunes-inner {
		width: calc(100vw + 20px);
		position: relative;
		left: 50%;
		top: 0;
		overflow: hidden;
		margin-left: -10px;
		will-change: transform;
	}

	.dunes-inner.has-transition {
		transition: transform 2.5s cubic-bezier(0.15, 0, 0.25, 1);
	}

	.dunes-inner :global(svg) {
		width: 100%;
		height: clamp(350px, 70vh, 500px);
		display: block;
		transform: rotate(-1deg);
		transform-origin: center center;
	}

	@media (max-width: 480px) {
		.dunes-inner :global(svg) {
			height: clamp(300px, 60vh, 400px);
		}
	}
</style>

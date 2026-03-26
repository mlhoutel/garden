<script lang="ts">
	import { onMount } from 'svelte';
	import seedrandom from 'seedrandom';

	let { loading = false }: { loading?: boolean } = $props();

	let canvas: HTMLCanvasElement;
	let containerEl: HTMLDivElement;
	let intensity = $state(0); // 0 = loading (blue, dim), 1 = loaded (gold, bright)
	let animFrame: number;

	function draw() {
		if (!canvas || !containerEl) return;

		const w = containerEl.clientWidth;
		const h = containerEl.clientHeight;
		canvas.width = w;
		canvas.height = h;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const cx = w / 2;
		const cy = h / 2;
		const baseHoleRadius = Math.min(w, h) * 0.25;
		const rng = seedrandom('dune-garden-overlay');

		ctx.clearRect(0, 0, w, h);

		// Interpolate between blue (loading) and gold (loaded)
		const t = intensity;
		const cr = Math.round(100 + (212 - 100) * t);  // 100 → 212
		const cg = Math.round(150 + (160 - 150) * t);  // 150 → 160
		const cb = Math.round(220 + (23 - 220) * t);   // 220 → 23
		const alphaScale = 0.35 + 0.65 * t; // dim blue when loading, full gold when loaded
		// Halo grows from 60% to 100% size during transition
		const sizeScale = 0.6 + 0.4 * t;
		const holeRadius = baseHoleRadius * sizeScale;

		// 1. Vignette with transparent center hole — outer reach also scales
		const outerReach = Math.max(w, h) * (0.45 + 0.25 * t);
		const vignette = ctx.createRadialGradient(cx, cy, holeRadius * 0.85, cx, cy, outerReach);
		vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
		vignette.addColorStop(0.15, 'rgba(0, 0, 0, 0)');
		vignette.addColorStop(0.4, `rgba(${cr}, ${cg}, ${cb}, ${0.04 * alphaScale})`);
		vignette.addColorStop(0.65, `rgba(${cr}, ${cg}, ${cb}, ${0.08 * alphaScale})`);
		vignette.addColorStop(0.85, `rgba(${cr}, ${cg}, ${cb}, ${0.12 * alphaScale})`);
		vignette.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, ${0.18 * alphaScale})`);
		ctx.fillStyle = vignette;
		ctx.fillRect(0, 0, w, h);

		// 2. Ring around the hole
		ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${0.2 * alphaScale})`;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
		ctx.stroke();

		ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${0.1 * alphaScale})`;
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		ctx.arc(cx, cy, holeRadius * 0.92, 0, Math.PI * 2);
		ctx.stroke();

		// 3. Rays from the ring outward — length scales with intensity
		for (let i = 0; i < 72; i++) {
			const angle = (i / 72) * Math.PI * 2 + rng() * 0.04;
			const rayLen = (30 + rng() * 180) * sizeScale;
			const startR = holeRadius + 2;
			const endR = startR + rayLen;
			const x1 = cx + Math.cos(angle) * startR;
			const y1 = cy + Math.sin(angle) * startR;
			const x2 = cx + Math.cos(angle) * endR;
			const y2 = cy + Math.sin(angle) * endR;
			const opacity = (0.03 + rng() * 0.08) * alphaScale;
			ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${opacity})`;
			ctx.lineWidth = 0.5 + rng() * 1;
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
		}

		// 4. Geometric shapes — distance scales with intensity
		for (let i = 0; i < 16; i++) {
			const angle = (i / 16) * Math.PI * 2 + rng() * 0.3;
			const dist = holeRadius + (40 + rng() * 150) * sizeScale;
			const sx = cx + Math.cos(angle) * dist;
			const sy = cy + Math.sin(angle) * dist;
			const size = 4 + rng() * 12;
			const opacity = (0.04 + rng() * 0.08) * alphaScale;
			const rotation = rng() * Math.PI;
			ctx.save();
			ctx.translate(sx, sy);
			ctx.rotate(rotation);
			ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${opacity})`;
			ctx.lineWidth = 0.5;
			const shape = Math.floor(rng() * 4);
			if (shape === 0) {
				ctx.beginPath(); ctx.moveTo(0, -size); ctx.lineTo(size * 0.6, 0); ctx.lineTo(0, size); ctx.lineTo(-size * 0.6, 0); ctx.closePath(); ctx.stroke();
			} else if (shape === 1) {
				ctx.strokeRect(-size / 2, -size / 2, size, size);
			} else if (shape === 2) {
				ctx.beginPath(); ctx.arc(0, 0, size / 2, 0, Math.PI * 2); ctx.stroke();
			} else {
				ctx.beginPath(); ctx.moveTo(0, -size); ctx.lineTo(size * 0.866, size * 0.5); ctx.lineTo(-size * 0.866, size * 0.5); ctx.closePath(); ctx.stroke();
			}
			ctx.restore();
		}

		// 5. Dots — spread scales with intensity
		for (let i = 0; i < 40; i++) {
			const angle = rng() * Math.PI * 2;
			const dist = holeRadius * 1.1 + rng() * (Math.max(w, h) * 0.35) * sizeScale;
			const dx = cx + Math.cos(angle) * dist;
			const dy = cy + Math.sin(angle) * dist;
			const dotSize = 0.5 + rng() * 1.5;
			ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${(0.05 + rng() * 0.1) * alphaScale})`;
			ctx.beginPath(); ctx.arc(dx, dy, dotSize, 0, Math.PI * 2); ctx.fill();
		}

		// 6. Outer arcs — radius scales with intensity
		for (let i = 0; i < 6; i++) {
			const arcRadius = holeRadius + (20 + i * 30 + rng() * 20) * sizeScale;
			const startAngle = rng() * Math.PI * 2;
			const arcLength = 0.2 + rng() * 0.6;
			const opacity = (0.03 + rng() * 0.06) * alphaScale;
			ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${opacity})`;
			ctx.lineWidth = 0.5;
			ctx.beginPath(); ctx.arc(cx, cy, arcRadius, startAngle, startAngle + arcLength); ctx.stroke();
		}
	}

	// Animate intensity from 0→1 when loading finishes
	function animateIntensity() {
		const target = loading ? 0 : 1;
		if (Math.abs(intensity - target) < 0.01) {
			intensity = target;
			draw();
			return;
		}
		intensity += (target - intensity) * 0.025; // smooth ease toward target
		draw();
		animFrame = requestAnimationFrame(animateIntensity);
	}

	$effect(() => {
		// Re-trigger animation when loading state changes
		void loading;
		cancelAnimationFrame(animFrame);
		animateIntensity();
	});

	onMount(() => {
		draw();
		const onResize = () => draw();
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
			cancelAnimationFrame(animFrame);
		};
	});
</script>

<div bind:this={containerEl} class="pointer-events-none absolute inset-0" style="z-index: 20;">
	<canvas bind:this={canvas} class="h-full w-full"></canvas>
</div>

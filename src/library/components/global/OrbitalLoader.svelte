<script lang="ts">
	import seedrandom from 'seedrandom';

	let { visible = true }: { visible?: boolean } = $props();

	const rng = seedrandom('orbital-loader');
	const colors = ['#D4A017', '#F5E6B8', '#FFFEF6', '#FFFEF6', '#D4A017', '#F5E6B8', '#8AAFC4'];

	const MESSAGES = [
		'seeding universe...',
		'aligning constellations...',
		'awakening the sleeper...',
		'unfolding the golden path...',
		'charting the deep desert...',
		'reading the stars...',
		'crossing the sand sea...',
		'tracing ancient orbits...',
		'gathering scattered light...',
		'listening to the wind...',
		'decoding the desert wind...',
		'mapping the infinite void...',
		'invoking the litany...',
		'listening to the sand...',
		'remembering the old earth...',
		'kindling the prescient flame...',
		'counting grains of dust...',
		'calling the distant shore...',
		'breathing beneath the dunes...',
		'drifting through the stillness...',
		'turning the celestial dial...',
		'drawing water from stone...',
		'following the ancient current...',
		'opening the valley gate...',
		'watching the horizon glow...',
		'planting seeds in silence...',
		'measuring the weight of light...',
		'waiting for the third moon...'
	];
	let message = $state(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);

	// Pick a new message each time loader becomes visible
	$effect(() => {
		if (visible) {
			message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
		}
	});

	interface Arc {
		strokeWidth: number;
		color: string;
		opacity: number;
		duration: number;
		path: string;
	}

	interface Dot {
		cx: number;
		cy: number;
		r: number;
		color: string;
		opacity: number;
		duration: number;
	}

	function arcPath(radius: number, a1: number, a2: number): string {
		const x1 = radius * Math.cos(a1);
		const y1 = radius * Math.sin(a1);
		const x2 = radius * Math.cos(a2);
		const y2 = radius * Math.sin(a2);
		const largeArc = a2 - a1 > Math.PI ? 1 : 0;
		return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
	}

	const arcs: Arc[] = [];
	for (let i = 0; i < 18; i++) {
		const radius = 40 + rng() * 260;
		const startAngle = rng() * Math.PI * 2;
		const arcLengthRad = ((10 + rng() * 80) * Math.PI) / 180;
		const strokeWidth = 0.3 + rng() * 1.7;
		const color = colors[Math.floor(rng() * colors.length)];
		const opacity = 0.1 + rng() * 0.4;
		const normalizedRadius = (radius - 40) / 260;
		const duration = 4 + normalizedRadius * 16;

		arcs.push({
			strokeWidth,
			color,
			opacity,
			duration,
			path: arcPath(radius, startAngle, startAngle + arcLengthRad)
		});
	}

	const dots: Dot[] = [];
	for (let i = 0; i < 12; i++) {
		const orbitRadius = 50 + rng() * 250;
		const angle = rng() * Math.PI * 2;
		const r = 0.5 + rng() * 1.5;
		const color = colors[Math.floor(rng() * colors.length)];
		const opacity = 0.15 + rng() * 0.4;
		const normalizedRadius = (orbitRadius - 50) / 250;
		const duration = 5 + normalizedRadius * 15;

		dots.push({
			cx: orbitRadius * Math.cos(angle),
			cy: orbitRadius * Math.sin(angle),
			r,
			color,
			opacity,
			duration
		});
	}

	let removed = $state(false);

	$effect(() => {
		if (!visible) {
			const timeout = setTimeout(() => {
				removed = true;
			}, 800);
			return () => clearTimeout(timeout);
		} else {
			removed = false;
		}
	});
</script>

{#if !removed}
	<div class="orbital-loader" class:hidden={!visible}>
		<svg viewBox="-350 -350 700 700" preserveAspectRatio="xMidYMid meet">
			<defs>
				<radialGradient id="central-glow">
					<stop offset="0%" stop-color="#D4A017" stop-opacity="0.05" />
					<stop offset="100%" stop-color="#D4A017" stop-opacity="0" />
				</radialGradient>
			</defs>

			<circle cx="0" cy="0" r="60" fill="url(#central-glow)" />

			{#each arcs as arc, i (i)}
				<g class="orbit-group" style="--orbit-duration: {arc.duration}s;">
					<path
						d={arc.path}
						fill="none"
						stroke={arc.color}
						stroke-width={arc.strokeWidth}
						stroke-linecap="round"
						opacity={arc.opacity}
					/>
				</g>
			{/each}

			{#each dots as dot, i (i)}
				<g class="orbit-group" style="--orbit-duration: {dot.duration}s;">
					<circle cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.color} opacity={dot.opacity} />
				</g>
			{/each}
		</svg>

		<!-- Poetic loading message -->
		<p class="loading-message">{message}</p>
	</div>
{/if}

<style>
	.orbital-loader {
		position: absolute;
		inset: 0;
		z-index: 8;
		background: #1a1a1a;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 1;
		/* No transition on show -instant appear */
		transition: none;
	}

	.orbital-loader.hidden {
		opacity: 0;
		pointer-events: none;
		/* Slow fade only on hide */
		transition: opacity 800ms ease-out;
	}

	.orbital-loader svg {
		width: 100%;
		height: 100%;
	}

	.loading-message {
		position: absolute;
		bottom: 20%;
		left: 50%;
		transform: translateX(-50%);
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-size: 0.95rem;
		letter-spacing: 0.15em;
		color: #d4a017;
		opacity: 0.5;
		white-space: nowrap;
		animation: pulse-message 2.5s ease-in-out infinite;
	}

	@keyframes pulse-message {
		0%,
		100% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.6;
		}
	}

	.orbit-group {
		animation: orbital-spin var(--orbit-duration) linear infinite;
		transform-origin: 0px 0px;
	}

	@keyframes orbital-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>

<script lang="ts">
	import type { IframeProps } from '$types/types';

	let {
		src,
		title,
		rootStyle = '',
		rootClass = '',
		iframeStyle = 'position: absolute; left: 0; height: 100%; width: 100%; border: none',
		iframeClass = '',
		onload: onloadCallback
	}: {
		src: IframeProps['src'];
		title: IframeProps['title'];
		rootStyle?: string;
		rootClass?: string;
		iframeStyle?: string;
		iframeClass?: string;
		onload?: () => void;
	} = $props();

	let loading = $state(true);
</script>

<div style={rootStyle} class={rootClass}>
	{#if loading}
		<div class="iframe-loader absolute left-0 z-10 flex h-full w-full items-center justify-center" style="background: #1A1A1A;">
			<svg viewBox="0 0 400 400" class="iframe-loader-svg">
				<!-- Outer rotating ring with dashes -->
				<circle cx="200" cy="200" r="160" fill="none" stroke="#D4A017" stroke-width="0.4" opacity="0.15" stroke-dasharray="4 8" class="spin-slow" />
				<!-- Middle counter-rotating ring -->
				<circle cx="200" cy="200" r="120" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.12" stroke-dasharray="2 12" class="spin-reverse" />
				<!-- Inner pulsing ring -->
				<circle cx="200" cy="200" r="80" fill="none" stroke="#D4A017" stroke-width="0.5" opacity="0.2" class="pulse-ring" />
				<!-- Innermost ring -->
				<circle cx="200" cy="200" r="40" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.15" stroke-dasharray="1 5" class="spin-slow" />

				<!-- Radial lines -->
				{#each Array(36) as _, i}
					{@const angle = (i / 36) * Math.PI * 2}
					{@const r1 = 45 + (i % 3) * 10}
					{@const r2 = 75 + (i % 2) * 50}
					<line
						x1={200 + Math.cos(angle) * r1}
						y1={200 + Math.sin(angle) * r1}
						x2={200 + Math.cos(angle) * r2}
						y2={200 + Math.sin(angle) * r2}
						stroke="#D4A017"
						stroke-width="0.3"
						opacity={0.04 + (i % 4) * 0.02}
					/>
				{/each}

				<!-- Diamonds at cardinal and ordinal positions -->
				{#each Array(8) as _, i}
					{@const angle = (i / 8) * Math.PI * 2}
					{@const dist = 100}
					{@const x = 200 + Math.cos(angle) * dist}
					{@const y = 200 + Math.sin(angle) * dist}
					<polygon
						points="{x},{y - 5} {x + 3},{y} {x},{y + 5} {x - 3},{y}"
						fill="none" stroke="#D4A017" stroke-width="0.4"
						opacity={0.08 + (i % 2) * 0.06}
						class="pulse-diamond"
						style="animation-delay: {i * 0.15}s;"
					/>
				{/each}

				<!-- Botanical: small leaf/fern shapes around the outer ring -->
				{#each Array(12) as _, i}
					{@const angle = (i / 12) * Math.PI * 2 + 0.15}
					{@const dist = 140}
					{@const x = 200 + Math.cos(angle) * dist}
					{@const y = 200 + Math.sin(angle) * dist}
					{@const rot = (angle * 180) / Math.PI + 90}
					<g transform="translate({x},{y}) rotate({rot})" opacity={0.06 + (i % 3) * 0.03} class="grow-leaf" style="animation-delay: {i * 0.2}s;">
						<!-- Stem -->
						<line x1="0" y1="0" x2="0" y2="-18" stroke="#D4A017" stroke-width="0.4" />
						<!-- Left leaf -->
						<path d="M0,-6 Q-5,-10 -2,-15" fill="none" stroke="#D4A017" stroke-width="0.3" />
						<!-- Right leaf -->
						<path d="M0,-9 Q4,-13 1,-17" fill="none" stroke="#D4A017" stroke-width="0.3" />
						<!-- Tip -->
						<circle cx="0" cy="-18" r="0.8" fill="#D4A017" opacity="0.5" />
					</g>
				{/each}

				<!-- Botanical: vine curves between ferns -->
				{#each Array(6) as _, i}
					{@const a1 = (i / 6) * Math.PI * 2}
					{@const a2 = ((i + 1) / 6) * Math.PI * 2}
					{@const r = 150}
					{@const x1 = 200 + Math.cos(a1) * r}
					{@const y1 = 200 + Math.sin(a1) * r}
					{@const x2 = 200 + Math.cos(a2) * r}
					{@const y2 = 200 + Math.sin(a2) * r}
					{@const mx = 200 + Math.cos((a1 + a2) / 2) * (r + 15)}
					{@const my = 200 + Math.sin((a1 + a2) / 2) * (r + 15)}
					<path d="M{x1},{y1} Q{mx},{my} {x2},{y2}" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.06" />
				{/each}

				<!-- Center eye / seed -->
				<circle cx="200" cy="200" r="8" fill="none" stroke="#D4A017" stroke-width="0.5" opacity="0.25" class="pulse-ring" />
				<circle cx="200" cy="200" r="3" fill="#D4A017" opacity="0.15" class="pulse-diamond" />
				<circle cx="200" cy="200" r="1" fill="#D4A017" opacity="0.3" />

				<!-- Corner ornaments -->
				{#each [[30, 30], [370, 30], [30, 370], [370, 370]] as [cx, cy]}
					<polygon points="{cx},{cy - 6} {cx + 4},{cy} {cx},{cy + 6} {cx - 4},{cy}" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.08" />
				{/each}
			</svg>

			<!-- Loading text -->
			<p class="iframe-loader-text">loading</p>
		</div>
	{/if}

	<iframe
		onload={() => { loading = false; onloadCallback?.(); }}
		{src}
		{title}
		loading="lazy"
		style={iframeStyle}
		class={iframeClass}
	></iframe>
</div>

<style>
	.iframe-loader-svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0.8;
	}

	.iframe-loader-text {
		position: relative;
		z-index: 2;
		font-family: 'Cormorant Garamond', Georgia, serif;
		font-size: 0.8rem;
		letter-spacing: 0.25em;
		color: #D4A017;
		opacity: 0.4;
		animation: pulse-text 2s ease-in-out infinite;
	}

	@keyframes pulse-text {
		0%, 100% { opacity: 0.25; }
		50% { opacity: 0.5; }
	}

	.spin-slow {
		transform-origin: 200px 200px;
		animation: spin 30s linear infinite;
	}

	.spin-reverse {
		transform-origin: 200px 200px;
		animation: spin 24s linear infinite reverse;
	}

	.pulse-ring {
		animation: pulse-r 3s ease-in-out infinite;
	}

	.pulse-diamond {
		animation: pulse-d 2.5s ease-in-out infinite;
	}

	.grow-leaf {
		animation: grow-l 4s ease-in-out infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	@keyframes pulse-r {
		0%, 100% { opacity: 0.12; }
		50% { opacity: 0.25; }
	}

	@keyframes pulse-d {
		0%, 100% { opacity: 0.06; transform: scale(0.9); }
		50% { opacity: 0.15; transform: scale(1.1); }
	}

	@keyframes grow-l {
		0%, 100% { opacity: 0.05; transform: scale(0.85); }
		50% { opacity: 0.12; transform: scale(1); }
	}
</style>

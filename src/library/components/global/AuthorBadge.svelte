<script lang="ts">
	let {
		name = 'mlhoutel',
		href = 'https://github.com/mlhoutel'
	}: {
		name?: string;
		href?: string;
	} = $props();

	const avatarUrl = `https://github.com/${name}.png?size=96`;
	let loaded = $state(false);
</script>

<a
	{href}
	class="author-badge group"
	target="_blank"
	rel="noreferrer"
	title={name}
>
	<!-- Esoteric ornament ring around avatar -->
	<div class="author-ornament">
		<svg viewBox="0 0 48 48" class="ornament-svg">
			<circle cx="24" cy="24" r="23" fill="none" stroke="#D4A017" stroke-width="0.5" opacity="0.2" />
			<circle cx="24" cy="24" r="20" fill="none" stroke="#D4A017" stroke-width="0.4" opacity="0.15" stroke-dasharray="2 3" />
			<line x1="24" y1="0" x2="24" y2="3" stroke="#D4A017" stroke-width="0.4" opacity="0.25" />
			<line x1="24" y1="45" x2="24" y2="48" stroke="#D4A017" stroke-width="0.4" opacity="0.25" />
			<line x1="0" y1="24" x2="3" y2="24" stroke="#D4A017" stroke-width="0.4" opacity="0.25" />
			<line x1="45" y1="24" x2="48" y2="24" stroke="#D4A017" stroke-width="0.4" opacity="0.25" />
			<circle cx="6" cy="6" r="0.6" fill="#D4A017" opacity="0.2" />
			<circle cx="42" cy="6" r="0.6" fill="#D4A017" opacity="0.2" />
			<circle cx="6" cy="42" r="0.6" fill="#D4A017" opacity="0.2" />
			<circle cx="42" cy="42" r="0.6" fill="#D4A017" opacity="0.2" />
		</svg>

		<!-- Loading placeholder — tiny orbiting planet -->
		{#if !loaded}
			<div class="loading-planet">
				<svg viewBox="0 0 24 24" class="planet-loader">
					<circle cx="12" cy="12" r="3" fill="#D4A017" opacity="0.3" />
					<circle cx="12" cy="12" r="8" fill="none" stroke="#D4A017" stroke-width="0.5" opacity="0.15" />
					<circle cx="12" cy="4" r="1.2" fill="#D4A017" opacity="0.5" class="orbit-dot" />
				</svg>
			</div>
		{/if}

		<!-- Avatar image -->
		<img
			src={avatarUrl}
			alt={name}
			class="author-avatar"
			class:loaded
			loading="lazy"
			onload={() => loaded = true}
		/>
	</div>
	<span class="author-name">{name}</span>
</a>

<style>
	.author-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		transition: all 0.2s;
	}

	.author-ornament {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		/* Responsive size: 36px mobile, 44px desktop */
		width: 36px;
		height: 36px;
	}

	@media (min-width: 768px) {
		.author-ornament {
			width: 44px;
			height: 44px;
		}
	}

	.ornament-svg {
		position: absolute;
		inset: -6px;
		width: calc(100% + 12px);
		height: calc(100% + 12px);
		transition: transform 0.6s ease;
	}

	.author-badge:hover .ornament-svg {
		transform: rotate(30deg);
	}

	.author-avatar {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		position: relative;
		border: 1.5px solid rgba(212, 160, 23, 0.25);
		transition: border-color 0.2s, opacity 0.4s;
		opacity: 0;
		object-fit: cover;
	}

	.author-avatar.loaded {
		opacity: 1;
	}

	.author-badge:hover .author-avatar {
		border-color: rgba(212, 160, 23, 0.6);
	}

	.loading-planet {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.planet-loader {
		width: 60%;
		height: 60%;
	}

	.orbit-dot {
		animation: orbit 1.5s linear infinite;
		transform-origin: 12px 12px;
	}

	@keyframes orbit {
		from { transform: rotate(0deg) translateX(0); }
		to { transform: rotate(360deg) translateX(0); }
	}

	/* The orbit-dot needs to rotate around center */
	:global(.orbit-dot) {
		animation: orbit-around 1.5s linear infinite;
	}

	@keyframes orbit-around {
		from { transform: rotate(0deg); transform-origin: 12px 12px; }
		to { transform: rotate(360deg); transform-origin: 12px 12px; }
	}

	.author-name {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.03em;
		color: var(--color-text-muted);
		transition: color 0.2s;
	}

	.author-badge:hover .author-name {
		color: var(--color-accent);
	}
</style>

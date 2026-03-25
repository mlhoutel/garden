<script lang="ts">
	let {
		name = 'mlhoutel',
		href = 'https://github.com/mlhoutel',
		avatar = 'https://avatars.githubusercontent.com/u/57music?v=4',
		size = 32
	}: {
		name?: string;
		href?: string;
		avatar?: string;
		size?: number;
	} = $props();

	// GitHub avatar URL — use the actual user ID endpoint for reliability
	const avatarUrl = `https://github.com/${name}.png?size=${size * 2}`;
</script>

<a
	{href}
	class="author-badge group"
	target="_blank"
	rel="noreferrer"
	title={name}
>
	<!-- Esoteric ornament ring around avatar -->
	<div class="author-ornament" style="width: {size + 12}px; height: {size + 12}px;">
		<svg viewBox="0 0 48 48" class="ornament-svg">
			<!-- Outer ring -->
			<circle cx="24" cy="24" r="23" fill="none" stroke="#D4A017" stroke-width="0.5" opacity="0.2" />
			<!-- Inner dashed ring -->
			<circle cx="24" cy="24" r="20" fill="none" stroke="#D4A017" stroke-width="0.4" opacity="0.15" stroke-dasharray="2 3" />
			<!-- Cardinal ticks -->
			<line x1="24" y1="0" x2="24" y2="3" stroke="#D4A017" stroke-width="0.4" opacity="0.25" />
			<line x1="24" y1="45" x2="24" y2="48" stroke="#D4A017" stroke-width="0.4" opacity="0.25" />
			<line x1="0" y1="24" x2="3" y2="24" stroke="#D4A017" stroke-width="0.4" opacity="0.25" />
			<line x1="45" y1="24" x2="48" y2="24" stroke="#D4A017" stroke-width="0.4" opacity="0.25" />
			<!-- Diagonal dots -->
			<circle cx="6" cy="6" r="0.6" fill="#D4A017" opacity="0.2" />
			<circle cx="42" cy="6" r="0.6" fill="#D4A017" opacity="0.2" />
			<circle cx="6" cy="42" r="0.6" fill="#D4A017" opacity="0.2" />
			<circle cx="42" cy="42" r="0.6" fill="#D4A017" opacity="0.2" />
		</svg>
		<!-- Avatar image -->
		<img
			src={avatarUrl}
			alt={name}
			class="author-avatar"
			style="width: {size}px; height: {size}px;"
			loading="lazy"
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
	}

	.ornament-svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		transition: transform 0.6s ease;
	}

	.author-badge:hover .ornament-svg {
		transform: rotate(30deg);
	}

	.author-avatar {
		border-radius: 50%;
		position: relative;
		border: 1.5px solid rgba(212, 160, 23, 0.25);
		transition: border-color 0.2s;
	}

	.author-badge:hover .author-avatar {
		border-color: rgba(212, 160, 23, 0.6);
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

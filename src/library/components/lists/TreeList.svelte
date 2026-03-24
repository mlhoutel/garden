<script lang="ts">
	import { toAnchor } from '$utils/format.js';
	import TreeListItem from '$components/lists/TreeListItem.svelte';
	import type { NestedListItem, Page } from '$types/types';

	function isPage(obj: any): obj is Page {
		return obj && typeof obj.path === 'string';
	}

	let { depth = 0, items }: {
		depth?: number;
		items: NestedListItem[] | NestedListItem;
	} = $props();

	let item = $derived(!Array.isArray(items) && isPage(items) ? items : undefined);

	const ornaments = [
		'✦ ─ ✧ ─ ◆ ─ ✧ ─ ✦',
		'◇ ── ✦ ── ◇',
		'✧ ─ ◇ ─ ✧',
		'─ ✦ ─',
	];
</script>

{#if item}
	<TreeListItem {item} />
{:else if Array.isArray(items)}
	<section>
		{#each items as theme, i (`${i}_${theme.label}`)}
			{#if theme.label}
				<div class="group-header" style="--depth: {depth};">
					{#if depth === 0}
						<div class="ornament-line">
							<span class="ornament-side"></span>
							<span class="ornament-center">{ornaments[0]}</span>
							<span class="ornament-side"></span>
						</div>
						<h2 id={toAnchor(theme.label)} class="section-title depth-0">
							{theme.label}
						</h2>
					{:else if depth === 1}
						<div class="ornament-line small">
							<span class="ornament-side"></span>
							<span class="ornament-center">{ornaments[1]}</span>
							<span class="ornament-side"></span>
						</div>
						<h3 id={toAnchor(theme.label)} class="section-title depth-1">
							{theme.label}
						</h3>
					{:else if depth === 2}
						<div class="ornament-line small">
							<span class="ornament-center">{ornaments[2]}</span>
						</div>
						<h4 id={toAnchor(theme.label)} class="section-title depth-2">
							{theme.label}
						</h4>
					{:else if depth === 3}
						<h5 id={toAnchor(theme.label)} class="section-title depth-3">
							{theme.label}
						</h5>
					{/if}
				</div>
			{/if}

			{#each theme.items ?? [] as subItem, j (`${j}_${subItem.label}`)}
				<svelte:self items={subItem} depth={depth + 1} />
			{/each}
		{/each}
	</section>
{/if}

<style>
	.group-header {
		text-align: center;
		margin-top: 3.5rem;
		margin-bottom: 1.5rem;
	}

	.group-header:first-child {
		margin-top: 1.5rem;
	}

	/* Ornament line with ruled sides */
	.ornament-line {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
	}

	.ornament-line.small {
		gap: 0.5rem;
		margin-bottom: 0.35rem;
	}

	.ornament-side {
		flex: 1;
		height: 1px;
		background: linear-gradient(
			to var(--side-dir, right),
			transparent,
			var(--color-accent) 30%,
			var(--color-accent) 70%,
			transparent
		);
		opacity: 0.4;
	}

	.ornament-center {
		color: var(--color-accent);
		font-size: 0.75rem;
		letter-spacing: 0.3em;
		opacity: 0.7;
		flex-shrink: 0;
	}

	.ornament-line.small .ornament-center {
		font-size: 0.65rem;
		letter-spacing: 0.25em;
		opacity: 0.55;
	}

	/* Section titles */
	.section-title {
		color: var(--color-text);
		font-variant: small-caps;
		letter-spacing: 0.1em;
		font-weight: 700;
		line-height: 1.2;
	}

	.depth-0 {
		font-size: 2rem;
	}

	.depth-1 {
		font-size: 1.5rem;
	}

	.depth-2 {
		font-size: 1.25rem;
	}

	.depth-3 {
		font-size: 1.1rem;
	}

	@media (min-width: 768px) {
		.depth-0 { font-size: 2.5rem; }
		.depth-1 { font-size: 1.75rem; }
		.depth-2 { font-size: 1.5rem; }
		.depth-3 { font-size: 1.25rem; }

		.group-header {
			margin-top: 4.5rem;
			margin-bottom: 2rem;
		}
	}
</style>

<script>
	import ContentItem from '$components/lists/ContentItem.svelte';
	import { toAnchor } from '$utils/format.js';

	export let depth = 0;
	export let items;
	export let label;
</script>

{#if Array.isArray(items)}
	<section>
		{#each items as theme}
			{#if theme.label}
				{#if depth == 0}
					<h2 id={toAnchor(theme.label)} class="text-4xl font-bold tracking-widest">
						{theme.label}
					</h2>
				{:else if depth == 1}
					<h3 id={toAnchor(theme.label)} class="text-3xl font-bold tracking-widest">
						{theme.label}
					</h3>
				{:else if depth == 2}
					<h4 id={toAnchor(theme.label)} class="text-2xl font-bold tracking-widest">
						{theme.label}
					</h4>
				{:else if depth == 3}
					<h5 id={toAnchor(theme.label)} class="text-xl font-bold tracking-widest">
						{theme.label}
					</h5>
				{/if}
			{/if}

			{#each theme.items as item}
				<svelte:self items={item} {label} depth={depth + 1} />
			{/each}
		{/each}
	</section>
{:else}
	<ContentItem item={items} {label} />
{/if}

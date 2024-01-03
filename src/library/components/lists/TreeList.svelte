<script>
	import { toAnchor } from '$utils/format.js';
	import ListItemGeneric from '$components/lists/ListItemGeneric.svelte';

	export let depth = 0;
	export let items;
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
				<svelte:self items={item} depth={depth + 1} let:item>
					<slot {item}>
						<ListItemGeneric {item} />
					</slot>
				</svelte:self>
			{/each}
		{/each}
	</section>
{:else}
	<slot item={items}>
		<ListItemGeneric item={items} />
	</slot>
{/if}

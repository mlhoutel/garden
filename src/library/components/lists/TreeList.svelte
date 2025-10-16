<script lang="ts">
	import { toAnchor } from '$utils/format.js';
	import ListItemGeneric from '$components/lists/ListItemGeneric.svelte';
	import type { NestedListItem, ArticleItem } from '$types/types';

	function isArticleItem(obj: any): obj is ArticleItem {
		return obj && typeof obj.path === 'string' && 'meta' in obj;
	}

	export let depth: number = 0;
	export let items: NestedListItem[] | NestedListItem;

	let item: ArticleItem | undefined;

	if (!Array.isArray(items) && isArticleItem(items)) {
		item = items; // safe now
	}
</script>

{#if item}
	<slot {item}>
		<ListItemGeneric {item} />
	</slot>
{:else if Array.isArray(items)}
	<section>
		{#each items as theme, i (`${i}_${theme.label}`)}
			{#if theme.label}
				{#if depth === 0}
					<h2 id={toAnchor(theme.label)} class="text-3xl font-bold tracking-widest md:text-4xl">
						{theme.label}
					</h2>
				{:else if depth === 1}
					<h3 id={toAnchor(theme.label)} class="text-2xl font-bold tracking-widest md:text-3xl">
						{theme.label}
					</h3>
				{:else if depth === 2}
					<h4 id={toAnchor(theme.label)} class="text-xl font-bold tracking-widest md:text-2xl">
						{theme.label}
					</h4>
				{:else if depth === 3}
					<h5 id={toAnchor(theme.label)} class="text-lg font-bold tracking-widest md:text-xl">
						{theme.label}
					</h5>
				{/if}
			{/if}

			{#each theme.items ?? [] as item, i (`${i}_${item.label}`)}
				<svelte:self items={item} depth={depth + 1} let:item>
					<slot {item}>
						<ListItemGeneric {item} />
					</slot>
				</svelte:self>
			{/each}
		{/each}
	</section>
{/if}

<script lang="ts">
	import TreeList from '$components/lists/TreeList.svelte';
	import { toUpper } from '$utils/format';
	import type { SectionLoadReturn, NestedListItem } from '$types/types';

	export let data: SectionLoadReturn;

	// Navigation tree for the section
	$: items = data.tree ?? ([] as NestedListItem[]);

	// Page title: from first page metadata or fallback to section name
	$: title = data.title || toUpper(data.section ?? 'Content');
</script>

<article>
	<h1>{title}</h1>

	{#if items.length > 0}
		<TreeList {items} />
	{:else}
		<p>No content available in this section.</p>
	{/if}
</article>

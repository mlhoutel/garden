<script>
	import TreeList from '$components/lists/TreeList.svelte';
	import { toUpper } from '$utils/format';

	export let data;

	// Navigation tree for the section
	$: items = data.tree ?? [];

	// Page title: from first page metadata or fallback to section name
	$: title = data.title || toUpper(data.section || 'Content');
</script>

<article>
	<h1>{title}</h1>

	{#if items.length > 0}
		<TreeList {items} />
	{:else}
		<p>No content available in this section.</p>
	{/if}
</article>

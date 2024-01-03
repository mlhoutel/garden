<script>
	import TreeList from '$components/lists/TreeList.svelte';

	export let data;

	const items = data.tree ?? [];
</script>

<article>
	<h1>Sheets</h1>

	<TreeList {items} />
</article>

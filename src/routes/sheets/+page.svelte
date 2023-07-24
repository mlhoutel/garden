<script>
	import ContentList from '$components/lists/ContentList.svelte';

	export let data;

	const items = data.tree ?? [];
	const label = 'Continue reading »';
</script>

<article>
	<h1>Sheets</h1>

	<ContentList {items} {label} />
</article>

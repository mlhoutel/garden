<script>
	import ContentList from '$components/lists/ContentList.svelte';

	export let data;

	const items = data.tree ?? [];
	const label = 'Go to sheet »';
</script>

<article>
	<h1>Sheets</h1>

	<ContentList {items} {label} />
</article>

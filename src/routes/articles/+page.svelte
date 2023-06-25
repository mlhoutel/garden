<script>
	import ContentList from '$components/lists/ContentList.svelte';

	export let data;

	const items = data.years ?? [];
	const label = 'Continue reading »';
</script>

<article>
	<h1>Articles</h1>

	<ContentList {items} {label} />
</article>

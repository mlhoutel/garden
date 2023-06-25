<script>
	import ContentList from '$components/lists/ContentList.svelte';

	export let data;

	const years = data.years ?? [];

	// converted for ContentList component
	const items = years.map((i) => ({
		label: i.date,
		items: i.articles.map((e) => ({
			...e,
			title: e.meta.title,
			topic: e.meta.topic,
			short: e.meta.short
		}))
	}));

	const label = 'Continue reading »';
</script>

<article>
	<h1>Articles</h1>

	<ContentList {items} {label} />
</article>

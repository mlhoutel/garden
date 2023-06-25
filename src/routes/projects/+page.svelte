<script>
	import ContentList from '$components/lists/ContentList.svelte';

	export let data;

	const items = [
		{
			label: 'Demos',
			items: data.projects.map((e) => {
				return {
					...e,
					title: e.meta.title,
					short: e.meta.short,
					topic: e.meta.topic
				};
			})
		}
	];

	const label = 'Go to project »';
</script>

<article class="content">
	<h1>Projects</h1>

	<ContentList {items} {label} />
</article>

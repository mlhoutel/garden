<script>
	import ContentList from '$components/lists/ContentList.svelte';

	export let data;

	const items = data.tree ?? [];
	const label = 'Continue reading »';
</script>

<div class="content">
	<article>
		<h1>Projects</h1>

		<ContentList {items} {label} />
	</article>
</div>

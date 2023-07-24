<script>
	import ContentList from '$components/lists/ContentList.svelte';
	import { base } from '$app/paths';

	export let data;

	const items = data.years ?? [];
	const label = 'Continue reading »';
</script>

<article>
	<h1>Articles</h1>

	<div class="md:inline-flex block">
		<div>
			<ContentList {items} {label} />
		</div>
	</div>
</article>

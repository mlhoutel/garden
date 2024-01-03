<script>
	import TreeList from '$components/lists/TreeList.svelte';
	import ListItemArticle from '$components/lists/ListItemArticle.svelte';

	export let data;

	const items = data.years ?? [];
</script>

<article>
	<h1>Articles</h1>

	<div class="md:inline-flex block">
		<div>
			<TreeList {items} let:item>
				<ListItemArticle {item} />
			</TreeList>
		</div>
	</div>
</article>

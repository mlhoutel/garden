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
		<div class="hidden md:block mr-10 flex-col border-r-[1px]">
			<div class="py-2 px-3 sticky top-0 h-auto">
				{#each items as item}
					<div>
						<a href="{base}/articles#{item.label}">{item.label}</a>
					</div>
				{/each}
			</div>
		</div>
		<div>
			<ContentList {items} {label} />
		</div>
	</div>
</article>

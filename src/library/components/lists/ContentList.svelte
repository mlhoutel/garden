<script>
	import ContentItem from '$components/lists/ContentItem.svelte';
	import { toAnchor } from '$utils/format.js';

	export let items;
	export let label;
</script>

<div>
	{#each items as topic}
		<section>
			<h2 id={toAnchor(topic.label)} class="text-4xl font-bold tracking-widest">{topic.label}</h2>

			{#each topic.items as item}
				<ContentItem {item} {label} />
			{/each}
		</section>
	{/each}
</div>

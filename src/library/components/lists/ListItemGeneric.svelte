<script lang="ts">
	import TopicPill from '$components/global/TopicPill.svelte';
	import type { ArticleItem, NestedListItem } from '$types/types';

	export let item: ArticleItem;
</script>

<div class="mb-5 mt-2">
	<div class="block md:inline-flex">
		<a
			data-sveltekit-preload-code="hover"
			href={item.path?.startsWith('/') ? item.path : '/' + item.path}
			class="horizontal-underline-animated text-clip whitespace-nowrap font-serif text-2xl transition-all dark:hover:[text-shadow:2px_2px_1px_black,2px_2px_1px_black,3px_3px_1px_black] md:w-auto md:text-3xl"
		>
			{item.meta?.title}
		</a>

		<div class="pills md:pl-3 md:pt-[5px]">
			{#if item.meta?.topic}
				{#each item.meta.topic.split(' ') as topic, i (i)}
					<TopicPill {topic} />
				{/each}
			{/if}
		</div>
	</div>

	<p class="pb-3 pt-0 text-sm">
		{item.meta?.short}...
	</p>

	<a
		data-sveltekit-preload-code="hover"
		href={item.path?.startsWith('/') ? item.path : '/' + item.path}
		class="underline-animated-block px-1 text-base"
	>
		✦ Explore content
	</a>
</div>

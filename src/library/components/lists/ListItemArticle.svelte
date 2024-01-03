<script>
	import TopicPill from '$components/global/TopicPill.svelte';

	export let item;
</script>

<a data-sveltekit-preload-code="hover" href={item.path}>
	<div class="block md:inline-flex">
		<h2 class="md:w-auto whitespace-nowrap text-clip">{item.meta.title}</h2>

		<div class="pills md:pt-[22px] md:pl-3">
			{#if item.meta.topic}
				{#each item.meta.topic.split(' ') as topic}
					<TopicPill {topic} />
				{/each}
			{/if}
		</div>
	</div>

	<p class="pt-0 text-sm">
		{item.meta.short}...
	</p>

	<p class="pt-1 text-sm">
		[ {item.meta.words} words / {Math.ceil(item.meta.words / 160)} minutes read ]
	</p>

	<p class="px-1 py-2 text-base hover:underline">✦ Read article</p>
</a>

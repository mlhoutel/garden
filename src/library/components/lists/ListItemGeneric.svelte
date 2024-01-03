<script>
	import TopicPill from '$components/global/TopicPill.svelte';

	export let item;
</script>

<a data-sveltekit-preload-code="hover" href={item.path}>
	<div class="block md:inline-flex">
		<h3 class="md:w-auto whitespace-nowrap text-clip">{item.meta.title}</h3>

		<div class="pills md:pt-[22px] md:pl-3">
			{#if item.meta.topic}
				{#each item.meta.topic.split(' ') as topic}
					<TopicPill {topic} />
				{/each}
			{/if}
		</div>
	</div>

	{#if item.meta.short}
		<p class="pt-0 text-sm">
			{item.meta.short}
		</p>
	{/if}
</a>

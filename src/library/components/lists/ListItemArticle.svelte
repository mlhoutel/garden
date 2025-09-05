<script>
	import TopicPill from '$components/global/TopicPill.svelte';

	export let item;
</script>

<div class="mt-2 mb-5">
	<div class="block md:inline-flex">
		<a
			data-sveltekit-preload-code="hover"
			href={item.path.startsWith('/') ? item.path : '/' + item.path}
			class="md:w-auto whitespace-nowrap text-clip text-2xl md:text-3xl font-serif horizontal-underline-animated transition-all dark:hover:[text-shadow:2px_2px_1px_black,2px_2px_1px_black,3px_3px_1px_black]"
		>
			{item.meta.title}
		</a>

		<div class="pills md:pt-[5px] md:pl-3">
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

	<p class="pt-1 pb-2 text-sm">
		[ {item.meta.words} words / {Math.ceil(item.meta.words / 160)} minutes read ]
	</p>

	<a
		data-sveltekit-preload-code="hover"
		href={item.path.startsWith('/') ? item.path : '/' + item.path}
		class="underline-animated-block px-1 text-base"
	>
		✦ Read article
	</a>
</div>

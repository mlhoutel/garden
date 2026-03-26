<script lang="ts">
	import TopicPill from '$components/global/TopicPill.svelte';
	import type { Page } from '$types/types';

	let { item }: { item: Page } = $props();
	let pagePath = $derived((item.path?.startsWith('/') ? item.path : '/' + item.path).replace('.md', ''));
</script>

<a
	data-sveltekit-preload-code="hover"
	href={pagePath}
	class="group block py-4 transition-all duration-200"
	style="border-bottom: 1px solid var(--color-border); text-decoration: none;"
>
	<div class="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-3">
		{#if item?.meta.date}
			<span class="shrink-0 font-mono text-[0.7rem]" style="color: var(--color-text-muted);">
				{new Date(item.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
			</span>
		{/if}
		<span class="font-serif text-[1.25rem] font-bold transition-colors duration-200 group-hover:text-[--color-accent]" style="color: var(--color-text);">
			{item?.meta.title}
		</span>
	</div>

	{#if item?.meta.short}
		<p class="mt-1 text-[0.88rem] leading-relaxed" style="color: var(--color-text-muted);">
			{item.meta.short}
		</p>
	{/if}

	{#if item?.meta.topic}
		<div class="mt-2 flex flex-wrap gap-1">
			{#each item.meta.topic.split(' ').filter(Boolean).slice(0, 5) as topic, i (i)}
				<TopicPill {topic} />
			{/each}
		</div>
	{/if}
</a>

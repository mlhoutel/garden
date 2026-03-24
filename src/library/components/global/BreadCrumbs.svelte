<script lang="ts">
	import type { BreadcrumbItem } from '$types/types';

	let { items = [] }: { items: BreadcrumbItem[] } = $props();
</script>

<div class="inline-flex items-center space-x-1">
	{#each items as item, i (`bread_crumbs_${i}`)}
		<span>
			{#if i === items.length - 1}
				{item.text}
			{:else}
				<a class="underline" href={item.href} data-sveltekit-preload-code="hover">{item.text}</a>
				/
			{/if}
		</span>
	{/each}
</div>

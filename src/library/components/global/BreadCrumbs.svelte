<script lang="ts">
	import type { BreadcrumbItem } from '$types/types';

	export let items: BreadcrumbItem[] = [];
</script>

<div class="inline-flex items-center space-x-1">
	{#each items as item, i}
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

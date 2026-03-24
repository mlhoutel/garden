<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<main class="px-3 pt-[100px] pb-[150px]">
	{@render children()}
</main>

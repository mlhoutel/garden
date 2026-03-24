<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<!-- No .content class -search page manages its own layout for full-bleed sky -->
<main>
	{@render children()}
</main>

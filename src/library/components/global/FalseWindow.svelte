<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="bg-white text-black" style="box-shadow: rgba(0,0,0,0.5) 0px 7px 10px 0px;">
	<div class="inline-flex w-full place-content-end bg-grey px-1 py-1">
		<div class="dot mx-0.5 my-1 bg-lime-300 p-1.5"></div>
		<div class="dot mx-0.5 my-1 bg-amber-300 p-1.5"></div>
		<div class="dot mx-0.5 my-1 bg-red-400 p-1.5"></div>
	</div>

	{@render children()}
</div>

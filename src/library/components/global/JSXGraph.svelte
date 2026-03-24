<script lang="ts">
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import type { JSXGraphProps } from '$types/types';

	let { draw, width = '100%', height = '400px' }: JSXGraphProps = $props();

	const id = uuidv4();

	onMount(async () => {
		const JXG = await import('jsxgraph');
		draw(JXG, id);
	});
</script>

<div {id} class="jxgbox py-3" style="width: {width}; height: {height}"></div>

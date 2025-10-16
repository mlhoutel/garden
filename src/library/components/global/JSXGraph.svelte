<script lang="ts">
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import type { JSXGraphProps } from '$types/types';

	export let draw: JSXGraphProps['draw'];
	export let width: JSXGraphProps['width'] = '100%';
	export let height: JSXGraphProps['height'] = '400px';

	const id = uuidv4();

	onMount(async () => {
		const JXG = await import('jsxgraph');
		draw(JXG, id);
	});
</script>

<div {id} class="jxgbox py-3" style="width: {width}; height: {height}"></div>

<script lang="ts">
	import Loader from '$components/global/Loader.svelte';
	import type { IframeProps } from '$types/types';

	export let src: IframeProps['src'];
	export let title: IframeProps['title'];

	// Styles for the wrapper div
	export let rootStyle: string = '';
	export let rootClass: string = '';

	// Styles for the iframe itself
	export let iframeStyle: string =
		'position: absolute; left: 0; height: 100%; width: 100%; border: none';
	export let iframeClass: string = '';

	let loading = true;
</script>

<div style={rootStyle} class={rootClass}>
	{#if loading}
		<div
			class="background-primary absolute left-0 z-10 flex h-full w-full items-center justify-center"
		>
			<div class="w-[100px]">
				<p class="p-0 pb-1 text-center text-xs">loading...</p>
				<Loader bind:loading />
			</div>
		</div>
	{/if}

	<iframe
		on:load={() => (loading = false)}
		{src}
		{title}
		loading="lazy"
		style={iframeStyle}
		class={iframeClass}
	></iframe>
</div>

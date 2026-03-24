<script lang="ts">
	import Loader from '$components/global/Loader.svelte';
	import type { IframeProps } from '$types/types';

	let {
		src,
		title,
		rootStyle = '',
		rootClass = '',
		iframeStyle = 'position: absolute; left: 0; height: 100%; width: 100%; border: none',
		iframeClass = ''
	}: {
		src: IframeProps['src'];
		title: IframeProps['title'];
		rootStyle?: string;
		rootClass?: string;
		iframeStyle?: string;
		iframeClass?: string;
	} = $props();

	let loading = $state(true);
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
		onload={() => (loading = false)}
		{src}
		{title}
		loading="lazy"
		style={iframeStyle}
		class={iframeClass}
	></iframe>
</div>

<script lang="ts">
	import Loader from '$components/global/Loader.svelte';
	import type { IframeProps } from '$types/types';

	export let src: IframeProps['src'];
	export let title: IframeProps['title'];
	export let fstyle: IframeProps['fstyle'] =
		'position: absolute; left: 0; height: 100%; width: 100%; border: none';
	export let fclass: IframeProps['fclass'] = '';

	let loading = true;
</script>

<div>
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
		style={fstyle}
		class={fclass}
	></iframe>
</div>

<script>
	import Loader from '$components/global/Loader.svelte';
	export let src;
	export let title;

	let loading = true;
</script>

<div>
	{#if loading}
		<div
			class="absolute left-0 w-full h-full z-10 background-primary flex items-center justify-center"
		>
			<div class="w-[100px]">
				<p class="p-0 text-xs text-center pb-1">loading...</p>
				<Loader bind:loading />
			</div>
		</div>
	{/if}

	<iframe
		on:load={() => (loading = false)}
		{src}
		{title}
		loading="lazy"
		style="position: absolute; left: 0; height: 100%; width: 100%; border: none"
	/>
</div>

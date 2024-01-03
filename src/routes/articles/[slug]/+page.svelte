<script>
	export let data;

	import { base } from '$app/paths';

	import IFrame from '$components/global/IFrame.svelte';
</script>

<article>
	{#if data.iframe}
		<div style="height: 100vh; width: 100vw; border: none">
			<IFrame src={data.iframe} title="iframe" />
		</div>

		<div style="height: 50px; width: 100%" />
	{/if}

	<h1>{data.title}</h1>

	<div class="md:flex md:flex-row flex-col pt-5">
		<div class="w-[200px] px-1">
			<a href="https://github.com/mlhoutel" class="text-sm text-orange">mlhoutel</a>
			<span class="text-sm">
				{new Date(data.date).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})}
			</span>
		</div>

		<div class="pills w-full md:justify-end">
			<p class="pill">{data.words} words</p>
			<p class="pill">{Math.round(data.words / 180)} minutes read</p>
		</div>
	</div>

	<div class="py-10 px-1">
		<svelte:component this={data.content} />
	</div>

	<div class="w-full flex space-x-1">
		<a
			href="{base}/articles"
			class="py-5 flex-1 pill text-center text-sm md:text-base rounded-sm truncate"
		>
			<span class="truncate">List of articles</span>
		</a>
		<a
			href="{base}/{data.next?.path}"
			class="py-5 flex-1 pill text-center text-sm md:text-base rounded-sm"
		>
			<span class="truncate">Next: {data.next?.meta?.title}</span>
		</a>
	</div>
</article>

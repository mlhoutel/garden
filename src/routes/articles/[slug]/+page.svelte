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
	<p class="pt-0 px-5">
		<a href="https://github.com/mlhoutel" class="text-sm text-orange">mlhoutel</a>
		<span>
			{new Date(data.date).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			})}
		</span>
	</p>

	<div class="py-10">
		<svelte:component this={data.content} />
	</div>

	<div class="w-full flex space-x-1">
		<a href="{base}/articles" class="py-5 flex-1 pill text-center text-base rounded-sm">
			List of articles
		</a>
		<a href="{base}/{data.next?.path}" class="py-5 flex-1 pill text-center text-base rounded-sm">
			Next: {data.next?.meta?.title}
		</a>
	</div>
</article>

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
			<a href="https://github.com/mlhoutel" class="text-sm underline-animated-block"> mlhoutel </a>
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
			<p class="pill">{Math.ceil(data.words / 160)} minutes read</p>
		</div>
	</div>

	<div class="py-10 px-1">
		<svelte:component this={data.content} />
	</div>

	<div class="w-full flex space-x-3">
		<a
			href="{base}/{data.section}"
			class="underline-animated-block py-1 flex-1 text-center text-sm md:text-base truncate"
			data-sveltekit-preload-code="hover"
		>
			<span class="truncate">⏹ List of {data.section}</span>
		</a>

		{#if data.next}
			<a
				href="{base}/{data.next.path}"
				class="underline-animated-block py-1 flex-1 text-center text-sm md:text-base"
				data-sveltekit-preload-code="hover"
			>
				<span class="truncate">▶ Next: {data.next.meta.title}</span>
			</a>
		{/if}
	</div>
</article>

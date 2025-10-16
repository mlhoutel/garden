<script lang="ts">
	import type { PageMeta } from '$types/types';

	export let data: PageMeta;

	import { base } from '$app/paths';
	import IFrame from '$components/global/IFrame.svelte';
</script>

<article>
	{#if data.iframe}
		<div style="height: 100vh; width: 100vw; border: none">
			<IFrame src={data.iframe} title="iframe" />
		</div>
		<div style="height: 50px; width: 100%"></div>
	{/if}

	<h1>{data.title}</h1>

	<div class="flex-col pt-5 md:flex md:flex-row">
		<div class="w-[200px] px-1">
			<a href="https://github.com/mlhoutel" class="underline-animated-block text-sm"> mlhoutel </a>
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
			<p class="pill">{Math.ceil(data?.words ?? 0 / 160)} minutes read</p>
		</div>
	</div>

	<div class="px-1 py-10">
		{@html data.content}
	</div>

	<div class="flex w-full space-x-3">
		<a
			href="{base}/{data.section}"
			class="underline-animated-block flex-1 truncate py-1 text-center text-sm md:text-base"
			data-sveltekit-preload-code="hover"
		>
			<span class="truncate">⏹ List of {data.section}</span>
		</a>

		{#if data.next}
			<a
				href="{base}/{data.next.path}"
				class="underline-animated-block flex-1 py-1 text-center text-sm md:text-base"
				data-sveltekit-preload-code="hover"
			>
				<span class="truncate">▶ Next: {data.next.meta.title}</span>
			</a>
		{/if}
	</div>
</article>

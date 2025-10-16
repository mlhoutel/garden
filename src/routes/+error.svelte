<script lang="ts">
	import type { Page } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	interface ErrorInfo {
		status: number;
		short: string;
		message: string;
	}

	function preformat(page: Page): ErrorInfo {
		switch (page.status) {
			case 404:
				return {
					status: page.status,
					short: 'Page not found.',
					message: 'The page you are looking for was moved, removed, renamed or never existed.'
				};
			default:
				return {
					status: page.status,
					short: 'Sorry, something went wrong.',
					message: page.error?.message ?? 'Unknown error'
				};
		}
	}

	const { status, short, message } = preformat(get(page));
</script>

<main
	class="flex items-center justify-center px-3 pb-[100px] pt-[100px] md:pb-[300px] md:pt-[300px]"
>
	<div class="flex flex-col justify-center">
		<span class="inline-flex items-center justify-center">
			<h1 class="text-4xl md:text-9xl">{status}</h1>
			<p class="mx-2 h-[50px] w-[1px] border-r-[1px] border-orange md:mx-10 md:h-[130px]"></p>
			<h2 class="text-2xl md:text-6xl">{short}</h2>
		</span>

		<p class="p-5">{message}</p>

		<div class="flex w-full space-x-3">
			<a
				class="underline-animated-block flex-1 truncate py-1 text-center text-sm md:text-base"
				href="/"
				data-sveltekit-preload-code="hover"
			>
				<span class="truncate">⏹ Return Home</span>
			</a>
			<a
				href="https://github.com/mlhoutel/garden/issues"
				class="underline-animated-block flex-1 py-1 text-center text-sm md:text-base"
			>
				<span class="truncate">⚠ Report issue</span>
			</a>
		</div>
	</div>
</main>

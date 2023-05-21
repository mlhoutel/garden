<script>
	import { page } from '$app/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Home, ExclamationTriangle } from '@steeze-ui/heroicons';

	function preformat(page) {
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
					message: page.error.message
				};
		}
	}

	const { status, short, message } = preformat($page);
</script>

<main
	class="flex justify-center items-center px-3 pt-[100px]  md:pt-[300px] pb-[100px] md:pb-[300px]"
>
	<div class="flex flex-col justify-center">
		<div class="inline-flex items-center justify-center">
			<h1 class="text-7xl px-3 border-r-[1px] border-orange mr-4">{status}</h1>
			<h2 class="text-4xl">{short}</h2>
		</div>

		<p class="p-5">{message}</p>

		<div class="inline-flex justify-center">
			<a class="pill text-base mx-1" href="/" data-sveltekit-preload-code="hover">
				<Icon src={Home} class="h-5 w-5 mr-1" />
				Go home
			</a>
			<a class="pill text-base mx-1" href="https://github.com/mlhoutel/garden/issues">
				<Icon src={ExclamationTriangle} class="h-5 w-5 mr-1" />
				Report issue
			</a>
		</div>
	</div>
</main>

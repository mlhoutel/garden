<script>
	import { page } from '$app/stores';

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
	class="flex justify-center items-center px-3 pt-[100px] md:pt-[300px] pb-[100px] md:pb-[300px]"
>
	<div class="flex flex-col justify-center">
		<span class="inline-flex items-center justify-center">
			<h1 class="text-4xl md:text-9xl">{status}</h1>
			<p class="h-[50px] md:h-[130px] w-[1px] border-r-[1px] border-orange mx-2 md:mx-10" />
			<h2 class="text-2xl md:text-6xl">{short}</h2>
		</span>

		<p class="p-5">{message}</p>

		<div class="inline-flex justify-center">
			<a
				class="pill text-sm md:text-base mx-2 pl-3 pr-6 py-5 rounded-sm"
				href="/"
				data-sveltekit-preload-code="hover"
			>
				<i class="material-icons !text-2x mr-3">home</i>
				Return home
			</a>

			<a
				class="pill text-sm md:text-base mx-2 pl-3 pr-6 py-5 rounded-sm"
				href="https://github.com/mlhoutel/garden/issues"
			>
				<i class="material-icons !text-2x mr-3">warning</i>
				Report issue
			</a>
		</div>
	</div>
</main>

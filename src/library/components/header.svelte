<script>
	import { themeStore } from '../utils/theme';

	import { base } from '$app/paths';

	// True for dark, false for light
	let theme;

	themeStore.subscribe((value) => {
		theme = value;
	});

	function updateTheme() {
		themeStore.set(!theme);
		if (theme) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	export function getMenuItems() {
		return [
			{ label: 'Articles', link: `${base}/articles` },
			{ label: 'Sheets', link: `${base}/sheets` },
			{ label: 'Projects', link: `${base}/projects` },
			{ label: 'About', link: `${base}/about` }
		];
	}
</script>

<nav class="background-tertiary flex items-center justify-between flex-wrap">
	<a href="{base}/">
		<div
			class="flex items-center flex-shrink-0 background-secondary px-5 py-2 absolute w-[100px] left-[-6px] top-0 skewed z-30"
		>
			<img
				src="{base}/logos/sumblack.svg"
				alt="logo"
				height="32px"
				width="32px"
				class="h-8 anti-skewed"
			/>

			<div class="absolute left-[55px] top-3 pl-5 flex">
				<div class="background-dark h-8 w-1 mx-0.5" />
				<div class="background-dark h-8 w-2 mx-0.5" />
			</div>
		</div>
	</a>

	<div class="background-dark w-full absolute top-3 h-9 skewed left-[-20px] z-20">
		<div class="anti-skewed text-lg pt-1 mt-10 md:ml-[125px] md:mt-0 overflow-hidden">
			{#each getMenuItems() as item}
				<a
					data-sveltekit-preload-code="hover"
					href={item.link}
					class="background-primary md:background-dark font-serif px-1 py-0.5 w-full md:w-5 block md:inline"
				>
					{item.label}
				</a>
			{/each}
		</div>
	</div>

	<div class="absolute top-3 right-4 h-9 inline-flex bg-grey text-white skewed z-30">
		<button
			class="flex items-center h-auto w-12 anti-skewed"
			aria-label="toggle website theming"
			on:click={updateTheme}
		>
			{#if !theme}
				<i class="material-icons !text-2xl px-2">dark_mode</i>
			{:else}
				<i class="material-icons !text-2xl px-2">light_mode</i>
			{/if}
		</button>
	</div>

	<div class="w-full block pt-12" />
</nav>

<div class="w-full block h-[130px] md:h-0" />

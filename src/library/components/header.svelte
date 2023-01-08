<script>
	import { onMount } from 'svelte';
	import { preferences } from '$utils/store.js';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Sun, Moon} from '@steeze-ui/heroicons';

	import { base } from '$app/paths';

	export function refreshTheme() {
		if (preferences.theme != 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	export function toggleTheme() {
		preferences.theme = preferences.theme != 'dark' ? 'dark' : 'light';
		refreshTheme();
	}

	export let menu = false;
	function clickNavBar() {
		menu = !menu;
	}

	onMount(() => {
		refreshTheme();
	});

	export function getMenuItems() {
		return [
			{ label: "Posts", link: `${base}/posts` },
			{ label: "Sheets", link: `${base}/sheets`},
			{ label: "Snippets", link: `${base}/snippets`},
			{ label: "Projects", link: `${base}/projects` }
		]
	}
</script>

<nav class="background-tertiary flex items-center justify-between flex-wrap">
	<a href="{base}/">
		<div
			class="flex items-center flex-shrink-0 background-secondary px-5 py-2 absolute w-[100px] left-[-6px] top-0 skewed z-30"
		>
			<img src="{base}/logos/sumblack.svg" alt="logo" class="h-8 anti-skewed" />

			<div class="absolute left-[55px] top-3 pl-5 flex">
				<div class="background-dark h-8 w-1 mx-0.5" />
				<div class="background-dark h-8 w-2 mx-0.5" />
			</div>
		</div>
	</a>

	<div class="background-dark w-full absolute top-3 h-9 skewed left-[-20px] z-20">
		<div class="anti-skewed pt-1 mt-10 md:ml-[125px] md:mt-0 overflow-hidden">
			{#each getMenuItems() as item}
				<a href={item.link} class="background-primary md:background-dark font-serif px-1 w-[100%] md:w-5 block md:inline">{item.label}</a>
			{/each}
		</div>
	</div>

	<div class="absolute top-3 right-4 h-9 inline-flex bg-grey text-white skewed z-30">
		<button class="flex items-center h-auto w-12 anti-skewed" on:click={toggleTheme}>
			{#if preferences.theme != 'dark'}
				<Icon src={Moon} theme="solid" class="h-6" />
			{:else}
				<Icon src={Sun} theme="solid" class="h-7" />
			{/if}
		</button>
	</div>

	<div class="w-full block pt-12" />
</nav>

<div class="w-full block h-[130px] md:h-0"></div>

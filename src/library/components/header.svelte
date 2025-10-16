<script lang="ts">
	import type { LinkItem } from '$types/types';
	import { themeStore } from '../utils/theme';
	import { base } from '$app/paths';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let linksItems: LinkItem[] = [];

	// True for dark, false for light
	let theme: boolean;

	let unsubscribe: () => void;

	// Run subscription only on the client
	if (browser) {
		onMount(() => {
			unsubscribe = themeStore.subscribe((value) => {
				theme = value;
				updateDocumentTheme();
			});
		});

		onDestroy(() => {
			if (unsubscribe) unsubscribe();
		});
	}

	function updateTheme() {
		themeStore.set(!theme);
	}

	function updateDocumentTheme() {
		if (!browser) return; // exit if server-side

		if (theme) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<nav id="navbar" class="background-tertiary flex flex-wrap items-center justify-between">
	<a href="{base}/">
		<div
			class="background-secondary skewed absolute left-[-6px] top-0 z-30 flex h-[48px] w-[100px] flex-shrink-0 items-center px-5 py-2"
		>
			<img
				src="{base}/logos/sumblack.svg"
				alt="logo"
				height="32px"
				width="32px"
				class="anti-skewed h-8"
			/>
			<div class="absolute left-[55px] top-3 flex pl-5">
				<div class="background-dark mx-0.5 h-8 w-1"></div>
				<div class="background-dark mx-0.5 h-8 w-2"></div>
			</div>
		</div>
	</a>

	<div
		class="background-transparent md:background-dark md:skewed absolute left-0 top-[13px] z-20 w-full max-w-[100vw] overflow-x-hidden px-3 md:left-[-20px] md:w-full md:px-0"
	>
		<div
			class="md:anti-skewed background-primary md:background-dark mt-10 overflow-hidden pt-[5px] text-lg md:ml-[125px] md:mt-0"
		>
			{#each linksItems as item}
				<a
					data-sveltekit-preload-code="hover"
					href={item.link}
					class=" horizontal-underline-animated block px-1 py-0.5 font-serif transition-all dark:hover:[text-shadow:2px_2px_1px_black,1px_1px_1px_black,2px_2px_1px_black] md:inline md:w-5"
				>
					{item.label}
				</a>
			{/each}
		</div>
	</div>

	<div class="skewed absolute right-4 top-3 z-30 inline-flex h-9 bg-grey text-white">
		<button
			class="anti-skewed flex h-auto w-12 items-center"
			aria-label="toggle website theming"
			on:click={updateTheme}
		>
			{#if !theme}
				<i class="material-icons px-2 !text-2xl">dark_mode</i>
			{:else}
				<i class="material-icons px-2 !text-2xl">light_mode</i>
			{/if}
		</button>
	</div>

	<div class="block w-full pt-12"></div>
</nav>

<div class="block h-[140px] w-full md:h-0"></div>

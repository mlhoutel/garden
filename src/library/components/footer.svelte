<script>
	import { base } from '$app/paths';

	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronUp } from '@steeze-ui/heroicons';
	import { scrollTop } from 'svelte-scrolling';

	let y;

	export function navigateTop() {
		scrollTop();
	}

	const year = new Date().getFullYear();

	export function getFooterItems() {
		return [
			{ label: 'home', link: `${base}/` },
			{ label: 'posts', link: `${base}/posts` },
			{ label: 'sheets', link: `${base}/sheets` },
			{ label: 'snippets', link: `${base}/snippets` },
			{ label: 'projects', link: `${base}/projects` },
			{ label: 'about', link: `${base}/about` }
		];
	}
</script>

<svelte:window bind:scrollY={y} />

{#if y > 50}
	<button
		class="z-30 fixed bottom-10 right-10 background-primary p-2 rounded-full"
		style="box-shadow: rgba(0,0,0,0.5) 0px 3px 5px 0px;"
		aria-label="navigate to the top of the page"
		on:click={navigateTop}
	>
		<Icon src={ChevronUp} size="35px" />
	</button>
{/if}

<div class="background-tertiary w-full bottom-0 py-10 px-5 pointer-events-auto">
	<article class="flex margin-auto">
		<div class="">
			<ul class="list-none underline">
				{#each getFooterItems() as item}
					<li><a class="px-10 text-base" href={item.link}>{item.label}</a></li>
				{/each}
			</ul>
		</div>
		<div class="px-10">
			<h2 class="pt-0">About</h2>
			<p>This website was made with sveltekit / tailwind / mdsvex</p>
		</div>
	</article>

	<div class="flex justify-center pt-10 px-14 flex-col md:flex-row">
		<a
			class="underline px-1"
			href="https://creativecommons.org/licenses/by-sa/3.0/"
			target="_blank"
			rel="noreferrer">COPYLEFT</a
		>
		<span>{year} MAEL LHOUTELLIER</span>
		<a
			class="underline px-1"
			href="https://github.com/mlhoutel/garden"
			target="_blank"
			rel="noreferrer">SOURCE</a
		>
	</div>
</div>

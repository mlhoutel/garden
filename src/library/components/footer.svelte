<script lang="ts">
	import type { LinkItem } from '$types/types';

	export let linksItems: LinkItem[] = [];

	let scrollY = 0;
	const year = new Date().getFullYear();

	export function navigateTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window bind:scrollY />

{#if scrollY > 50}
	<button
		class="background-primary fixed right-10 bottom-10 z-30 cursor-pointer rounded-full"
		style="box-shadow: rgba(0,0,0,0.5) 0px 3px 5px 0px;"
		aria-label="navigate to the top of the page"
		on:click={navigateTop}
	>
		<i class="material-icons p-2 !text-4xl">expand_less</i>
	</button>
{/if}

<div
	class="background-tertiary pointer-events-auto relative bottom-0 w-full overflow-clip px-5 py-10"
>
	<article class="z-30 flex">
		<div class="md:mx-10">
			<h4>Navigation</h4>

			<ul class="list-none">
				{#each linksItems as item (`header_link_${item.link}`)}
					<li class="block text-left">
						<a
							class="underline-animated-block text-base"
							href={item.link}
							data-sveltekit-preload-code="hover"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="px-10">
			<h2 class="pt-0">About</h2>
			<p>This website was made with sveltekit / tailwind / mdsvex</p>
		</div>
	</article>

	<div class="z-30 flex flex-row justify-center px-14 pt-10">
		<a
			class="underline-animated-block mx-2 font-bold"
			href="https://creativecommons.org/licenses/by-sa/3.0/"
			target="_blank"
			rel="noreferrer"
		>
			COPYLEFT
		</a>
		<span>{year} MAEL LHOUTELLIER</span>
		<a
			class="underline-animated-block mx-2 font-bold"
			href="https://github.com/mlhoutel/garden"
			target="_blank"
			rel="noreferrer"
		>
			SOURCE
		</a>
	</div>
	<div class="pointer-events-none absolute inset-0">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xml:space="preserve"
			width="100mm"
			height="100mm"
			viewBox="0 0 100 100"
			class="absolute top-[-10vw] left-[-20vw] h-[60vw] w-[60vw] rotate-45 fill-current text-[#1E262B] opacity-5"
		>
			<g style="display:inline">
				<path
					d="m79.33 36.754-.001-17.892h-58.9v17.892zM22.369 37.64l22.993.005 20.585 12.923-45.326 29.303V61.383L40.217 48.85ZM79.346 80.07l-.005-17.794H49.89L22.49 80.12Z"
					style="fill:#000;fill-opacity:1;stroke:#000;stroke-width:0;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;paint-order:markers stroke fill"
				/>
			</g>
		</svg>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			xml:space="preserve"
			width="100mm"
			height="100mm"
			viewBox="0 0 100 100"
			class="absolute top-[-5vw] left-[40vw] h-[20vw] w-[20vw] -rotate-45 fill-current text-[#1E262B] opacity-5"
		>
			<g style="display:inline">
				<path
					d="m79.33 36.754-.001-17.892h-58.9v17.892zM22.369 37.64l22.993.005 20.585 12.923-45.326 29.303V61.383L40.217 48.85ZM79.346 80.07l-.005-17.794H49.89L22.49 80.12Z"
					style="fill:#000;fill-opacity:1;stroke:#000;stroke-width:0;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;paint-order:markers stroke fill"
				/>
			</g>
		</svg>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			xml:space="preserve"
			width="100mm"
			height="100mm"
			viewBox="0 0 100 100"
			class="absolute top-[25vw] left-[50vw] h-[30vw] w-[30vw] rotate-180 fill-current text-[#1E262B] opacity-5"
		>
			<g style="display:inline">
				<path
					d="m79.33 36.754-.001-17.892h-58.9v17.892zM22.369 37.64l22.993.005 20.585 12.923-45.326 29.303V61.383L40.217 48.85ZM79.346 80.07l-.005-17.794H49.89L22.49 80.12Z"
					style="fill:#000;fill-opacity:1;stroke:#000;stroke-width:0;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;paint-order:markers stroke fill"
				/>
			</g>
		</svg>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			xml:space="preserve"
			width="100mm"
			height="100mm"
			viewBox="0 0 100 100"
			class="absolute top-[-40vw] left-[60vw] h-[70vw] w-[70vw] rotate-210 fill-current text-[#1E262B] opacity-5"
		>
			<g style="display:inline">
				<path
					d="m79.33 36.754-.001-17.892h-58.9v17.892zM22.369 37.64l22.993.005 20.585 12.923-45.326 29.303V61.383L40.217 48.85ZM79.346 80.07l-.005-17.794H49.89L22.49 80.12Z"
					style="fill:#000;fill-opacity:1;stroke:#000;stroke-width:0;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;paint-order:markers stroke fill"
				/>
			</g>
		</svg>
	</div>
</div>

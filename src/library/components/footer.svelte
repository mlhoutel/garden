<script>
	export let linksItems;

	let y;

	export function navigateTop() {
		document.body.scrollIntoView();
	}

	const year = new Date().getFullYear();
</script>

<svelte:window bind:scrollY={y} />

{#if y > 50}
	<button
		class="z-30 fixed bottom-10 right-10 background-primary rounded-full"
		style="box-shadow: rgba(0,0,0,0.5) 0px 3px 5px 0px;"
		aria-label="navigate to the top of the page"
		on:click={navigateTop}
	>
		<i class="material-icons !text-4xl p-2">expand_less</i>
	</button>
{/if}

<div
	class="background-tertiary w-full bottom-0 py-10 px-5 pointer-events-auto relative overflow-clip"
>
	<article class="flex z-30">
		<div class="md:mx-10">
			<h4>Navigation</h4>

			<ul class="list-none">
				{#each linksItems as item}
					<li class="block text-left">
						<a
							class="text-base underline-animated-block"
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

	<div class="z-30 flex justify-center pt-10 px-14 flex-row">
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
	<div class="absolute inset-0 pointer-events-none">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xml:space="preserve"
			width="100mm"
			height="100mm"
			viewBox="0 0 100 100"
			class="absolute left-[-20vw] top-[-10vw] rotate-45 opacity-5 h-[60vw] w-[60vw] text-[#1E262B] fill-current"
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
			class="absolute left-[40vw] top-[-5vw] -rotate-45 opacity-5 h-[20vw] w-[20vw] text-[#1E262B] fill-current"
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
			class="absolute left-[50vw] top-[25vw] rotate-180 opacity-5 h-[30vw] w-[30vw] text-[#1E262B] fill-current"
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
			class="absolute left-[60vw] top-[-40vw] rotate-210 opacity-5 h-[70vw] w-[70vw] text-[#1E262B] fill-current"
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

<script>
	import { onMount } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons';
	import Siema from 'siema';
	import { base } from '$app/paths';

	let siemaRef = undefined;
	let currentIndex = 0;

	function updateCurrentIndex(index) {
		currentIndex = index;
	}
	onMount(() => {
		siemaRef = new Siema({
			perPage: 1,
			startIndex: currentIndex,
			draggable: true,
			loop: true,
			onChange: () => {
				updateCurrentIndex(siemaRef?.currentSlide);
			}
		});
	});

	export let images = [];

	export function imagesIndexs() {
		return [...Array(images.length).keys()];
	}

	export function goPrev() {
		siemaRef?.prev();
	}

	export function goNext() {
		siemaRef?.next();
	}

	export function goTo(index) {
		siemaRef?.goTo(index);
	}
</script>

<div class="container relative overflow-hidden">
	<div class="absolute top-0 left-0 z-20 h-full w-10 flex items-center" on:click={goPrev}>
		<Icon src={ChevronLeft} class="align-middle" size="35px" />
	</div>

	<div class="siema container relative">
		{#each images as image}
			<img
				src="{base}/images/{image}"
				alt="cover"
				class="object-cover object-0 top max-h-[500px] w-full h-full"
			/>
		{/each}
	</div>

	<div class="inline-flex justify-center absolute bottom-0 w-full">
		{#each imagesIndexs() as index}
			<button
				on:click={() => goTo(index)}
				class="dot p-1 m-0.5 {index == currentIndex ? 'bg-white' : 'bg-grey'}"
			/>
		{/each}
	</div>

	<button class="absolute top-0 right-0 z-20 h-full w-10 flex items-center" on:click={goNext}>
		<Icon src={ChevronRight} size="35px" />
	</button>
</div>

<script>
	import { base } from '$app/paths';

	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronUp } from '@steeze-ui/heroicons';
	import { scrollTop } from 'svelte-scrolling';

	let y;

	export function navigateTop() {
		scrollTop();
	}
</script>

<svelte:window bind:scrollY={y} />
<div class="background-tertiary w-full bottom-0 h-[200px] p-5 pointer-events-auto">
	<div class="flex justify-center">©2022</div>
</div>

{#if y > 50}
	<button
		class="z-30 fixed bottom-10 right-10 background-primary p-2 rounded-full"
		style="box-shadow: rgba(0,0,0,0.5) 0px 3px 5px 0px;"
		on:click={navigateTop}
	>
		<Icon src={ChevronUp} size="35px" />
	</button>
{/if}

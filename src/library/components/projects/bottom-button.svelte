<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowLeft, ArrowRight } from '@steeze-ui/heroicons';
	import { base } from '$app/paths';

	export let previous = '';
	export let next = '';
</script>

<div class="pb-20 w-full flex justify-between ">
	<a
		sveltekit:prefetch
		href="{base}/projects/{encodeURIComponent(previous?.short)}"
		class="text-sm sm:text-base"
	>
		<div class="navigation-bottom-button">
			<Icon src={ArrowLeft} theme="solid" size="20px" class="mr-2" />
			<span class="navigation-bottom-button-emphase pl-1">{previous?.title}</span>
		</div>
	</a>

	<a
		sveltekit:prefetch
		href="{base}/projects/{encodeURIComponent(next?.short)}"
		class="text-sm sm:text-base"
	>
		<div class="navigation-bottom-button">
			<span class="navigation-bottom-button-emphase pr-1">{next?.title}</span>

			<Icon src={ArrowRight} theme="solid" size="20px" />
		</div>
	</a>
</div>

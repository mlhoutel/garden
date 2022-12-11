<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Home } from '@steeze-ui/heroicons';
	import { base } from '$app/paths';

	export let url = '';
</script>

<a sveltekit:prefetch href="{base}/{url}">
	<div class="inline-flex items-center button-rounded bg-black text-white m-3">
		<Icon src={Home} theme="solid" size="20px" class="mr-2" />
		Go back to portfolio
	</div>
</a>

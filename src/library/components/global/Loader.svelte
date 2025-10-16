<script lang="ts">
	import type { LoadingBarProps } from '$types/types';

	export let loading: LoadingBarProps['loading'] = false;
</script>

<div class="relative h-[3px] w-full overflow-hidden">
	{#if loading}
		<div
			class="absolute left-0 top-0 h-full bg-orange"
			style={`animation: loading 0.5s ease-out; width: 100%`}
		>
			.
		</div>
	{/if}

	<style>
		@keyframes loading {
			0% {
				width: 0%;
			}
			100% {
				width: 70%;
			}
		}

		@keyframes fadeOut {
			0% {
				opacity: 1;
				width: 70%;
			}
			100% {
				opacity: 0;
				width: 100%;
			}
		}
	</style>
</div>

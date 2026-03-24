<script lang="ts">
	import type { LoadingBarProps } from '$types/types';

	let { loading = $bindable(false) }: { loading?: LoadingBarProps['loading'] } = $props();
</script>

<div class="relative h-[2px] w-full overflow-hidden" style="background-color: rgba(26, 26, 26, 0.95);">
	{#if loading}
		<div
			class="absolute left-0 top-0 h-full"
			style="animation: loading 0.5s ease-out; width: 100%; background-color: #D4A017;"
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

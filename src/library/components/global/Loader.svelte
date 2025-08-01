<script>
	export let loading;
</script>

<div class="w-full h-[3px] relative overflow-hidden">
	{#if loading}
		<div
			class="h-full bg-orange absolute top-0 left-0"
			style={`animation: loading 0.5s ease-out; ${loading ? 'width: 100%' : 'width:100%'}`}
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

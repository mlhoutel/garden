<script>
	export let actions = {};
</script>

<div class="flex flex-col">
	{#each Object.entries(actions) as [action]}
		<button on:click={action.function} class="text-dark">
			{#if typeof action.label == 'string'}
				{action.label}
			{:else}
				<i class="material-icons !text-2xl ml-1">{action.label}</i>
			{/if}
		</button>
	{/each}
</div>

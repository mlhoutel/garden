<script>
	import { base } from '$app/paths';
	import { createEventDispatcher } from 'svelte';

	export let disabled = false;
	export let topic = undefined;
	export let removable = false;

	export const dispatch = createEventDispatcher();
	export function handleClick() {
		dispatch('click', topic);
	}
</script>

{#if !disabled}
	<a href="{base}/search?topics={topic}" rel="noreferrer">
		<button class="pill" on:click={handleClick}>
			#{topic}

			{#if !!removable}
				<i class="material-icons !text-xl ml-1">close</i>
			{/if}
		</button>
	</a>
{:else}
	<div>
		<button class="pill" on:click={handleClick}>
			#{topic}

			{#if !!removable}
				<i class="material-icons !text-xl ml-1">close</i>
			{/if}
		</button>
	</div>
{/if}

<script lang="ts">
	import { base } from '$app/paths';
	import { createEventDispatcher } from 'svelte';
	import type { TopicPillProps } from '$types/types';

	export let disabled: TopicPillProps['disabled'] = false;
	export let topic: TopicPillProps['topic'];
	export let removable: TopicPillProps['removable'] = false;

	const dispatch = createEventDispatcher<{ click: string }>();

	function handleClick() {
		dispatch('click', topic);
	}
</script>

{#if !disabled}
	<a href={`${base}/search?topics=${topic}`} rel="noreferrer">
		<button class="pill hover:underline" on:click={handleClick}>
			#{topic}

			{#if removable}
				<i class="material-icons ml-1 !text-xl">close</i>
			{/if}
		</button>
	</a>
{:else}
	<div>
		<button class="pill" on:click={handleClick}>
			#{topic}

			{#if removable}
				<i class="material-icons ml-1 !text-xl">close</i>
			{/if}
		</button>
	</div>
{/if}

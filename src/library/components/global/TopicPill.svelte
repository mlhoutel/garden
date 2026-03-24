<script lang="ts">
	import { base } from '$app/paths';
	import type { TopicPillProps } from '$types/types';

	let {
		disabled = false as TopicPillProps['disabled'],
		topic,
		removable = false as TopicPillProps['removable'],
		onclick
	}: {
		disabled?: TopicPillProps['disabled'];
		topic: TopicPillProps['topic'];
		removable?: TopicPillProps['removable'];
		onclick?: (topic: string) => void;
	} = $props();

	function handleClick() {
		onclick?.(topic);
	}
</script>

{#if !disabled}
	<a href={`${base}/search?topics=${topic}`} rel="noreferrer">
		<button class="topic-pill" onclick={handleClick}>
			#{topic}

			{#if removable}
				<i class="material-icons ml-1 !text-xl">close</i>
			{/if}
		</button>
	</a>
{:else}
	<div>
		<button class="topic-pill" onclick={handleClick}>
			#{topic}

			{#if removable}
				<i class="material-icons ml-1 !text-xl">close</i>
			{/if}
		</button>
	</div>
{/if}

<style>
	.topic-pill {
		display: inline-flex;
		align-items: center;
		border: 1px solid var(--color-border);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		padding: 2px 8px;
		border-radius: 2px;
		color: var(--color-text-muted);
		letter-spacing: 0.03em;
		background: transparent;
		cursor: pointer;
	}

	.topic-pill:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}
</style>

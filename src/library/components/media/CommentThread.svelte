<script lang="ts">
	import { slide } from 'svelte/transition';
	import ToggleDiamond from '$components/media/ToggleDiamond.svelte';
	import type { MediaComment } from '$types/types';
	import { formatDate } from '$utils/media';

	let {
		comments,
		isAdmin,
		onadd,
		ondelete
	}: {
		comments: MediaComment[];
		isAdmin: boolean;
		onadd: (body: string) => Promise<string | null>;
		ondelete: (cid: string) => Promise<void>;
	} = $props();

	let open = $state(true);
	let draft = $state('');
	let posting = $state(false);
	let error = $state('');
	let confirmId = $state<string | null>(null);
	let resetTimer: ReturnType<typeof setTimeout>;

	async function post(event: SubmitEvent) {
		event.preventDefault();
		if (!draft.trim() || posting) return;
		posting = true;
		error = '';
		const err = await onadd(draft.trim());
		posting = false;
		if (err) error = err;
		else {
			draft = '';
			open = true;
		}
	}

	function askDelete(cid: string) {
		confirmId = cid;
		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => (confirmId = null), 4000);
	}
</script>

<div class="mt-2">
	{#if comments.length > 0}
		<button
			onclick={() => (open = !open)}
			class="flex cursor-pointer items-center gap-1.5 font-mono text-[0.65rem] transition-colors duration-200 hover:text-[--color-accent]"
			style="color: var(--color-text-muted); background: none; border: none; opacity: 0.75;"
		>
			<ToggleDiamond {open} />
			{comments.length} comment{comments.length > 1 ? 's' : ''}
		</button>
	{/if}

	{#if open}
		<div transition:slide={{ duration: 180 }}>
			{#each comments as comment (comment.id)}
				<div class="comment-branch group/comment relative mt-1.5 ml-[3px] pl-4">
					<div class="flex items-baseline gap-2">
						<span
							class="font-mono text-[0.6rem]"
							style="color: var(--color-text-muted); opacity: 0.6;"
						>
							{formatDate(comment.created_at)}
						</span>
						{#if isAdmin}
							{#if confirmId === comment.id}
								<span class="flex items-center gap-1 font-mono text-[0.6rem]">
									<button
										onclick={() => {
											confirmId = null;
											ondelete(comment.id);
										}}
										class="cursor-pointer px-1"
										style="color: #b0413e; border: none; background: none; text-decoration: underline;"
										>delete</button
									>
									<button
										onclick={() => (confirmId = null)}
										class="cursor-pointer px-1"
										style="color: var(--color-text-muted); border: none; background: none; text-decoration: underline;"
										>keep</button
									>
								</span>
							{:else}
								<button
									onclick={() => askDelete(comment.id)}
									class="cursor-pointer font-mono text-[0.6rem] transition-all duration-150 hover:text-[#b0413e] hover:!opacity-100 pointer-fine:opacity-0 pointer-fine:group-hover/comment:opacity-50"
									style="color: var(--color-text-muted); background: none; border: none;"
								>
									delete
								</button>
							{/if}
						{/if}
					</div>
					<p
						class="text-[0.8rem] leading-relaxed whitespace-pre-line"
						style="color: var(--color-text-muted);"
					>
						{comment.body}
					</p>
				</div>
			{/each}

			{#if isAdmin}
				<form
					onsubmit={post}
					class="comment-branch ghost-form relative mt-1.5 ml-[3px] pl-4 {draft ? 'has-draft' : ''}"
				>
					<input
						bind:value={draft}
						placeholder={posting ? 'posting...' : 'add a comment... (enter to post)'}
						disabled={posting}
						class="ghost-input w-full py-1 text-[0.8rem] outline-none"
					/>
					{#if error}
						<p class="font-mono text-[0.65rem]" style="color: #b0413e;">{error}</p>
					{/if}
				</form>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* Hacker News-style thread rail: a vertical line with a small elbow per node. */
	.comment-branch::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: -6px;
		width: 1px;
		background: var(--color-border-strong);
	}

	.comment-branch:last-child::before {
		bottom: auto;
		height: 0.7em;
	}

	.comment-branch::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0.7em;
		width: 9px;
		height: 1px;
		background: var(--color-border-strong);
	}

	/* Ghost add-comment branch: rail and input invisible until the entry row is
	   hovered, the input has focus, or a draft is being typed. */
	.ghost-form {
		opacity: 0;
		transition: opacity 150ms;
	}

	:global(.group:hover) .ghost-form,
	.ghost-form:focus-within,
	.ghost-form.has-draft {
		opacity: 1;
	}

	.ghost-input {
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--color-border);
		color: var(--color-text);
		font-family: var(--font-body);
		transition: border-color 150ms;
	}

	.ghost-input::placeholder {
		color: var(--color-text-muted);
		opacity: 0.6;
	}

	.ghost-input:focus {
		border-bottom-color: var(--color-accent);
	}

	@media (pointer: coarse) {
		.ghost-form {
			opacity: 1;
		}
	}
</style>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import TopicPill from '$components/global/TopicPill.svelte';
	import CommentThread from '$components/media/CommentThread.svelte';
	import type { MediaEntry } from '$types/types';
	import { compactDate } from '$utils/media';

	let {
		entry,
		isAdmin,
		ontopic,
		onedit,
		ondelete,
		onaddcomment,
		ondeletecomment,
		onmarkread
	}: {
		entry: MediaEntry;
		isAdmin: boolean;
		ontopic: (topic: string) => void;
		onedit: (entry: MediaEntry) => void;
		ondelete: (entry: MediaEntry) => Promise<boolean>;
		onaddcomment: (entry: MediaEntry, body: string) => Promise<string | null>;
		ondeletecomment: (entry: MediaEntry, cid: string) => Promise<void>;
		onmarkread?: (entry: MediaEntry) => Promise<void>;
	} = $props();

	let markingRead = $state(false);

	async function markRead() {
		if (!onmarkread || markingRead) return;
		markingRead = true;
		await onmarkread(entry);
		markingRead = false;
	}

	let confirmDelete = $state(false);
	let deleting = $state(false);
	let deleteError = $state(false);
	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout>;
	let copyTimer: ReturnType<typeof setTimeout>;

	let displayUrl = $derived(entry.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''));

	async function copyUrl() {
		try {
			await navigator.clipboard.writeText(entry.url);
			copied = true;
			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copied = false), 1500);
		} catch {
			// clipboard unavailable; the link itself stays selectable
		}
	}

	function askDelete() {
		confirmDelete = true;
		deleteError = false;
		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => (confirmDelete = false), 4000);
	}

	async function confirmedDelete() {
		clearTimeout(resetTimer);
		deleting = true;
		const ok = await ondelete(entry);
		deleting = false;
		confirmDelete = false;
		if (!ok) deleteError = true;
	}
</script>

<div class="group py-4" style="border-bottom: 1px solid var(--color-border);">
	<div class="flex gap-3">
		<div class="flex w-[76px] shrink-0 flex-col gap-0.5 pt-1">
			<span
				class="font-mono text-[0.65rem] whitespace-nowrap"
				style="color: var(--color-text-muted);"
			>
				{compactDate(entry.added_at)}
			</span>
			<span class="font-mono text-[0.6rem]" style="color: var(--color-text-muted); opacity: 0.4;">
				{entry.type}
			</span>
		</div>

		<div class="min-w-0 flex-1">
			<!-- Inline flow: when the title wraps, the author continues on its last line. -->
			<p class="leading-snug">
				{#if entry.url}
					<a
						href={entry.url}
						target="_blank"
						rel="noreferrer"
						class="font-serif text-[1.1rem] font-semibold transition-colors duration-200 hover:text-[--color-accent]"
						style="color: var(--color-text);"
					>
						{entry.title}
					</a>
				{:else}
					<span class="font-serif text-[1.1rem] font-semibold" style="color: var(--color-text);">
						{entry.title}
					</span>
				{/if}
				{#if entry.author}
					<span
						class="ml-1 font-serif text-[0.8rem] whitespace-nowrap italic"
						style="color: var(--color-text-muted); opacity: 0.85;"
					>
						{entry.author}
					</span>
				{/if}
			</p>

			{#if entry.url}
				<span class="flex items-center gap-2">
					<a
						href={entry.url}
						target="_blank"
						rel="noreferrer"
						class="external min-w-0 truncate font-mono text-[0.65rem] font-light transition-colors duration-200 hover:text-[--color-accent]"
						style="color: var(--color-text-muted); opacity: 0.65;"
					>
						{displayUrl}
					</a>
					<button
						onclick={copyUrl}
						title="copy link"
						class="shrink-0 cursor-pointer font-mono text-[0.6rem] transition-all duration-150 hover:!opacity-100 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-50"
						style="color: {copied
							? 'var(--color-accent)'
							: 'var(--color-text-muted)'}; background: none; border: none;"
					>
						{copied ? 'copied ◆' : 'copy'}
					</button>
				</span>
			{/if}

			{#if entry.note}
				<p class="mt-1 text-[0.8rem] leading-relaxed" style="color: var(--color-text-muted);">
					{entry.note}
				</p>
			{/if}

			{#if entry.topics.length > 0}
				<div class="mt-1.5 flex flex-wrap gap-1">
					{#each entry.topics as topic (topic)}
						<TopicPill {topic} disabled onclick={ontopic} />
					{/each}
				</div>
			{/if}

			{#if deleteError}
				<p
					class="mt-1 font-mono text-[0.7rem]"
					style="color: #b0413e;"
					transition:fade={{ duration: 150 }}
				>
					delete failed, try again
				</p>
			{/if}

			{#if entry.comments.length > 0 || isAdmin}
				<CommentThread
					comments={entry.comments}
					{isAdmin}
					onadd={(body) => onaddcomment(entry, body)}
					ondelete={(cid) => ondeletecomment(entry, cid)}
				/>
			{/if}
		</div>

		<span class="flex shrink-0 items-start gap-2 pt-0.5">
			{#if isAdmin && entry.status === 'todo' && onmarkread}
				<button
					onclick={markRead}
					disabled={markingRead}
					class="cursor-pointer rounded px-2 py-1 pt-1 font-mono text-[0.65rem] transition-colors duration-150 disabled:opacity-50"
					style="border: 1px solid var(--color-accent); color: var(--color-accent); background: none;"
				>
					{markingRead ? '...' : '◆ mark read'}
				</button>
			{/if}
			{#if entry.rating && entry.status === 'done'}
				<span class="pt-1.5 text-[0.65rem] tracking-[0.12em]">
					{#each [1, 2, 3, 4, 5] as star (star)}
						<span
							style="color: {entry.rating >= star
								? 'var(--color-accent)'
								: 'var(--color-border-strong)'};">◆</span
						>
					{/each}
				</span>
			{/if}
			{#if isAdmin}
				{#if confirmDelete}
					<span
						class="flex items-center gap-1.5 pt-0.5 font-mono text-[0.7rem]"
						in:fade={{ duration: 150 }}
					>
						<button
							onclick={confirmedDelete}
							disabled={deleting}
							class="cursor-pointer rounded px-2 py-1 disabled:opacity-50"
							style="color: #b0413e; border: 1px solid #b0413e; background: none;"
						>
							{deleting ? '...' : 'delete'}
						</button>
						<button
							onclick={() => (confirmDelete = false)}
							disabled={deleting}
							class="cursor-pointer rounded px-2 py-1"
							style="color: var(--color-text-muted); border: 1px solid var(--color-border); background: none;"
						>
							keep
						</button>
					</span>
				{:else}
					<span
						class="row-actions flex items-center gap-1 pt-1 font-mono text-[0.65rem] transition-opacity duration-200 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100"
						style="color: var(--color-text-muted);"
					>
						<button
							onclick={() => onedit(entry)}
							class="cursor-pointer px-1.5 py-1 transition-colors duration-150 hover:text-[--color-accent]"
							style="background: none; border: none; color: inherit;"
						>
							edit
						</button>
						<span style="opacity: 0.35; font-size: 0.5rem;">◆</span>
						<button
							onclick={askDelete}
							class="cursor-pointer px-1.5 py-1 transition-colors duration-150 hover:text-[#b0413e]"
							style="background: none; border: none; color: inherit;"
						>
							delete
						</button>
					</span>
				{/if}
			{/if}
		</span>
	</div>
</div>

<style>
	/* North-east arrow appended via CSS mask so it inherits the link color. */
	.external::after {
		content: '';
		display: inline-block;
		width: 0.85em;
		height: 0.85em;
		margin-left: 0.2em;
		vertical-align: middle;
		background-color: currentColor;
		-webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M7 17 17 7M17 7H9M17 7v8'/></svg>")
			no-repeat center / contain;
		mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M7 17 17 7M17 7H9M17 7v8'/></svg>")
			no-repeat center / contain;
	}
</style>

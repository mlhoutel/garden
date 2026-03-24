<script lang="ts">
	import type { PageLoadReturn } from '$types/types';

	let { data }: { data: PageLoadReturn } = $props();

	import ArticleView from '$components/views/ArticleView.svelte';
	import SheetView from '$components/views/SheetView.svelte';
	import SnippetView from '$components/views/SnippetView.svelte';
</script>

<svelte:head>
	<title>{data.title} - Garden</title>
	<meta name="description" content={data.short || `${data.title} - ${data.section}`} />
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.short || data.title} />
	<meta property="og:type" content="article" />
</svelte:head>

{#if data.section === 'snippets'}
	<SnippetView {data} />
{:else if data.section === 'sheets'}
	<SheetView {data} />
{:else}
	<ArticleView {data} />
{/if}

<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import type { LinkItem } from '$types/types';
	import '../app.css';

	import 'material-icons/iconfont/material-icons.css';
	import { onMount } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { SITE_URL } from '$utils/site';

	import Header from '$components/header.svelte';
	import Footer from '$components/footer.svelte';
	import Loader from '$components/global/Loader.svelte';

	import type { Snippet } from 'svelte';

	let {
		data,
		children
	}: {
		data: {
			headerLinks: LinkItem[];
			footerLinks: LinkItem[];
		};
		children: Snippet;
	} = $props();

	let loading = $state(false);

	// Pages own their title and description tags. Duplicated meta tags are not
	// deduplicated by the browser and the first one wins, so the layout only
	// carries what is identical on every page.
	let canonical = $derived(`${SITE_URL}${$page.url.pathname.replace(/\/$/, '') || '/'}`);

	onMount(() => {
		if (browser) {
			// Set up navigation loader
			beforeNavigate(() => (loading = true));
			afterNavigate(() => (loading = false));
		}
	});
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon/favicon.png" />
	<link
		rel="alternate"
		type="application/rss+xml"
		title="Garden - Maël Lhoutellier"
		href="{base}/rss.xml"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.css"
		crossorigin="anonymous"
	/>
	<link rel="canonical" href={canonical} />
	<meta name="author" content="Maël Lhoutellier" />
	<meta property="og:site_name" content="Garden" />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<div
	class="flex min-h-screen flex-col"
	style="background-color: var(--color-bg); color: var(--color-text);"
>
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-2"
		style="background-color: var(--color-accent); color: var(--color-text);"
	>
		Skip to content
	</a>

	<Header linksItems={data.headerLinks} />

	<Loader bind:loading />

	<main id="main-content" class="flex-grow">
		{@render children()}
	</main>

	<Footer linksItems={data.footerLinks} />
</div>

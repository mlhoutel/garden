<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import type { LinkItem } from '$types/types';
	import '../app.css';

	import 'material-icons/iconfont/material-icons.css';
	import { onMount } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';

	import Header from '$components/header.svelte';
	import Footer from '$components/footer.svelte';
	import Loader from '$components/global/Loader.svelte';

	import type { Snippet } from 'svelte';

	let { data, children }: {
		data: {
			headerLinks: LinkItem[];
			footerLinks: LinkItem[];
		};
		children: Snippet;
	} = $props();

	let loading = $state(false);

	onMount(() => {
		if (browser) {
			// Set up navigation loader
			beforeNavigate(() => (loading = true));
			afterNavigate(() => (loading = false));

			// Apply initial theme
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const stored = localStorage.getItem('theme');
			const dark = stored === 'true' || (stored == null && prefersDark);

			document.documentElement.classList.toggle('dark', dark);
			localStorage.setItem('theme', String(dark));
		}
	});
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon/favicon.png" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.css"
		crossorigin="anonymous"
	/>
	<title>Garden - Maël Lhoutellier</title>
	<meta name="description" content="A digital garden of thoughts, notes, and reference guides on software engineering, math, and more." />
	<meta name="author" content="Maël Lhoutellier" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Garden" />
	<meta property="og:title" content="Garden - Maël Lhoutellier" />
	<meta property="og:description" content="A digital garden of thoughts, notes, and reference guides." />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<div class="flex min-h-screen flex-col" style="background-color: var(--color-bg); color: var(--color-text);">
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

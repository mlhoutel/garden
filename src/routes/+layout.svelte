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

	export let data: {
		headerLinks: LinkItem[];
		footerLinks: LinkItem[];
	};

	let loading = false;

	onMount(() => {
		// Client-only logic
		if (browser) {
			// ① Load KaTeX stylesheet
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css';
			link.integrity = 'sha384-3UiQGuEI4TTMaFmGIZumfRPtfKQ3trwQE2JgosJxCnGmQpL/lJdjpcHkaaFwHlcI';
			link.crossOrigin = 'anonymous';
			document.head.appendChild(link);

			// ② Set up navigation loader
			beforeNavigate(() => (loading = true));
			afterNavigate(() => (loading = false));

			// ③ Apply initial theme
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
	<title>Garden - Maël Lhoutellier</title>
</svelte:head>

<div class="background-primary flex min-h-screen flex-col">
	<Header linksItems={data.headerLinks} />

	<Loader bind:loading />

	<main class="flex-grow">
		<slot />
	</main>

	<Footer linksItems={data.footerLinks} />
</div>

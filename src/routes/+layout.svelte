<script>
	import '$styles/layout.scss';
	import '$styles/markdown.scss';

	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	import Header from '$components/header.svelte';
	import Footer from '$components/footer.svelte';

	onMount(async () => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css';
		link.integrity = 'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X';
		link.crossOrigin = 'anonymous';

		await new Promise((resolve, reject) => {
			link.onload = resolve;
			link.onerror = reject;
			document.head.appendChild(link);
		});
	});
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon/favicon.png" />
	<title>Garden - Maël Lhoutellier</title>

	<script>
		if (document) {
			if (
				localStorage.theme === 'true' ||
				window.matchMedia('(prefers-color-scheme: dark)').matches
			) {
				document.documentElement.classList.add('dark');
				localStorage.theme = true;
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.theme = false;
			}
		}
	</script>
</svelte:head>

<body class="background-primary">
	<Header />

	<main>
		<slot><!-- content --></slot>
	</main>

	<Footer />
</body>

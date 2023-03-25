<script>
	import '$styles/layout.scss';
	import '$styles/markdown.scss';

	import { base } from '$app/paths';

	import Header from '$components/header.svelte';
	import Footer from '$components/footer.svelte';
</script>

<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
	integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
	crossorigin="anonymous"
/>

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

<script>
	import Home from '$components/portfolio/home.svelte';
	import Resume from '$components/portfolio/resume.svelte';
	import Projects from '$components/portfolio/projects.svelte';
	import Navbar from '$components/portfolio/navbar.svelte';
	import References from '$components/portfolio/references.svelte';
	import Contacts from '$components/portfolio/contacts.svelte';
</script>

<svelte:head>
	<title>Maël Lhoutellier - Portfolio</title>
</svelte:head>

<Home />
<Navbar />
<Resume />
<Projects />
<References />
<Contacts />


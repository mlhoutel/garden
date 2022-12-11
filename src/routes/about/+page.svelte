<script>
	import Home from '$components/about/home.svelte';
	import Resume from '$components/about/resume.svelte';
	import Projects from '$components/about/projects.svelte';
	import Navbar from '$components/about/navbar.svelte';
	import References from '$components/about/references.svelte';
	import Contacts from '$components/about/contacts.svelte';
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

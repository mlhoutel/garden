<script>
  export let data;
  
  import BreadCrumbs from "$components/global/BreadCrumbs.svelte";
  import { page } from '$app/stores';

  $: paths = $page.url.pathname.replaceAll('-', '/').split('/').slice(1)
  $: items = paths.map((e, i) => ({
      href: "/" + paths.slice(0, i + 1).join("/#"),
      text: e
  }))
</script>

<article>
  <BreadCrumbs {items} />

  <h1>{ data.title }</h1>
  <svelte:component this={data.content} />
  
  <BreadCrumbs {items} />
</article>
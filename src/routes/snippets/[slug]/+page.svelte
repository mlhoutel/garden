<script>
  export let data;
  
  import BreadCrumbs from "$components/global/BreadCrumbs.svelte";
  import { page } from '$app/stores';
  import { base } from '$app/paths'

  $: paths = $page.url.pathname
    .replace(base, '')
    .replaceAll('-', '/')
    .split('/')
    .slice(1)

  $: items = paths.map((e, i) => ({
      href: base + "/" + paths.slice(0, i + 1).join("/#"),
      text: e
  }))
</script>

<article>
  <BreadCrumbs {items} />

  <h1>{ data.title }</h1>
  <svelte:component this={data.content} />
  
  <BreadCrumbs {items} />
</article>
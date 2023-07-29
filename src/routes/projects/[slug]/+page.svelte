<script>
	export let data;

	import BreadCrumbs from '$components/global/BreadCrumbs.svelte';
	import { toAnchor, unescapeThemePath } from '$utils/format.js';

	import { page } from '$app/stores';
	import { base } from '$app/paths';

	$: paths = unescapeThemePath($page.url.pathname.replace(base, '')).split('/').slice(1);

	$: items = paths.map((e, i) => {
		let [route, anchor] = paths.slice(0, i + 1);

		return {
			href: base + '/' + route + (anchor ? `/#${toAnchor(anchor)}` : ''),
			text: e
		};
	});
</script>

<article>
	<svelte:component this={data.content} />

	<BreadCrumbs {items} />
</article>

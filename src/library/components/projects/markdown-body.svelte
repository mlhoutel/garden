<script>
	import SvelteMarkdown from 'svelte-markdown';
	export let text = '';
</script>

<div class="p-5">
	<article class="prose prose-md dark:prose-invert">
		<SvelteMarkdown source={text} />
	</article>
</div>

<script>
	export let data;
</script>

<article>
	<h1>{data.title}</h1>
	<p>
		<span class="font-bold">
			{new Date(data.date).toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			})}
		</span>
		<span class="dark:text-orange"> // {data.short}</span>
	</p>

	<div class="py-10">
		<svelte:component this={data.content} />
	</div>
</article>

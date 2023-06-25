<script>
	import ContentItem from '$components/lists/ContentItem.svelte';
	import { searchDecodeUrl, searchEncodeUrl } from '$utils/format.js';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import TechnoSelect from '../../library/components/global/TechnoSelect.svelte';

	const label = 'Continue reading »';

	let results = [];
	let topics = [];
	let filters = {};

	$: {
		if (browser) {
			search($page.url);
		}
	}

	async function search(url) {
		filters = searchDecodeUrl(url, { topics: [], words: [] });

		const response = await fetch(`${base}/api/search?${searchEncodeUrl(filters)}`);

		results = (await response.json())?.results ?? [];

		topics = [...new Set(results.map((e) => e.meta.topic.split(' ')).flat())];
	}

	function topicSelectionChanges(event) {
		filters.topics = [...event.detail];
		goto(`${base}${$page.url.pathname}?${searchEncodeUrl(filters)}`);
	}

	// converted for ContentItem component
	$: items = results.map((e) => ({
		...e,
		title: e.meta.title,
		topic: e.meta.topic,
		short: e.meta.short
	}));

	$: selectedTopics = new Set(filters?.topics ?? []);
</script>

<article>
	<h1>Search</h1>

	<div class="inline-flex">
		<TechnoSelect
			placeholder="Filter topics..."
			options={topics}
			selected={selectedTopics}
			on:change={topicSelectionChanges}
		/>
	</div>

	<p class="text-center content-center text-sm pb-10">
		[ {items.length} entries founds for the current search... ]
	</p>

	{#each items as item}
		<ContentItem {item} {label} />
	{/each}
</article>

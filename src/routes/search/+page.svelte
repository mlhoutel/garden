<script>
	import { searchDecodeUrl, searchEncodeUrl } from '$utils/format.js';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import TopicSelect from '$components/global/TopicSelect.svelte';
	import ContentList from '$components/lists/ContentList.svelte';

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

		// avoid SSR the search query by moving the filtering to the client side
		const response = await fetch(`${base}/api/content`);
		const content = (await response.json())?.content ?? [];

		results = content.filter((e) => {
			const hasTopics = filters.topics.reduce(
				(acc, cur) => acc && e.meta.topic?.includes(cur),
				true
			);
			return hasTopics;
		});

		topics = [...new Set(results.map((e) => e.meta.topic.split(' ')).flat())];
	}

	function topicSelectionChanges(event) {
		filters.topics = [...event.detail];
		goto(`${base}${$page.url.pathname}?${searchEncodeUrl(filters)}`);
	}

	// converted for ContentItem component
	$: items = [{ items: results }];

	$: selectedTopics = new Set(filters?.topics ?? []);
</script>

<article>
	<h1>Search</h1>

	<div class="inline-flex">
		<TopicSelect
			placeholder="Filter topics..."
			options={topics}
			selected={selectedTopics}
			on:change={topicSelectionChanges}
		/>
	</div>

	<p class="text-center content-center text-sm pb-10">
		[ {results.length} entries founds for the current search... ]
	</p>

	<ContentList {items} {label} />
</article>

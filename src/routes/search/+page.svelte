<script>
	import { searchDecodeUrl, searchEncodeUrl } from '$utils/format.js';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	import TopicSelect from '$components/global/TopicSelect.svelte';
	import TreeList from '$components/lists/TreeList.svelte';

	export let data;

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

		const content = data.content ?? [];

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

<article class="min-h-[80vh]">
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

	<TreeList {items} />
</article>

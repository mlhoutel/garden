import type { PageLoad } from './$types';
import type { Page } from '$types/types';
import pagesManifest from '$meta/manifest.json';

export const load: PageLoad = async () => {
	const content = (pagesManifest as Page[]).filter((p) => p.meta.published !== false);

	// Extract all unique topics with counts
	const topicCounts = new Map<string, number>();
	for (const p of content) {
		const topics = p.meta.topic ? p.meta.topic.split(' ').filter(Boolean) : [];
		for (const t of topics) {
			topicCounts.set(t, (topicCounts.get(t) || 0) + 1);
		}
	}

	const topics = Array.from(topicCounts.entries())
		.sort((a, b) => b[1] - a[1])
		.map(([name, count]) => ({ name, count }));

	return { content, topics };
};

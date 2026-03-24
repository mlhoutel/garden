import { json } from '@sveltejs/kit';
import type { Page } from '$types/types';
import { getTopicGraph } from '$utils/graph';
import pagesManifest from '$meta/manifest.json';

export const prerender = true;

export const GET = () => {
	return json(getTopicGraph(pagesManifest as Page[]));
};

import { json } from '@sveltejs/kit';
import { fetchFiles } from '$utils/fetch';

export const GET = async () => {
	const files = import.meta.glob('$content/snippets/**/*.md');
	const snippets = await fetchFiles(files);

	const paths = snippets.map((e) => ({ ...e, path: e.path.slice(2) })); // remove t/ in path

	const sorted = paths.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
	});

	return json(sorted);
};

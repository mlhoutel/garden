import { json } from '@sveltejs/kit';
import { fetchFiles } from '$utils/fetch';

export const GET = async () => {
	const files = import.meta.glob('$content/sheets/**/*.md');
	const sheets = await fetchFiles(files);

	const paths = sheets.map((e) => ({ ...e, path: e.path.slice(2) })); // remove t/ in path

	const sorted = paths.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
	});

	return json(sorted);
};

import { fetchFiles } from '$utils/fetch';
import { escapeThemePath } from '$utils/format';

async function listArticles({ includeDrafts = false } = {}) {
	const files = import.meta.glob('$content/articles/*.md');
	const articles = await fetchFiles(files);

	const paths = await Promise.all(
		articles.map(async (e) => {
			const count = e.html
				.replace(/<[^>]*>/g, '')
				.split(/\s+/)
				.filter((word) => word.length > 0).length;

			return {
				meta: { ...e.meta, words: count },
				path: e.path.slice(2), // remove t/ in path
				file: e.path.slice(2) // remove t/ in path
			};
		})
	);

	const filtered = paths.filter((a) => includeDrafts || a.meta.published !== false);

	const sorted = filtered.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
	});

	return sorted;
}

async function listSheets() {
	const files = import.meta.glob('$content/sheets/**/*.md');
	const sheets = await fetchFiles(files);

	const paths = sheets.map((e) => ({
		...e,
		path: escapeThemePath(e.path.slice(2)), // remove t/ in path
		file: e.path.slice(2)
	}));

	const sorted = paths.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
	});

	return sorted;
}

export { listArticles, listSheets };

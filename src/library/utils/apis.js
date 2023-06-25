import { fetchFiles } from '$utils/fetch';
import { escapeThemePath } from '$utils/format';

async function listArticles() {
	const files = import.meta.glob('$content/articles/*.md');
	const articles = await fetchFiles(files);

	const paths = articles.map((e) => ({
		...e,
		path: e.path.slice(2), // remove t/ in path
		file: e.path.slice(2)
	}));

	const sorted = paths.sort((a, b) => {
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

async function listProjects() {
	const files = import.meta.glob('$routes/projects/*/*.md');
	const projects = await fetchFiles(files);

	const paths = projects.map((e) => ({
		...e,
		path: e.path.slice(1, -6),
		file: e.path.slice(1, -6)
	}));

	return paths;
}

export { listArticles, listProjects, listSheets };

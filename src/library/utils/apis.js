import { fetchFiles } from '$utils/fetch';

async function listPosts() {
	const files = import.meta.glob('$content/posts/*.md');
	const posts = await fetchFiles(files);

	const paths = posts.map((e) => ({ ...e, path: e.path.slice(2) })); // remove t/ in path

	const sorted = paths.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
    });
    
    return sorted;
}

async function listProjects() {
    const files = import.meta.glob('$routes/projects/*/*.md');
	const projects = await fetchFiles(files);

	const paths = projects.map((e) => ({ ...e, path: e.path.slice(1, -6) }));

    return paths;
}

async function listSheets() {
    const files = import.meta.glob('$content/sheets/**/*.md');
	const sheets = await fetchFiles(files);

	const paths = sheets.map((e) => ({ ...e, path: e.path.slice(2) })); // remove t/ in path

	const sorted = paths.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
    });
    
    return sorted;
}

async function listSnippets() {
    const files = import.meta.glob('$content/snippets/**/*.md');
	const snippets = await fetchFiles(files);

	const paths = snippets.map((e) => ({ ...e, path: e.path.slice(2) })); // remove t/ in path

	const sorted = paths.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
    });
    
    return sorted;
}

export { listPosts, listProjects, listSheets, listSnippets };

import { json } from '@sveltejs/kit';
import { fetchFiles } from '$utils/fetch';

export const GET = async () => {
	const files = import.meta.glob('$routes/projects/*/*.md');
	const projects = await fetchFiles(files);

	const paths = projects.map((e) => ({ ...e, path: e.path.slice(1, -6) }));

	return json(paths);
};

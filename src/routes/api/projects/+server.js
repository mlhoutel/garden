import { json } from '@sveltejs/kit';
import { listProjects } from '$utils/apis';

export const GET = async () => {
	return json(await listProjects());
};

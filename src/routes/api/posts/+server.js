import { json } from '@sveltejs/kit';
import { listPosts } from '$utils/apis';

export const GET = async () => {
	return json(await listPosts());
};

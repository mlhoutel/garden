import { json } from '@sveltejs/kit';
import { listArticles } from '$utils/apis';

export const GET = async () => {
	return json(await listArticles());
};

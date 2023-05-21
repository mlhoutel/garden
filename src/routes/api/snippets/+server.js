import { json } from '@sveltejs/kit';
import { listSnippets } from '$utils/apis';

export const GET = async () => {
	return json(await listSnippets());
};

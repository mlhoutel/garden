import { json } from '@sveltejs/kit';
import { listSheets } from '$utils/apis';

export const GET = async () => {
	return json(await listSheets());
};

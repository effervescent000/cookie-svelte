import { json, type RequestEvent } from '@sveltejs/kit';

import PokeAPIService from '../../../../utils/poke-api-service.server.js';
import { wrapData } from '../../../../utils/generic-utils.js';

export const GET = async ({ params }: RequestEvent) => {
	const { slug } = params;
	if (slug) {
		const api = new PokeAPIService();
		const result = await api.getPokemonByName(slug);
		return json(wrapData(result));
	}
};

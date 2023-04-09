import { wrapData } from '../utils/generic-utils';
import PokeAPIService from '../utils/poke-api-service.server';

export const load = async () => {
	const api = new PokeAPIService();
	const response = await api.getAllPokemon();
	return wrapData(response);
};

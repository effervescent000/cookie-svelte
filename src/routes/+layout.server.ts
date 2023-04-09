import { wrapData } from '../utils/generic-utils';
import PokeAPIService from '../utils/poke-api-service.server';

export const load = async () => {
	const api = new PokeAPIService();
	const response = await api.makeGetRequest('/pokemon/?limit=2000');
	return wrapData(response);
};

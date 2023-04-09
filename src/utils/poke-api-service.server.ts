import type { IMoveFull, IPokemonFull, ITypeFull } from '../interfaces';
import type { ResponseUnionType } from '../types';

const pokemonCache: { [name: string]: IPokemonFull } = {};
const moveCache: { [name: string]: IMoveFull } = {};
const typeCache: { [name: string]: ITypeFull } = {};

type CacheObject = typeof pokemonCache | typeof moveCache | typeof typeCache;

const ROOT_URL = 'https://pokeapi.co/api/v2';

const getCacheFromEndpoint = (endpoint: string) => {
	const foundEndpoint = endpoint.match(/pokemon|move|type/);
	if (foundEndpoint) {
		switch (foundEndpoint[0]) {
			case 'pokemon':
				return pokemonCache;
			case 'move':
				return moveCache;
			case 'type':
				return typeCache;
			default:
				return undefined;
		}
	}
};

const tryCacheResult = (cache: CacheObject | undefined, resultToCache: ResponseUnionType) => {
	if (cache) {
		cache[resultToCache.name] = resultToCache;
	}
};

class PokeAPIService {
	async makeGetRequest(endpoint: string) {
		try {
			const cache = getCacheFromEndpoint(endpoint);
			if (cache) {
				// check the cache, if no result found, then ping the API
				const searchTerm = endpoint.match(/(\w+-?)+$/);
				if (searchTerm) {
					const cachedResult = cache[searchTerm[0]];
					if (cachedResult) return cachedResult;
				}
			}
			// there should be a return above, so no need for an else
			// just go straight to the API if there's no cache
			const url = endpoint.includes('https') ? endpoint : `${ROOT_URL}/${endpoint}`;
			const response = await fetch(url);
			const json = await response.json();
			if (!json.results) {
				tryCacheResult(cache, json);
				return json;
			}
			return json.results;
		} catch (error) {
			console.log('error making get request, ', error);
			return undefined;
		}
	}
}

export default PokeAPIService;

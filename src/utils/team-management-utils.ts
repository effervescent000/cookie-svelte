import _ from 'lodash';

import type { IPokemonFull, IPokemonSkeleton, IResourceListItem } from '../typing/interfaces';

import { getActiveProfile, updateActiveProfile } from './profile-utils';
import { BENCH, TEAM } from '../constants/location-constants';

const mergeInto = (location: 'team' | 'bench', target: IPokemonSkeleton) => {
	const { activeProfile } = getActiveProfile();
	const roster = activeProfile.values[location];
	const foundIndex = roster.findIndex((rosterPoke) => rosterPoke.id === target.id);
	if (foundIndex !== -1) {
		roster[foundIndex] = target;
	} else {
		roster.push(target);
	}
	updateActiveProfile(location, roster);
};

export const removeFrom = (location: 'team' | 'bench', target: IPokemonSkeleton) => {
	const { activeProfile } = getActiveProfile();
	const roster = activeProfile.values[location];
	_.remove(roster, (rosterPoke) => rosterPoke.id === target.id);
	updateActiveProfile(location, roster);
};

export const mergeIntoTeam = (target: IPokemonSkeleton) => {
	mergeInto(TEAM, target);
	removeFrom(BENCH, target);
};

export const mergeIntoBench = (target: IPokemonSkeleton) => {
	mergeInto(BENCH, target);
	removeFrom(TEAM, target);
};

export const createNewSkeleton = (target: IResourceListItem | IPokemonFull) => {
	const {
		activeProfile: {
			values: { pokemonIdCounter }
		}
	} = getActiveProfile();
	const skeleton = {
		id: pokemonIdCounter,
		name: target.name,
		moves: { 1: '', 2: '', 3: '', 4: '' }
	};
	updateActiveProfile('pokemonIdCounter', pokemonIdCounter + 1);
	mergeIntoBench(skeleton);
};

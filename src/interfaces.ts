// ****************************
// GENERAL
// ****************************

export interface IResourceListItem {
	name: string;
	url: string;
}

interface IMinimalDataResponse {
	id: number;
	name: string;
}

// ****************************
// THINGS RELATED TO USERS/PROFILE MANAGEMENT
// ****************************

export interface IPokemonSkeleton {
	name: string;
	id: number;
	moves: { [key: number]: string };
}

export interface IProfile {
	name: string;
	values: {
		team: IPokemonSkeleton[];
		bench: IPokemonSkeleton[];
		pokemonIdCounter: number;
		gen: number;
		versionGroup: string;
	};
}

// ****************************
// THE GUTS -- POKEMON STUFF
// ****************************

interface IAbility {
	ability: IResourceListItem;
	is_hidden?: boolean;
	slot?: number;
}

export interface IPokemonFull extends IMinimalDataResponse {
	abilities: IAbility[];
	moves: IMoveForPokemonDetails[];
	order: number;
	past_types: {
		generation: IResourceListItem;
		types: { slot: number; type: IResourceListItem }[];
	}[];
	species: IResourceListItem;
	sprites: {
		front_default: string;
		front_female: string | null;
	};
	stats: IStat[];
	types: { slot: number; type: IResourceListItem }[];
}

interface IStat {
	base_stat: number;
	effort: number;
	stat: IResourceListItem;
}

export interface IMoveForPokemonDetails {
	move: IResourceListItem;
	version_group_details: {
		level_learned_at: number;
		move_learn_method: IResourceListItem;
		version_group: IResourceListItem;
	}[];
}

export interface IMoveFull extends IMinimalDataResponse {
	accuracy: number | null;
	damage_class: IResourceListItem;
	generation: IResourceListItem;
	meta: {
		crit_rate: number | null;
		flinch_chance: number | null;
		max_hits: number | null;
		min_hits: number | null;
	} | null;
	power: number | null;
	pp: number | null;
	type: IResourceListItem;
}

export interface ITypeFull extends IMinimalDataResponse {
	damage_relations: IDamageRelations;
	past_damage_relations: {
		damage_relations: IDamageRelations;
		generation: IResourceListItem;
	}[];
}

interface IDamageRelations {
	double_damage_from: IResourceListItem[];
	double_damage_to: IResourceListItem[];
	half_damage_from: IResourceListItem[];
	half_damage_to: IResourceListItem[];
	no_damage_from: IResourceListItem[];
	no_damage_to: IResourceListItem[];
}

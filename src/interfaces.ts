export interface IResourceListItem {
	name: string;
	url: string;
}

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

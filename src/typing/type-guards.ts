import type { IMoveFull, IPokemonFull, IResourceListItem } from './interfaces';

export const isFullPokemon = (poke: IPokemonFull | IResourceListItem): poke is IPokemonFull =>
	!!(poke as IPokemonFull).moves;

export const isFullMove = (move: IMoveFull | IResourceListItem): move is IMoveFull =>
	!!(move as IMoveFull).generation;

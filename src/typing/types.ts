import type { BENCH, TEAM } from '../constants/location-constants';
import type { IMoveFull, IPokemonFull, ITypeFull } from './interfaces';

export type ResponseUnionType = IPokemonFull | IMoveFull | ITypeFull;

export type TLocationUnionType = typeof TEAM | typeof BENCH;

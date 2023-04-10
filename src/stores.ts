import { writable } from 'svelte/store';

import type { IProfile } from './typing/interfaces';

export const gen = writable(0);
export const versionGroup = writable('');

export const activeProfileId = writable(-1);
export const profileIdCounter = writable(0);
export const profiles = writable<{ [key: number]: IProfile }>({});

export const filters = writable({ name: '', type1: '', type2: '' });

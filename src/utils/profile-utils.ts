import { get } from 'svelte/store';

import { profiles, activeProfileId as activeProfileIdStore } from '../stores';

export const updateActiveProfile = <Type>(key: string, value: Type) => {
	const { activeProfileId, activeProfile } = getActiveProfile();
	profiles.update((existingProfiles) => ({
		...existingProfiles,
		[activeProfileId]: { ...activeProfile, values: { ...activeProfile.values, [key]: value } }
	}));
};

export const getActiveProfile = () => {
	const activeProfileId = get(activeProfileIdStore);
	const activeProfile = get(profiles)[activeProfileId];
	return { activeProfileId, activeProfile };
};

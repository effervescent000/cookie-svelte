import { get } from 'svelte/store';

import { profiles, activeProfileId } from '../stores';

export const updateActiveProfile = <Type>(key: string, value: Type) => {
	const activeProfileIdValue = get(activeProfileId);
	const activeProfile = get(profiles)[activeProfileIdValue];
	profiles.update((existingProfiles) => ({
		...existingProfiles,
		[activeProfileIdValue]: { ...activeProfile, values: { ...activeProfile.values, [key]: value } }
	}));
};

export const getActiveProfile = () => get(profiles)[get(activeProfileId)];

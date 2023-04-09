<script lang="ts">
	// IMPORTS

	import { onDestroy, onMount } from 'svelte';

	import { activeProfileId, gen, profileIdCounter, profiles, versionGroup } from '../stores';

	import '../app.css';

	import GenPickerWrapper from '../components/gen-picker/gen-picker-wrapper.svelte';
	import ProfileWrapper from '../components/profiles/profile-wrapper.svelte';
	import { getActiveProfile } from '../utils/profile-utils';

	// SOME USEFUL CONSTANTS

	const ACTIVE_PROFILE_ID = 'activeProfileId';
	const PROFILE_ID_COUNTER = 'profileIdCounter';
	const PROFILES = 'profiles';

	// LOGIC

	const unsubscribeFuncs: (() => void)[] = [];

	onMount(() => {
		if (typeof window !== 'undefined') {
			activeProfileId.set(+(localStorage.getItem(ACTIVE_PROFILE_ID) || -1));
			profileIdCounter.set(+(localStorage.getItem(PROFILE_ID_COUNTER) || 0));
			profiles.set(JSON.parse(localStorage.getItem(PROFILES) || '{}'));

			unsubscribeFuncs.push(
				...[
					activeProfileId.subscribe((newVal) => {
						if (getActiveProfile()) {
							gen.set($profiles[$activeProfileId].values.gen);
							versionGroup.set($profiles[$activeProfileId].values.versionGroup);
							localStorage.setItem(ACTIVE_PROFILE_ID, newVal.toString());
						}
					}),
					profileIdCounter.subscribe((newVal) =>
						localStorage.setItem(PROFILE_ID_COUNTER, newVal.toString())
					),
					profiles.subscribe((newVal) => localStorage.setItem(PROFILES, JSON.stringify(newVal)))
				]
			);
		}
	});

	onDestroy(() => {
		unsubscribeFuncs.forEach((func) => func());
	});
</script>

<GenPickerWrapper />
<ProfileWrapper />

<slot />

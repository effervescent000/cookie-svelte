<script lang="ts">
	// IMPORTS

	import '../app.css';

	import { onDestroy, onMount } from 'svelte';

	import type { IPokemonFull, IResourceListItem } from '../typing/interfaces';

	import { activeProfileId, gen, profileIdCounter, profiles, versionGroup } from '../stores';

	import { getActiveProfile } from '../utils/profile-utils';

	import GenPickerWrapper from '../components/gen-picker/gen-picker-wrapper.svelte';
	import ProfileWrapper from '../components/profiles/profile-wrapper.svelte';
	import ResultsWrapper from '../components/filters-and-results/results-wrapper.svelte';
	import FiltersAndResultsWrapper from '../components/filters-and-results/filters-and-results-wrapper.svelte';

	// PROPS

	export let data: { data: (IPokemonFull | IResourceListItem)[] };

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

			const { activeProfile } = getActiveProfile();
			if (activeProfile) {
				gen.set(activeProfile.values.gen);
				versionGroup.set(activeProfile.values.versionGroup);
			}

			unsubscribeFuncs.push(
				...[
					activeProfileId.subscribe((newVal) => {
						localStorage.setItem(ACTIVE_PROFILE_ID, newVal.toString());
						if (activeProfile) {
							gen.set(activeProfile.values.gen);
							versionGroup.set($profiles[$activeProfileId].values.versionGroup);
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

<FiltersAndResultsWrapper allPokemon={data.data} />

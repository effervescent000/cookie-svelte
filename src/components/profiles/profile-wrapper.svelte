<script lang="ts">
	import type { IProfile } from '../../typing/interfaces';

	// IMPORTS
	import { profileIdCounter, profiles, activeProfileId } from '../../stores';

	import ProfileCard from './profile-card.svelte';

	// LOGIC
	const addNewProfile = () => {
		const emptyProfile: IProfile = {
			name: '',
			values: {
				team: [],
				bench: [],
				gen: 0,
				versionGroup: '',
				pokemonIdCounter: 0
			}
		};
		profiles.update((profiles) => ({
			...profiles,
			[$profileIdCounter]: emptyProfile
		}));
		activeProfileId.set($profileIdCounter);
		profileIdCounter.update((counter) => counter + 1);
	};
</script>

<div class="flex gap-2" data-testid="profile-wrapper">
	{#each Object.entries($profiles) as [id, profile]}
		<ProfileCard profile={{ id: +id, profile }} />
	{/each}
	<button on:click={addNewProfile} data-testid="new-profile-btn"
		>New profile</button
	>
</div>

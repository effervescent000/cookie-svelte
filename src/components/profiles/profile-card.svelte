<script lang="ts">
	// IMPORTS
	import { activeProfileId } from '../../stores';

	import type { IProfile } from '../../typing/interfaces';

	import { properCase } from '../../utils/generic-utils';

	// LOGIC

	export let profile: { id: number; profile: IProfile };

	let profileVersion = profile.profile.values.versionGroup;

	const setProfileToActive = () => activeProfileId.set(profile.id);
</script>

<div class="mr-2">
	<button
		on:click={setProfileToActive}
		class={`${
			$activeProfileId === profile.id ? 'border-dark-blue' : 'border-white'
		} border-b-2 px-2`}
		data-testid={`profile-${profile.id}`}
	>
		{profile.profile.name || (profileVersion && properCase(profileVersion)) || 'Unnamed profile'}
	</button>
</div>

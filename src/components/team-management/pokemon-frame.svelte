<script lang="ts">
	import { profiles, activeProfileId } from '../../stores';

	import type { TLocationUnionType } from '../../typing/types';

	import { EXPANDED } from '../../constants/general-constants';

	import { properCase } from '../../utils/generic-utils';

	import PokemonCard from './pokemon-card.svelte';

	// PROPS

	export let location: TLocationUnionType;

	$: roster = $profiles[$activeProfileId]?.values[location] || [];
</script>

<div data-testid={`frame-${location}`}>
	<span>{properCase(location)}</span>
	<div
		class="grid min-h-40 min-w-max grid-cols-2 gap-2 border border-light-blue"
	>
		{#each roster as pokemon}
			<PokemonCard {pokemon} {location} size={EXPANDED} />
		{/each}
	</div>
</div>

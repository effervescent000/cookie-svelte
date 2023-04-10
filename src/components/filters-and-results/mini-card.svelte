<script lang="ts">
	import type { IPokemonFull, IResourceListItem } from '../../typing/interfaces';
	import { properCase } from '../../utils/generic-utils';
	import { createNewSkeleton } from '../../utils/team-management-utils';

	// PROPS

	export let pokemon: IResourceListItem | IPokemonFull;
	// export let full;
	// export let hideIcons = false
</script>

<div class="flex w-full justify-between" data-testid={`mini-card-${pokemon.name}`}>
	<span>{properCase(pokemon.name)}</span>
	<div>
		<!-- <i class="fa-solid fa-expand" /> -->
		<i
			class="fa-solid fa-circle-up"
			on:click={() => createNewSkeleton(pokemon)}
			on:keypress={() => createNewSkeleton(pokemon)}
			data-testid={`add-pokemon`}
		/>
	</div>
</div>

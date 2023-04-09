<script lang="ts">
	import type { IPokemonFull, IPokemonSkeleton } from '../../typing/interfaces';

	import { properCase } from '../../utils/generic-utils';

	// PROPS

	export let pokemon: IPokemonSkeleton;

	// STATE

	// let fullPokemon: IPokemonFull;
</script>

<div class="flex" data-testid={`poke-card-${pokemon.name}`}>
	<div>
		<span>
			{properCase(pokemon.name)}
		</span>
		<div>
			<!-- sprites and scoring info goes here -->
		</div>
	</div>
	<div>
		<!-- move selection goes here -->
	</div>
</div>

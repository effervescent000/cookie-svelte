<script lang="ts">
	import { onMount } from 'svelte';

	import type { IPokemonFull, IPokemonSkeleton } from '../../typing/interfaces';
	import type { TLocationUnionType } from '../../typing/types';

	import { properCase } from '../../utils/generic-utils';

	import EditIcons from '../common/edit-icons.svelte';
	import { SMALL, type TCardSize } from '../../constants/general-constants';
	import Sprites from '../common/sprites.svelte';

	// PROPS

	export let pokemon: IPokemonSkeleton;
	export let location: TLocationUnionType;
	export let size: TCardSize = SMALL;

	// STATE

	let fullPokemon: IPokemonFull;

	onMount(async () => {
		const fetchPokemon = async <T>() => {
			const result = await fetch(`/data/pokemon/${pokemon.name}`);
			const json: T = await result.json();
			return json;
		};

		fullPokemon = (await fetchPokemon<{ data: IPokemonFull }>()).data;
	});
</script>

<div class="flex" data-testid={`poke-card-${pokemon.name}`}>
	<div>
		<span>
			{properCase(pokemon.name)}
		</span>
		<div>
			<Sprites pokemon={fullPokemon} {size} />
			<EditIcons {location} {pokemon} />
		</div>
	</div>
	<div>
		<!-- move selection goes here -->
	</div>
</div>

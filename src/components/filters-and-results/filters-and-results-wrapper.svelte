<script lang="ts">
	import _ from 'lodash';
	import { filters, versionGroup } from '../../stores';

	import type { IPokemonFull, IResourceListItem } from '../../typing/interfaces';
	import { isFullPokemon } from '../../typing/type-guards';

	import FiltersWrapper from './filters-wrapper.svelte';
	import ResultsWrapper from './results-wrapper.svelte';

	// PROPS
	export let allPokemon: (IResourceListItem | IPokemonFull)[];

	// STATE

	let thisVersionPokemon: (IResourceListItem | IPokemonFull)[] = [];
	let filteredPokemon: (IResourceListItem | IPokemonFull)[] = [];

	$: {
		thisVersionPokemon = allPokemon.filter((pokemon) => {
			if (isFullPokemon(pokemon)) {
				const moves = pokemon.moves.slice(0, Math.max(Math.round(pokemon.moves.length * 0.2), 5));
				const checkedMoves = moves.map((move) => {
					return !!move.version_group_details.find(
						({ version_group }) => $versionGroup === version_group.name
					);
				});
				return checkedMoves.some((result) => result);
			}
			return true;
		});
	}

	$: {
		const filterPokemon = () => {
			const filteredByName = $filters.name
				? thisVersionPokemon.filter((pokemon) => pokemon.name.includes($filters.name.toLowerCase()))
				: thisVersionPokemon;
			const filteredByType =
				$filters.type2 || $filters.type2
					? thisVersionPokemon.filter(
							(pokemon) =>
								!isFullPokemon(pokemon) ||
								!!pokemon.types.find((type) =>
									[$filters.type1, $filters.type2].includes(type.type.name)
								)
					  )
					: thisVersionPokemon;

			const result = _.intersection(filteredByName, filteredByType);
			return result;
		};
		filteredPokemon = filterPokemon();
	}
</script>

<FiltersWrapper />
<ResultsWrapper filteredOutput={filteredPokemon} />

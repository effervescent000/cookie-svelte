<script lang="ts">
	import { onMount } from 'svelte';

	import { versionGroup } from '../../stores';

	import type { IPokemonFull, IResourceListItem } from '../../typing/interfaces';
	import { isFullPokemon } from '../../typing/type-guards';

	import MiniCard from './mini-card.svelte';

	// PROPS
	export let allPokemon: (IResourceListItem | IPokemonFull)[];

	// STATE
	let windowSize: number;

	$: thisVersionPokemon = allPokemon.filter((pokemon) => {
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

	// LOGIC

	const handleWindowResize = () => {
		windowSize = window.innerWidth;
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			handleWindowResize();

			window.addEventListener('resize', handleWindowResize);
		}

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	});

	const getGridSize = () => {
		if (windowSize <= 1080) {
			return 'grid-cols-5';
		}
		return thisVersionPokemon.length > 20 ? 'grid-cols-8' : 'grid-cols-5';
	};
</script>

<div class={`grid gap-x-10 ${getGridSize()}`}>
	{#each thisVersionPokemon as pokemon}
		<MiniCard {pokemon} />
	{/each}
</div>

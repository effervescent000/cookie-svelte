<script lang="ts">
	import { onMount } from 'svelte';

	import { versionGroup } from '../../stores';

	import type { IPokemonFull, IResourceListItem } from '../../typing/interfaces';
	import { isFullPokemon } from '../../typing/type-guards';

	import MiniCard from './mini-card.svelte';

	// PROPS
	export let filteredOutput: (IResourceListItem | IPokemonFull)[];

	// STATE
	let windowSize: number;

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
		return filteredOutput.length > 20 ? 'grid-cols-8' : 'grid-cols-5';
	};
</script>

<div class={`grid gap-x-10 ${getGridSize()}`}>
	{#each filteredOutput as pokemon}
		<MiniCard {pokemon} />
	{/each}
</div>

<script lang="ts">
	import { EXPANDED, type TCardSize } from '../../constants/general-constants';
	import type { IPokemonFull } from '../../typing/interfaces';

	// PROPS

	export let pokemon: IPokemonFull;
	export let size: TCardSize;

	// LOGIC

	$: defaultSprite = pokemon?.sprites?.front_default;
	$: femaleSprite = pokemon?.sprites?.front_female;
</script>

<div class="flex h-20 justify-center">
	<img src={defaultSprite} alt="Sprite" />
	{#if size === EXPANDED && !!femaleSprite}
		<img src={femaleSprite} alt="Female sprite" />
	{/if}
</div>

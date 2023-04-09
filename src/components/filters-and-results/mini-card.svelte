<script lang="ts">
	import type { IPokemonFull, IResourceListItem } from '../../typing/interfaces';
	import { properCase } from '../../utils/generic-utils';

	// PROPS

	export let pokemon: IResourceListItem | IPokemonFull;
	// export let full;
</script>

<div class="flex w-full justify-between">
	<span>{properCase(pokemon.name)}</span>
</div>

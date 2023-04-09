<script lang="ts">
	// import type { IPokemonSkeleton } from '../../typing/interfaces';
	import { properCase } from '../../utils/generic-utils';

	// PROPS

	export let location: string;
	// export let pokemon: IPokemonSkeleton[]
</script>

<div data-testid={`frame-${location}`}>
	<span>{properCase(location)}</span>
	<div class="grid min-h-40 min-w-max grid-cols-2 gap-2 border border-light-blue">
		Nothing here yet.
	</div>
</div>

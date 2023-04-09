<script lang="ts">
	import { BENCH, TEAM } from '../../constants/location-constants';

	import PokemonFrame from '../../components/team-management/pokemon-frame.svelte';
</script>

<PokemonFrame location={TEAM} />
<PokemonFrame location={BENCH} />

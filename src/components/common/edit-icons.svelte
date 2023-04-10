<script lang="ts">
	import type { TLocationUnionType } from '../../typing/types';

	import { BENCH, TEAM } from '../../constants/location-constants';
	import type { IPokemonSkeleton } from '../../typing/interfaces';
	import { mergeIntoBench, mergeIntoTeam, removeFrom } from '../../utils/team-management-utils';

	// PROPS

	export let location: TLocationUnionType | undefined;
	export let pokemon: IPokemonSkeleton;

	// STATE
	let icons = [{ icon: 'fa-expand', callback: () => {}, testid: 'focus' }];

	$: {
		const newIcons = [{ icon: 'fa-expand', callback: () => {}, testid: 'focus' }];
		if (location) {
			newIcons.push({
				icon: 'fa-trash',
				callback: () => location && removeFrom(location, pokemon),
				testid: 'delete'
			});
			if (location === TEAM) {
				newIcons.push({
					icon: 'fa-circle-arrow-down',
					callback: () => location && mergeIntoBench(pokemon),
					testid: 'team-to-bench'
				});
			} else if (location === BENCH) {
				newIcons.push({
					icon: 'fa-circle-arrow-up',
					callback: () => location && mergeIntoTeam(pokemon),
					testid: 'bench-to-team'
				});
			}
		}
		icons = newIcons;
	}
</script>

<div>
	{#each icons as { icon, callback, testid }}
		<i
			class={`fa-solid ${icon} cursor-pointer`}
			on:click={callback}
			on:keypress={callback}
			data-testid={testid}
		/>
	{/each}
</div>

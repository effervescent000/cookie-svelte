<script lang="ts">
	import { gen, versionGroup } from '../../stores';

	import { VERSIONS } from '../../constants/version-constants';

	import GenHeader from './gen-header.svelte';

	$: foundGen = VERSIONS.find(({ value }) => $gen === value);
	const setSelectedVersion = (value: number | string) => {
		if (typeof value === 'number') {
			gen.set(value);
		} else {
			versionGroup.set(value);
		}
	};
</script>

<div class="flex gap-3">
	{#each VERSIONS as vrs}
		<GenHeader
			version={vrs.name}
			selectedVersion={$gen}
			versionKey={vrs.value}
			setVersion={setSelectedVersion}
		/>
	{/each}
</div>

<div class="flex gap-3">
	{#if foundGen}
		{#each foundGen.children as child}
			<GenHeader
				version={child.name}
				selectedVersion={$versionGroup}
				versionKey={child.key}
				setVersion={setSelectedVersion}
			/>
		{/each}
	{/if}
</div>

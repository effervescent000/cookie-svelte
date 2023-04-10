<script lang="ts">
	import { get } from 'svelte/store';
	import _ from 'lodash';

	import { filters, gen } from '../../stores';

	import { getTypes } from '../../constants/type-constants';
	import { properCase } from '../../utils/generic-utils';

	import TextInput from '../common/text-input.svelte';
	import Select from '../common/select.svelte';

	// STATE
	const filtersData = $filters;

	const typeOptions = getTypes($gen).map(({ key }) => ({ name: properCase(key), value: key }));
</script>

<div class="flex">
	<TextInput
		label="Name"
		testid="name-filter"
		value={filtersData.name}
		callback={_.debounce(
			(value) => filters.update((currentFilters) => ({ ...currentFilters, name: value })),
			250
		)}
	/>
	<Select
		value={filtersData.type1}
		label="Type"
		testid="type-1-filter"
		callback={(value) => filters.update((currentFilters) => ({ ...currentFilters, type1: value }))}
		options={typeOptions}
	/>
	<Select
		value={filtersData.type1}
		testid="type-2-filter"
		callback={(value) => filters.update((currentFilters) => ({ ...currentFilters, type2: value }))}
		options={typeOptions}
	/>
</div>

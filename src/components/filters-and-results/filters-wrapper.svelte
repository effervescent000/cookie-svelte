<script lang="ts">
	import { get } from 'svelte/store';

	import { filters } from '../../stores';

	import TextInput from '../common/text-input.svelte';
</script>

<div class="flex">
	<TextInput
		label="Name"
		testid="name-filter"
		value={get(filters).name}
		callback={(value) =>
			filters.update((currentFilters) => ({ ...currentFilters, name: value }))}
	/>
</div>

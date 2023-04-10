<script lang="ts">
	// PROPS
	export let value: string;
	export let options: { value: string; name: string }[];
	export let label: string = '';
	export let testid: string = '';
</script>

<div>
	{#if label}
		<span>{label}</span>
	{/if}
	<select
		class="m-1 w-44 rounded-md border border-blue bg-gray p-1 text-sm"
		data-testid={testid}
		bind:value
	>
		{#each options as option}
			<option value={option.value}>{option.name}</option>
		{/each}
	</select>
</div>

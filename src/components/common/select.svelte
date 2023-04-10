<script lang="ts">
	// PROPS
	export let value: string;
	export let options: { value: string; name: string }[];
</script>

<select bind:value>
	{#each options as option}
		<option value={option.value}>{option.name}</option>
	{/each}
</select>

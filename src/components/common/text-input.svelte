<script lang="ts">
	// PROPS
	export let value: string;
	export let label: string = '';
	export let testid: string = '';
	// export let onChange: (event: Event & { currentTarget: HTMLInputElement }) => void;
	export let callback: (value: string) => void;
</script>

<div>
	{#if label}
		<span>{label}</span>
	{/if}
	<input
		class={'m-1 w-48 rounded-md border border-light-blue bg-gray p-1'}
		data-testid={testid}
		bind:value
		on:input={(event) => callback(event.currentTarget.value)}
	/>
</div>

<script lang="ts">
	export let version: string;
	export let selectedVersion: number | string;
	export let versionKey: number | string;
	export let setVersion: (value: string | number) => void;
</script>

<button on:click={() => setVersion(versionKey)}>{version}</button>

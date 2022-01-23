<script lang="ts">
	export let value: string;
	export let buffer: Array<string> = [];
	export let action = undefined;

	export function handleBuffer() {
		if (value === "⌫") {
			buffer = [...buffer.slice(0, buffer.length - 1)]
		} else if (value.length === 1 && value.match(/[a-z]/i)) {
			buffer = [...buffer, value];
		}
	}
</script>

<button on:click={action ? action : () => handleBuffer()}>
	{value}
</button>

<style>
  button {
    font-size: 14pt;
  }
</style>

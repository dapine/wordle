<script lang="ts">
	import Key from "./Key.svelte";

	export let buffer: Array<string>;
	export let returnAction;
</script>

<div>
	<div class="key-row">
		<Key value="Q" bind:buffer={buffer} />
		<Key value="W" bind:buffer={buffer} />
		<Key value="E" bind:buffer={buffer} />
		<Key value="R" bind:buffer={buffer} />
		<Key value="T" bind:buffer={buffer} />
		<Key value="Y" bind:buffer={buffer} />
		<Key value="U" bind:buffer={buffer} />
		<Key value="I" bind:buffer={buffer} />
		<Key value="O" bind:buffer={buffer} />
		<Key value="P" bind:buffer={buffer} />
		<Key value="⌫" bind:buffer={buffer} />
	</div>
	<div class="key-row second-row">
		<Key value="A" bind:buffer={buffer} />
		<Key value="S" bind:buffer={buffer} />
		<Key value="D" bind:buffer={buffer} />
		<Key value="F" bind:buffer={buffer} />
		<Key value="G" bind:buffer={buffer} />
		<Key value="H" bind:buffer={buffer} />
		<Key value="J" bind:buffer={buffer} />
		<Key value="K" bind:buffer={buffer} />
		<Key value="L" bind:buffer={buffer} />
		<Key value="⏎" action={returnAction} />
	</div>
	<div class="key-row third-row">
		<Key value="Z" bind:buffer={buffer} />
		<Key value="X" bind:buffer={buffer} />
		<Key value="C" bind:buffer={buffer} />
		<Key value="V" bind:buffer={buffer} />
		<Key value="B" bind:buffer={buffer} />
		<Key value="N" bind:buffer={buffer} />
		<Key value="M" bind:buffer={buffer} />
	</div>
</div>

<style>
	.key-row {
		display: flex;
		flex-direction: row;
		gap: 6px;
	}
	.second-row {
		margin-left: 10px;
	}
	.third-row {
		margin-left: 20px;
	}
</style>

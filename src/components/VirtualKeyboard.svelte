<script lang="ts">
	import KeyComponent from "./Key.svelte";
	import type { Key } from "../lib/game/gameLogic";
	import type { Match } from "../lib/character/character";

	export let buffer: Array<string>;
	export let returnAction: () => void;
	export let usedCharacters: Array<Key>;

	interface KeyMatch {
		value: string
		match: Match
		action?: () => void
	}

	interface KeyRow {
		classes: string
		keys: Array<KeyMatch>
	}

	const mapKeyRow: Record<string, number> = {
		"Q": 0,	
		"W": 0,
		"E": 0,
		"R": 0,
		"T": 0,
		"Y": 0,
		"U": 0,
		"I": 0,
		"O": 0,
		"P": 0,

		"A": 1,
		"S": 1,
		"D": 1,
		"F": 1,
		"G": 1,
		"H": 1,
		"J": 1,
		"K": 1,
		"L": 1,

		"Z": 2,
		"X": 2,
		"C": 2,
		"V": 2,
		"B": 2,
		"N": 2,
		"M": 2
	};

	let keyRows: Array<KeyRow> = [
		{
			classes: "",
			keys: [
				{ value: "Q", match: "Empty" },
				{ value: "W", match: "Empty" },
				{ value: "E", match: "Empty" },
				{ value: "R", match: "Empty" },
				{ value: "T", match: "Empty" },
				{ value: "Y", match: "Empty" },
				{ value: "U", match: "Empty" },
				{ value: "I", match: "Empty" },
				{ value: "O", match: "Empty" },
				{ value: "P", match: "Empty" },
				{ value: "⌫", match: "Empty" },
			]
		},
		{ 
			classes: "second-row",
			keys: [
				{ value: "A", match: "Empty" },
				{ value: "S", match: "Empty" },
				{ value: "D", match: "Empty" },
				{ value: "F", match: "Empty" },
				{ value: "G", match: "Empty" },
				{ value: "H", match: "Empty" },
				{ value: "J", match: "Empty" },
				{ value: "K", match: "Empty" },
				{ value: "L", match: "Empty" },
				{ value: "⏎", match: "Empty", action: returnAction }
			]
		},
		{
			classes: "third-row",
			keys: [
				{ value: "Z", match: "Empty" },
				{ value: "X", match: "Empty" },
				{ value: "C", match: "Empty" },
				{ value: "V", match: "Empty" },
				{ value: "B", match: "Empty" },
				{ value: "N", match: "Empty" },
				{ value: "M", match: "Empty" },
			]
		}
	];

	function updateKeys(keyRows: Array<KeyRow>, usedCharacters: Array<Key>) {
		usedCharacters.forEach((uc: Key) => {
			const rowIndex = mapKeyRow[uc.key];
			const keyIndex = keyRows[rowIndex].keys.findIndex(k => k.value === uc.key);

			let keyUpdated = keyRows[rowIndex].keys[keyIndex];
			keyUpdated = { ...keyUpdated, match: uc.match };

			keyRows[rowIndex].keys[keyIndex] = keyUpdated;
		});

		return keyRows;
	}

	$: keyRows = updateKeys(keyRows, usedCharacters);
</script>

<div>
	{#each keyRows as keyRow }
		<div class={`key-row ${keyRow.classes}`}>
			{#each keyRow.keys as key}
				<KeyComponent value={key.value} match={key.match} bind:buffer={buffer} action={key.action} />
			{/each}
		</div>
	{/each}
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

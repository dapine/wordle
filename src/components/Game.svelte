<script lang="ts">
  import CharacterBox from "./CharacterBox.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";

  import { checkMatches } from "../lib/character/character";
  import { countNonEmpty, makeCellGrid, updateGrid, matchesToCells, GameState, Key, updateKeyboard } from "../lib/game/gameLogic";

  import * as wordleList from "../lib/game/wordleList.json";
  import { randInt } from "../lib/rand/random";

  const wordle = wordleList.wordles[randInt(0, wordleList.wordles.length)];
  console.log(wordle);

  function bufToString(buf: Array<string>) {
    return buf.join("").toLowerCase();
  }

  let cellGrid = makeCellGrid();
  let buffer: Array<string> = [];
  let currentRow: number = 0;
	let gameState: GameState = "Playing";
	let usedCharacters: Array<Key> = [];

  $: guess = bufToString(buffer);
  $: cellGrid = updateGrid(cellGrid, buffer, currentRow, gameState);

  function applyGuess() {
		const matches = checkMatches(guess, wordle).slice(0, 5);
		const cells = matchesToCells(matches, buffer);

		usedCharacters = updateKeyboard(usedCharacters, matches, buffer);

    if (currentRow < 5 && countNonEmpty(cellGrid[currentRow]) === 5) {
      cellGrid = [
        ...cellGrid.slice(0, currentRow),
        cells,
        ...cellGrid.slice(currentRow + 1),
      ];

      currentRow = currentRow + 1;
      buffer = [];

			if (matches.every(m => m === "FullMatch")) {
				gameState = "Win";
			}
    } else if (currentRow === 5) {
      // last try
      cellGrid = [
        ...cellGrid.slice(0, currentRow),
        cells,
        ...cellGrid.slice(currentRow + 1),
      ];

      buffer = [];
			currentRow = currentRow + 1;

			gameState = matches.every(m => m === "FullMatch") ? "Win" : "Lose";
    }
  }
</script>

<div>
	{#if gameState === "Win"}
		<h1>Nice!</h1>
	{/if}
	{#if gameState === "Lose"}
		<h1>Oh no!</h1>
	{/if}
	<div class="grid">
		<div class="container">
			{#each cellGrid as row}
				<div class="row">
					{#each row as cell}
						<CharacterBox character={cell.character} match={cell.match} />
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="container" id="vk">
		<VirtualKeyboard bind:buffer returnAction={() => applyGuess()} usedCharacters={usedCharacters} />
	</div>
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 4px;
		align-items: center;
  }
	#vk {
		margin-top: 20px;
	}
</style>

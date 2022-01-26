<script lang="ts">
  import CharacterBox from "./components/CharacterBox.svelte";
  import VirtualKeyboard from "./components/VirtualKeyboard.svelte";

  import { checkMatches, Character } from "./lib/character/character";
  import { Cell, countNonEmpty, makeCellGrid, GameState } from "./lib/game/gameLogic";

  import * as wordleList from "./lib/game/wordleList.json";
  import { randInt } from "./lib/rand/random";

  const wordle = wordleList.wordles[randInt(0, wordleList.wordles.length)];
  console.log(wordle);

  function bufToString(buf: Array<string>) {
    return buf.join("").toLowerCase();
  }

  function updateGrid(
    cellGrid: Array<Array<Cell>>,
    buffer: Array<string>,
    currentRow: number
  ): Array<Array<Cell>> {
    if (buffer.length <= 5 && gameState === "Playing") {
      const emptyRow = [
        { character: "", match: "Empty" } as Cell,
        { character: "", match: "Empty" } as Cell,
        { character: "", match: "Empty" } as Cell,
        { character: "", match: "Empty" } as Cell,
        { character: "", match: "Empty" } as Cell,
      ];
      const cells = buffer.map((b) => {
        return { character: b, match: "Empty" } as Cell;
      });

      const newRow = cells.concat(emptyRow).slice(0, 5);
      cellGrid[currentRow] = newRow;
    }

    return cellGrid;
  }

  let cellGrid = makeCellGrid();
  let buffer: Array<string> = [];
  let currentRow: number = 0;
	let gameState: GameState = "Playing";

  $: guess = bufToString(buffer);
  $: cellGrid = updateGrid(cellGrid, buffer, currentRow);

  function applyGuess() {
		const matches = checkMatches(guess, wordle).slice(0, 5);
		const cells: Array<Cell> = matches.map((m, i) => {
			return { character: buffer[i] as Character, match: m } as Cell;
		});

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

<main>
	{#if gameState === "Win"}
		<h1>Nice!</h1>
	{/if}
	{#if gameState === "Lose"}
		<h1>Oh no!</h1>
	{/if}
  <div class="container">
    {#each cellGrid as row}
      <div class="row">
        {#each row as cell}
          <CharacterBox character={cell.character} match={cell.match} />
        {/each}
      </div>
    {/each}
  </div>

  <VirtualKeyboard bind:buffer returnAction={() => applyGuess()} />
</main>

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
  }
</style>

<script lang="ts">
  import CharacterBox from "./components/CharacterBox.svelte";
  import VirtualKeyboard from "./components/VirtualKeyboard.svelte";

  import { checkMatches } from "./lib/character/character";
  import { Cell, emptyRow, makeCellGrid } from "./lib/game/gameLogic";

  import * as wordleList from "./lib/game/wordleList.json";
  import { randInt } from "./lib/rand/random";

  const wordle = wordleList.wordles[randInt(0, wordleList.wordles.length)];
  console.log(wordle);

	function bufToString(buf) {
		return buf.join('').toLowerCase();
	}

  let cellGrid = makeCellGrid();
	let buffer: Array<string> = [];
	$: guess = bufToString(buffer);
	$: console.log(guess)

  function applyGuess() {
    for (let i = 0; i < cellGrid.length; i++) {
      const empty = emptyRow(cellGrid[i]);

      if (empty) {
        const matches = checkMatches(guess, wordle);

        const cells: Array<Cell> = matches.map((m, i) => {
          return { character: guess[i], match: m } as Cell;
        });

        cellGrid[i] = cells;
        break;
      } else {
        continue;
      }
    }
  }
</script>

<main>
  <div class="container">
    {#each cellGrid as row}
      <div class="row">
        {#each row as cell}
          <CharacterBox character={cell.character} match={cell.match} />
        {/each}
      </div>
    {/each}
  </div>

	<VirtualKeyboard bind:buffer={buffer} returnAction={applyGuess} />
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

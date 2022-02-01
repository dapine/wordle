import type { Character, Match } from "../character/character";

export type GameState = "Playing" | "Win" | "Lose"

export interface Cell {
  character: Character | '';
  match: Match;
}

export interface Key {
	key: string;
	match: Match;
}

function makeEmptyRow(): Array<Cell> {
	return [
		{ character: "", match: "Empty" } as Cell,
		{ character: "", match: "Empty" } as Cell,
		{ character: "", match: "Empty" } as Cell,
		{ character: "", match: "Empty" } as Cell,
		{ character: "", match: "Empty" } as Cell,
	];
}

export function makeCellGrid(): Array<Array<Cell>> {
  return [makeEmptyRow(), makeEmptyRow(), makeEmptyRow(), makeEmptyRow(), makeEmptyRow(), makeEmptyRow()];
}

export function countNonEmpty(row: Array<Cell>) {
  return row.filter((cell => cell.character !== '')).length;
}

export function matchesToCells(matches: Array<Match>, buffer: Array<string>): Array<Cell> {
	const cells: Array<Cell> = matches.map((m, i) => {
		return { character: buffer[i] as Character, match: m } as Cell;
	});

	return cells;
}

export function updateGrid(
	cellGrid: Array<Array<Cell>>,
	buffer: Array<string>,
	currentRow: number,
	gameState: GameState
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

export function updateKeyboard(usedCharacters: Array<Key>, matches: Array<Match>, buffer: Array<string>): Array<Key> {
	matches.forEach((m: Match, i: number) => {
		const key = buffer[i];
		if (usedCharacters.filter((uc: Key) => uc.key === key).length < 1) {
			usedCharacters = [...usedCharacters, {key: key, match: m} as Key];
		} else {
			const i = usedCharacters.findIndex((uc: Key) => uc.key === key);
			const isFullMatch = usedCharacters[i].match === "FullMatch";
			const isPartialToNotMatch = usedCharacters[i].match === "PartialMatch" && m === "NotMatch";

			if (!isFullMatch && !isPartialToNotMatch) {
				usedCharacters = [
					...usedCharacters.slice(0, i),
					{key: key, match: m} as Key,
					...usedCharacters.slice(i + 1),
				];
			}
		}
	});

	return usedCharacters;
}

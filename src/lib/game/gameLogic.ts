import type { Character, Match } from "../character/character";

export interface Cell {
  character: Character;
  match: Match;
}

export function makeCellGrid(): Array<Array<Cell>> {
  return [
    [{} as Cell, {} as Cell, {} as Cell, {} as Cell, {} as Cell],
    [{} as Cell, {} as Cell, {} as Cell, {} as Cell, {} as Cell],
    [{} as Cell, {} as Cell, {} as Cell, {} as Cell, {} as Cell],
    [{} as Cell, {} as Cell, {} as Cell, {} as Cell, {} as Cell],
    [{} as Cell, {} as Cell, {} as Cell, {} as Cell, {} as Cell],
    [{} as Cell, {} as Cell, {} as Cell, {} as Cell, {} as Cell],
  ]
}

export function emptyRow(row: Array<Cell>) {
  return row.every((r) => !r.character && !r.match);
}
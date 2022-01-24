import type { Character, Match } from "../character/character";

export interface Cell {
  character: Character | '';
  match: Match;
}

export function makeCellGrid(): Array<Array<Cell>> {
  return [
    [{ character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell],
    [{ character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell],
    [{ character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell],
    [{ character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell],
    [{ character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell],
    [{ character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell, { character: '', match: 'Empty' } as Cell],
  ]
}

export function countNonEmpty(row: Array<Cell>) {
  return row.filter((cell => cell.character !== '')).length;
}
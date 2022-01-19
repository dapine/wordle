import { Character, CharacterMatchPositions, checkMatches, makeCharacterMatchPositions, Match } from "../character/character";

test('matches positions without diacritics (desde <=> desde)', () => {
  const wordle = "desde"
  const guess = "desde"

  const expected: Array<CharacterMatchPositions> = [
    { character: 'd', positions: [0, 3] },
    { character: 'e', positions: [1, 4] },
    { character: 's', positions: [2] },
    { character: 'd', positions: [0, 3] },
    { character: 'e', positions: [1, 4] }
  ]

  const matchesPos = guess
    .split("")
    .map((c: Character) => makeCharacterMatchPositions(c, wordle));

  expect(matchesPos).toEqual(expected)
});

test('matches positions with diacritics (cafés <=> cafes)', () => {
  const wordle = "cafés"
  const guess = "cafes"

  const expected: Array<CharacterMatchPositions> = [
    { character: 'c', positions: [0] },
    { character: 'a', positions: [1] },
    { character: 'f', positions: [2] },
    { character: 'e', positions: [3] },
    { character: 's', positions: [4] }
  ]

  const matchesPos = guess
    .split("")
    .map((c: Character) => makeCharacterMatchPositions(c, wordle));

  expect(matchesPos).toEqual(expected)
});

test('matches positions (bolar <=> colar)', () => {
  const wordle = "bolar"
  const guess = "colar"

  const expected: Array<CharacterMatchPositions> = [
    { character: 'c', positions: [] },
    { character: 'o', positions: [1] },
    { character: 'l', positions: [2] },
    { character: 'a', positions: [3] },
    { character: 'r', positions: [4] }
  ]

  const matchesPos = guess
    .split("")
    .map((c: Character) => makeCharacterMatchPositions(c, wordle));

  expect(matchesPos).toEqual(expected)
});

test('check matches: FullMatch (circo <=> circo)', () => {
  const wordle = "circo"
  const guess = "circo"

  const matches = checkMatches(guess, wordle)

  const expected: Array<Match> = [
    "FullMatch",
    "FullMatch",
    "FullMatch",
    "FullMatch",
    "FullMatch"
  ]

  expect(matches).toEqual(expected)
})

test('check matches: PartialMatch (ponte <=> misto)', () => {
  const wordle = "ponte"
  const guess = "misto"

  const matches = checkMatches(guess, wordle)

  const expected: Array<Match> = [
    "NotMatch",
    "NotMatch",
    "NotMatch",
    "FullMatch",
    "PartialMatch"
  ]

  expect(matches).toEqual(expected)
})

test('check matches: NotMatch (monte <=> falta)', () => {
  const wordle = "monte"
  const guess = "falta"

  const matches = checkMatches(guess, wordle)

  const expected: Array<Match> = [
    "NotMatch",
    "NotMatch",
    "NotMatch",
    "FullMatch",
    "NotMatch"
  ]

  expect(matches).toEqual(expected)
})

export { }
export type LatinCharacter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

type LatinCharacterWithDiacritics =
  | "á"
  | "â"
  | "ã"
  | "à"
  | "ç"
  | "é"
  | "ê"
  | "í"
  | "ó"
  | "ô"
  | "õ"
  | "ú";

export type Character = LatinCharacter | LatinCharacterWithDiacritics;

export interface CharacterMatchPositions {
  character: Character;
  positions: Array<number>;
}

// Not match: character not in wordle
// Partital match: character in wordle but not on position
// Full match: character in wordle an in position
export type Match = "NotMatch" | "PartialMatch" | "FullMatch" | "Empty"

function diacriticToPlainLatin(
  character: LatinCharacterWithDiacritics
): LatinCharacter {
  const diacriticsMap: Record<LatinCharacterWithDiacritics, LatinCharacter> =
  {
    á: "a",
    â: "a",
    ã: "a",
    à: "a",
    ç: "c",
    é: "e",
    ê: "e",
    í: "i",
    ó: "o",
    ô: "o",
    õ: "o",
    ú: "u",
  };

  return diacriticsMap[character];
}

function removeDiacritics(character: Character): Character {
  const char = diacriticToPlainLatin(
    character as LatinCharacterWithDiacritics
  );

  return char || character;
}

function charsPositionsInWordle(
  char: Character,
  wordle: string
): Array<number> {
  const wordleArr = wordle.split("");
  let indexes = [];

  for (let i = 0; i < wordleArr.length; i++) {
    const curWordleChar: Character = removeDiacritics(wordleArr[i] as Character);
    if (char === curWordleChar) indexes.push(i);
  }

  return indexes;
}

export function makeCharacterMatchPositions(
  char: Character,
  wordle: string
): CharacterMatchPositions {
  return { character: char, positions: charsPositionsInWordle(char, wordle) };
}

export function checkMatches(guess: string, wordle: string): Array<Match> {
  // XXX: will "guess" chars always be a plain LatinCharacter?
  // should i remove potential diacritics as i do in charsPositionsInWordle?
	let matchesPos = [];
	guess.split("").forEach((c: Character, i: number) => {
		const charPos = makeCharacterMatchPositions(c, wordle);
		const charExistsInMatchesPos = matchesPos.some(mp => mp.character === charPos.character);

		if (charExistsInMatchesPos && !charPos.positions.some(p => p === i)) {
			matchesPos = [...matchesPos, { character: c, positions: [] }];
		} else {
			matchesPos = [...matchesPos, charPos];
		}
	});

  const matches = matchesPos.map((cm, i) =>
    cm.positions.some((p: number) => p === i)
      ? "FullMatch" : cm.positions.length > 0
        ? "PartialMatch" : "NotMatch");

  return matches;
}

<script lang="ts">
  import type { Character, Match } from "../lib/character/character";

  export let character: Character;
  export let match: Match

  export const colorCSSClassMap: Record<Match, string> = {
    FullMatch: 'fullMatch',
    PartialMatch: 'partialMatch',
    NotMatch: 'notMatch'
  }
</script>

<div class={colorCSSClassMap[match]}>{character || ""}</div>

<style>
  :root {
    --width: 5rem;
    --height: 5rem;
  }

  div {
    border: 2px solid #a6a6a6;
    border-radius: 12px;
    width: var(--width);
    height: var(--height);
    text-align: center;
    font-size: 30pt;
    line-height: var(--height);
    color: white;
  }

  .fullMatch {
    background-color: #06d6a0;
  }

  .partialMatch {
    background-color: #ffd166;
  }

  .notMatch {
    background-color: #ef476f;
  }
</style>

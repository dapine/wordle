<script lang="ts">
	export let value: string;
	export let buffer: Array<string> = [];
	export let action = undefined;
	export let match = "Empty";

	export function handleBuffer() {
		if (value === "⌫") {
			buffer = [...buffer.slice(0, buffer.length - 1)]
		} else if (value.length === 1 && value.match(/[a-z]/i)) {
			buffer = [...buffer, value];
		}
	}

  const colorCSSClassMap: Record<Match, string> = {
    FullMatch: 'fullMatch',
    PartialMatch: 'partialMatch',
    NotMatch: 'notMatch',
    Empty: 'empty'
  }
</script>

<button on:click={action ? action : () => handleBuffer()} class={colorCSSClassMap[match]}>
	{value}
</button>

<style>
  button {
    font-size: 14pt;
		border-radius: 10px;
		min-width: 3rem;
		min-height: 3rem;
  }
	/* XXX: this is also used in `CharacterBox` component */
	/* make one unique style instance visible to both components */

  .fullMatch {
    background-color: #06d6a0;
    color: white;
  }

  .partialMatch {
    background-color: #ffd166;
    color: white;
  }

  .notMatch {
    background-color: #ef476f;
    color: white;
  }

  .empty {
    color: black;
  }
</style>

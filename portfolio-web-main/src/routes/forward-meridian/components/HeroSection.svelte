<script lang="ts">
  import GridOverlay from "./GridOverlay.svelte";

  let {
    hasEntered = false,
    mouseX = 0,
    mouseY = 0
  }: {
    hasEntered?: boolean;
    mouseX?: number;
    mouseY?: number;
  } = $props();

  const line1Words = ["SHOOTER", "CAMPAIGN"];
  const line2Words = ["LIKE", "NEVER", "BEFORE"];

  // Helper to compute global character index for staggered delay
  function getCharIndex(lineNum: number, wordIdx: number, charIdx: number): number {
    let offset = 0;
    if (lineNum === 1) {
      for (let w = 0; w < wordIdx; w++) {
        offset += line1Words[w].length;
      }
      return offset + charIdx;
    } else {
      offset = line1Words.reduce((acc, cur) => acc + cur.length, 0);
      for (let w = 0; w < wordIdx; w++) {
        offset += line2Words[w].length;
      }
      return offset + charIdx;
    }
  }
</script>

<section class="hero-section" class:has-entered={hasEntered} id="hero">
  <GridOverlay theme="bright" />

  <!-- Bottom Hero Display Typography: SHOOTER CAMPAIGN LIKE NEVER BEFORE -->
  <!-- Hugs full width and bottom edge without margins, letter-by-letter animated -->
  <div
    class="hero-bottom-typography"
    class:animate-enter={hasEntered}
    role="region"
    aria-label="Shooter Campaign Like Never Before"
  >
    <!-- Line 1: SHOOTER CAMPAIGN -->
    <div class="massive-text-line line-1">
      {#each line1Words as word, wIdx}
        <span class="word-group">
          {#each word.split("") as char, cIdx}
            <span
              class="letter"
              style:--char-i={getCharIndex(1, wIdx, cIdx)}
            >{char}</span>
          {/each}
        </span>
      {/each}
    </div>

    <!-- Line 2: LIKE NEVER BEFORE -->
    <div class="massive-text-line line-2">
      {#each line2Words as word, wIdx}
        <span class="word-group">
          {#each word.split("") as char, cIdx}
            <span
              class="letter"
              style:--char-i={getCharIndex(2, wIdx, cIdx)}
            >{char}</span>
          {/each}
        </span>
      {/each}
    </div>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #07b552;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    user-select: none;
    box-sizing: border-box;
    padding: 0;
  }

  /* Bottom Hero Display Typography: Hugs width and bottom edge without margins */
  .hero-bottom-typography {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    margin: 0;
    padding: 30px 0 0 0; /* Breathing room so tops of letters don't clip */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 25;
    pointer-events: auto;
    overflow: visible; /* Prevents glyph ascenders from being cut off */
  }

  .massive-text-line {
    font-family: "Bigger", sans-serif;
    letter-spacing: -2px; /* Increased from -5px so letters don't collide */
    font-size: clamp(4.8rem, 13.5vw, 16.5rem);
    line-height: 0.88; /* Increased line spacing so lines don't collide */
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    color: #016327;
  }

  .word-group {
    display: inline-flex;
    white-space: nowrap;
  }

  /* Creative Letter-by-Letter Animation */
  .letter {
    display: inline-block;
    opacity: 0;
    transform: translateY(115%) rotateX(-80deg) skewX(-15deg) scale(0.7);
    filter: blur(10px) brightness(2.6);
    color: #00ff88;
    transform-origin: bottom center;
    transition: transform 0.15s ease, color 0.15s ease;
  }

  .animate-enter .letter {
    animation: creativeLetterIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: calc(0.15s + var(--char-i) * 0.03s);
  }

  @keyframes creativeLetterIn {
    0% {
      opacity: 0;
      transform: translateY(115%) rotateX(-80deg) skewX(-15deg) scale(0.7);
      filter: blur(12px) brightness(3);
      color: #00ff88;
      text-shadow: 0 0 25px #00ff88;
    }
    45% {
      opacity: 1;
      transform: translateY(-8%) rotateX(10deg) skewX(5deg) scale(1.04);
      filter: blur(1px) brightness(1.6);
      color: #ebfff0;
      text-shadow: 0 0 16px #00ff88;
    }
    75% {
      opacity: 1;
      transform: translateY(2%) rotateX(-3deg) skewX(-2deg) scale(0.99);
      filter: blur(0px) brightness(1.15);
      color: #028033;
      text-shadow: none;
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotateX(0deg) skewX(0deg) scale(1);
      filter: blur(0px) brightness(1);
      color: #016327;
      text-shadow: none;
    }
  }

  .letter:hover {
    color: #002e12;
    transform: translateY(-8px) scale(1.04);
    filter: drop-shadow(-3px 0 rgba(255, 30, 80, 0.75)) drop-shadow(3px 0 rgba(0, 240, 255, 0.75)) drop-shadow(0 0 14px rgba(0, 255, 120, 0.6));
  }

  @media (max-width: 900px) {
    .massive-text-line {
      font-size: clamp(3rem, 12.5vw, 6rem);
      line-height: 0.92;
      letter-spacing: -1px;
    }
  }
</style>

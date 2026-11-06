<script lang="ts">
  import GridOverlay from "./GridOverlay.svelte";
  import { FACTIONS_DATA } from "../data";
  import { liquidText } from "../utils/liquidScramble";

  let activeIndex = $state(0);
  let activeFaction = $derived(FACTIONS_DATA[activeIndex]);
  let viewTab = $state<"summary" | "dossier">("summary");
  let isDecrypting = $state(false);

  function selectFaction(index: number) {
    if (index === activeIndex) return;
    isDecrypting = true;
    activeIndex = index;
    setTimeout(() => {
      isDecrypting = false;
    }, 200);
  }
</script>

<section class="factions-section" id="factions">
  <GridOverlay theme="factions" />

  <!-- Main Grid Layout -->
  <div class="factions-body">
    <!-- Left Column: Faction List (Vischem, Covenant, Meridian, Asterisk) -->
    <nav class="factions-nav" aria-label="Faction Selector">
      <div class="nav-track">
        {#each FACTIONS_DATA as faction, idx}
          <button
            class="faction-item"
            class:active={idx === activeIndex}
            onclick={() => selectFaction(idx)}
            aria-selected={idx === activeIndex}
            use:liquidText
          >
            <span class="faction-name">{faction.tabLabel}</span>
            {#if idx === activeIndex}
              <span class="active-indicator" aria-hidden="true">■</span>
            {/if}
          </button>
        {/each}
      </div>
    </nav>

    <!-- Center Column: Faction Content (Summary & Story text) -->
    <main class="faction-content">
      <!-- Section Label -->
      <div class="content-header-row">
        <span class="summary-tag">////// Summary</span>
        <div class="view-toggles">
          <button
            class="toggle-btn"
            class:selected={viewTab === "summary"}
            onclick={() => (viewTab = "summary")}
          >
            SUMMARY
          </button>
          <span class="toggle-sep">|</span>
          <button
            class="toggle-btn"
            class:selected={viewTab === "dossier"}
            onclick={() => (viewTab = "dossier")}
          >
            DOSSIER
          </button>
        </div>
      </div>

      <!-- Faction Title (Bigger font with clean letter spacing so letters don't overlap) -->
      <div class="faction-title-wrapper" class:decrypting={isDecrypting}>
        {#if activeFaction.subtitle}
          <div class="title-with-subtitle">
            <h2 class="title-primary">{activeFaction.name}</h2>
            <div class="title-secondary">
              <span>{activeFaction.subtitle.split(" ")[0]}</span>
              <span>{activeFaction.subtitle.split(" ").slice(1).join(" ")}</span>
            </div>
          </div>
        {:else}
          <h2 class="title-primary solo">{activeFaction.name}</h2>
        {/if}
      </div>

      <!-- Faction Text Body (DM Mono font matching Figma) -->
      {#if viewTab === "summary"}
        <div class="faction-text-block" class:decrypting={isDecrypting}>
          {#each activeFaction.summary as paragraph (paragraph)}
            <p class="summary-paragraph" use:liquidText>{paragraph}</p>
          {/each}
        </div>
      {:else}
        <!-- Extended Dossier View -->
        <div class="dossier-grid" class:decrypting={isDecrypting}>
          <div class="dossier-meta-card">
            {#each activeFaction.dossier as item}
              <div class="meta-row">
                <span class="meta-label">{item.label}:</span>
                <span class="meta-value">{item.value}</span>
              </div>
            {/each}
            <div class="meta-row motto-row">
              <span class="meta-label">MOTTO:</span>
              <span class="meta-value motto-text">"{activeFaction.motto}"</span>
            </div>
          </div>

          <div class="intel-bullet-list">
            <span class="intel-header">// CLASSIFIED INTEL:</span>
            {#each activeFaction.intel as point}
              <div class="intel-item">
                <span class="intel-arrow">▸</span>
                <span>{point}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </main>
  </div>

  <!-- Bottom Bar: Placeholder for smartly animated Logo on Left -->
  <footer class="factions-footer">
    <div class="footer-logo-placeholder" aria-hidden="true"></div>

    <div class="security-marker">
      <span>INTEL CLEARANCE: LEVEL 4 // CLASSIFIED</span>
    </div>
  </footer>
</section>

<style>
  .factions-section {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #175b34;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    user-select: none;
    box-sizing: border-box;
    padding: 36px 48px;
    transition: background-color 0.5s ease;
  }

  /* Main Layout */
  .factions-body {
    position: relative;
    z-index: 30;
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 60px;
    align-items: center;
    margin: auto 0;
    max-width: 1300px;
    width: 100%;
    align-self: center;
  }

  /* Left Faction Navigation List */
  .factions-nav {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 35;
    padding-left: clamp(8px, 1.5vw, 24px);
  }

  .nav-track {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .faction-item {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    text-align: left;
    padding: 6px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "Genova", sans-serif;
    font-size: clamp(0.95rem, 1.25vw, 1.18rem); /* Reduced font size matching user design */
    letter-spacing: 0.1em;
    color: #e5fdf0;
    filter: blur(2.2px);
    opacity: 0.38;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .faction-item:hover {
    opacity: 0.75;
    filter: blur(0.8px);
    transform: translateX(4px);
  }

  .faction-item.active {
    filter: blur(0px);
    opacity: 1;
    font-weight: 500;
    color: #ffffff;
    transform: translateX(8px);
  }

  .active-indicator {
    font-size: 0.65rem;
    color: #00ff77;
    margin-left: 12px;
  }

  /* Center Column: Content */
  .faction-content {
    display: flex;
    flex-direction: column;
    max-width: 720px;
  }

  .content-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .summary-tag {
    font-family: "DM Mono", monospace;
    font-size: 0.88rem;
    letter-spacing: 0.16em;
    color: #a0d8b5;
  }

  .view-toggles {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .toggle-btn {
    background: transparent;
    border: none;
    font-family: "DM Mono", monospace;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    color: rgba(229, 253, 240, 0.5);
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .toggle-btn.selected {
    color: #00ff77;
    font-weight: 500;
  }

  .toggle-sep {
    color: rgba(229, 253, 240, 0.3);
    font-size: 0.72rem;
  }

  /* Faction Title in Bigger font with clean spacing so letters do NOT overlap */
  .faction-title-wrapper {
    margin-bottom: 28px;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .faction-title-wrapper.decrypting {
    opacity: 0.4;
    transform: translateY(2px);
  }

  .title-with-subtitle {
    display: flex;
    align-items: flex-end;
    gap: 14px;
    flex-wrap: wrap;
  }

  .title-primary {
    margin: 0;
    padding: 0;
    font-family: "Bigger", sans-serif;
    letter-spacing: -1px; /* Increased letter-spacing so letters don't overlap */
    font-size: clamp(3.2rem, 5.5vw, 5.8rem);
    line-height: 0.85;
    color: #7ceba0;
    text-transform: uppercase;
  }

  .title-primary.solo {
    font-size: clamp(3.6rem, 6.2vw, 6.5rem);
    letter-spacing: -1px;
  }

  .title-secondary {
    font-family: "Bigger", sans-serif;
    letter-spacing: -1px;
    font-size: clamp(1.4rem, 2.4vw, 2.6rem);
    line-height: 0.88;
    color: #7ceba0;
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
    padding-bottom: 4px;
  }

  /* Summary Text in DM Mono font */
  .faction-text-block {
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: opacity 0.25s ease;
  }

  .faction-text-block.decrypting {
    opacity: 0.3;
  }

  .summary-paragraph {
    margin: 0;
    font-family: "DM Mono", monospace;
    font-size: clamp(0.88rem, 1.05vw, 1.02rem);
    line-height: 1.68;
    letter-spacing: 0.02em;
    color: #c9f0d7;
    text-align: justify;
  }

  /* Dossier Meta */
  .dossier-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .dossier-meta-card {
    background: rgba(0, 30, 15, 0.45);
    border-radius: 8px;
    padding: 18px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .meta-row {
    display: flex;
    gap: 12px;
    font-family: "DM Mono", monospace;
    font-size: 0.82rem;
  }

  .meta-label {
    color: #7ceba0;
    min-width: 120px;
    font-weight: 500;
  }

  .meta-value {
    color: #e5fdf0;
  }

  .motto-text {
    font-style: italic;
    color: #00ff77;
  }

  .intel-bullet-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: "DM Mono", monospace;
    font-size: 0.84rem;
    color: #c9f0d7;
  }

  .intel-header {
    color: #7ceba0;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
  }

  .intel-item {
    display: flex;
    gap: 10px;
    line-height: 1.5;
  }

  .intel-arrow {
    color: #00ff77;
  }

  /* Footer Logo (Bottom Left) */
  .factions-footer {
    position: relative;
    z-index: 35;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
  }

  .footer-logo-placeholder {
    width: 200px;
    height: 48px;
  }

  .security-marker {
    position: relative;
    z-index: 35;
    font-family: "DM Mono", monospace;
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    color: rgba(229, 253, 240, 0.7);
  }

  @media (max-width: 900px) {
    .factions-section {
      padding: 24px 20px;
    }
    .factions-body {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    .nav-track {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 14px;
    }
    .faction-item {
      font-size: 1.1rem;
    }
    .summary-paragraph {
      text-align: left;
    }
    .factions-footer {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      margin-top: 24px;
    }
  }
</style>

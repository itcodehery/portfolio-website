<script lang="ts">
  import GridOverlay from "./GridOverlay.svelte";
  import { GAME_DETAILS } from "../data";
  import { liquidText } from "../utils/liquidScramble";
</script>

<section class="demo-section" id="demo">
  <GridOverlay theme="bright" />

  <!-- Main Demo Content -->
  <div class="demo-body">
    <!-- Left Column: Mission Intel & Action Download Buttons -->
    <div class="intel-col">
      <div class="mission-tag-row">
        <span class="mission-status-pill">● LIVE BUILD AVAILABLE</span>
        <span class="mission-code">LEVEL 1 // ARAVINDA-1 SPACE ELEVATOR, KOCHI</span>
      </div>

      <h2 class="demo-main-title">PLAY THE DEMO</h2>

      <p class="demo-logline" use:liquidText>
        {GAME_DETAILS.logline} Built from the ground up in Godot 4 with precision gunplay, retro-futuristic Marathon-inspired environmental storytelling, and tactical time-navigation infiltration.
      </p>

      <!-- Primary Action Play & GitHub Buttons (Zero borders) -->
      <div class="actions-group">
        <a
          href={GAME_DETAILS.playUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn download-btn"
        >
          <span class="play-icon">▶</span>
          <span>DOWNLOAD & PLAY DEMO</span>
        </a>

        <a
          href={GAME_DETAILS.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn github-btn"
        >
          <span>VIEW GITHUB REPOSITORY</span>
        </a>
      </div>
    </div>

    <!-- Right Column: Weapons Loadout & Engine Architecture (Zero borders) -->
    <div class="arsenal-col">
      <div class="arsenal-card">
        <div class="arsenal-title">// RECOVERED ARMORY LOADOUT</div>
        <div class="weapons-list">
          {#each GAME_DETAILS.weapons as weapon}
            <div class="weapon-row">
              <div class="w-header">
                <span class="w-name">{weapon.name}</span>
                <span class="w-faction">{weapon.faction}</span>
              </div>
              <div class="w-meta">
                <span class="w-type">{weapon.type}</span> — <span class="w-desc">{weapon.note}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Engine Architecture (Zero borders) -->
      <div class="specs-card">
        <div class="spec-col">
          <span class="s-label">ENGINE ARCHITECTURE</span>
          <span class="s-val">Godot 4 3D</span>
        </div>
        <div class="spec-col">
          <span class="s-label">ART DIRECTION</span>
          <span class="s-val">Marathon Inspo</span>
        </div>
        <div class="spec-col">
          <span class="s-label">LOCATION</span>
          <span class="s-val">Kochi, Kerala</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom Bar: Placeholder for smartly animated Logo on Left -->
  <footer class="demo-footer">
    <div class="footer-logo-placeholder" aria-hidden="true"></div>

    <div class="security-marker">
      <span>TOP SECRET // MERIDIAN CELL #04 // ARCHIVE EXTRACTION COMPLETE</span>
    </div>
  </footer>
</section>

<style>
  .demo-section {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #07b552; /* Same vibrant green as Hero section */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    user-select: none;
    box-sizing: border-box;
    padding: 36px 48px;
  }

  /* Main Layout */
  .demo-body {
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 56px;
    align-items: center;
    margin: auto 0;
    max-width: 1320px;
    width: 100%;
    align-self: center;
    padding-top: 40px; /* Offset for static appbar */
  }

  /* Left Column */
  .intel-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .mission-tag-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .mission-status-pill {
    font-family: "DM Mono", monospace;
    font-size: 0.72rem;
    font-weight: 500;
    background: #003515;
    color: #00ff77;
    border: none; /* Zero border */
    padding: 4px 10px;
    border-radius: 4px;
    letter-spacing: 0.08em;
  }

  .mission-code {
    font-family: "DM Mono", monospace;
    font-size: 0.72rem;
    color: #003515;
    letter-spacing: 0.1em;
  }

  .demo-main-title {
    margin: 0;
    padding: 0;
    font-family: "Bigger", sans-serif;
    letter-spacing: -2px; /* Clean spacing */
    font-size: clamp(3.8rem, 6.8vw, 7.2rem);
    line-height: 0.86;
    color: #003114;
    text-transform: uppercase;
  }

  .demo-logline {
    margin: 0;
    font-family: "DM Mono", monospace;
    font-size: clamp(0.88rem, 1.05vw, 1.02rem);
    line-height: 1.64;
    color: #003515;
    text-align: justify;
    max-width: 650px;
  }

  /* Action Buttons (Zero borders) */
  .actions-group {
    display: flex;
    gap: 16px;
    margin-top: 10px;
  }

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 15px 26px;
    border-radius: 6px;
    text-decoration: none;
    font-family: "Genova", sans-serif;
    font-size: 0.92rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    border: none; /* Zero border */
    transition: all 0.25s ease;
  }

  .download-btn {
    background: #003515;
    color: #07b552;
    font-weight: 700;
    box-shadow: 0 4px 20px rgba(0, 50, 20, 0.25);
  }

  .download-btn:hover {
    background: #00220c;
    color: #00ff77;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 50, 20, 0.35);
  }

  .github-btn {
    background: rgba(0, 45, 18, 0.12);
    color: #003515;
    border: none; /* Zero border */
  }

  .github-btn:hover {
    background: rgba(0, 45, 18, 0.22);
    color: #ffffff;
    transform: translateY(-2px);
  }

  .play-icon {
    font-size: 0.85rem;
  }

  /* Right Column: Arsenal (Zero borders) */
  .arsenal-col {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .arsenal-card {
    background: rgba(0, 45, 18, 0.08);
    border: none; /* Zero border */
    border-radius: 8px;
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .arsenal-title {
    font-family: "DM Mono", monospace;
    font-size: 0.76rem;
    color: #003816;
    font-weight: 500;
    letter-spacing: 0.12em;
  }

  .weapons-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .weapon-row {
    border: none; /* Zero border */
    padding-bottom: 2px;
  }

  .w-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .w-name {
    font-family: "Genova", sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: #003114;
  }

  .w-faction {
    font-family: "DM Mono", monospace;
    font-size: 0.7rem;
    color: #004d1f;
  }

  .w-meta {
    font-family: "DM Mono", monospace;
    font-size: 0.76rem;
    color: #003515;
    margin-top: 2px;
  }

  .w-type {
    color: #002e12;
    font-weight: 500;
  }

  /* Specs Card (Zero borders) */
  .specs-card {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    background: rgba(0, 45, 18, 0.06);
    border: none; /* Zero border */
    border-radius: 8px;
    padding: 14px 18px;
  }

  .spec-col {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .s-label {
    font-family: "DM Mono", monospace;
    font-size: 0.64rem;
    color: #004d1f;
    letter-spacing: 0.1em;
  }

  .s-val {
    font-family: "Genova", sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: #003114;
  }

  /* Footer */
  .demo-footer {
    position: relative;
    z-index: 30;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
  }

  .footer-logo-placeholder {
    width: 180px;
    height: 48px;
  }

  .security-marker {
    font-family: "DM Mono", monospace;
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    color: #003515;
    opacity: 0.7;
  }

  @media (max-width: 900px) {
    .demo-section {
      padding: 24px 20px;
    }
    .demo-body {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .actions-group {
      flex-direction: column;
    }
    .demo-footer {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
</style>

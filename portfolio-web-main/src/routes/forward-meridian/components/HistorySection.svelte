<script lang="ts">
  import GridOverlay from "./GridOverlay.svelte";
  import { TIMELINE_DATA } from "../data";
  import { onMount } from "svelte";
  import { liquidText } from "../utils/liquidScramble";

  let {
    isActive = false
  }: {
    isActive?: boolean;
  } = $props();

  let timelineTrack: HTMLDivElement | null = $state(null);
  let canScrollLeft = $state(false);
  let canScrollRight = $state(true);
  let activeIndex = $state(0);

  function updateScrollState() {
    if (!timelineTrack) return;
    canScrollLeft = timelineTrack.scrollLeft > 10;
    canScrollRight =
      timelineTrack.scrollLeft < timelineTrack.scrollWidth - timelineTrack.clientWidth - 10;

    const cardWidth = 340;
    const idx = Math.round(timelineTrack.scrollLeft / cardWidth);
    activeIndex = Math.max(0, Math.min(TIMELINE_DATA.length - 1, idx));
  }

  function scroll(direction: "left" | "right") {
    if (!timelineTrack) return;
    const scrollAmount = 380;
    timelineTrack.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  }

  function handleWheel(e: WheelEvent) {
    if (!timelineTrack) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      timelineTrack.scrollLeft += e.deltaY;
      updateScrollState();
    }
  }

  onMount(() => {
    updateScrollState();
  });
</script>

<section class="history-section" id="history">
  <GridOverlay theme="bright" />

  <!-- Horizontal Timeline Container (Lowered significantly to avoid overlapping the animated logo) -->
  <div class="timeline-container" class:active-slide={isActive}>
    <div
      class="timeline-track"
      bind:this={timelineTrack}
      onscroll={updateScrollState}
      onwheel={handleWheel}
      tabindex="0"
      role="region"
      aria-label="Chronological Timeline"
    >
      {#each TIMELINE_DATA as entry, idx}
        <article
          class="timeline-card"
          class:focused={idx === activeIndex}
          class:current-epoch={entry.isCurrentEpoch}
          style:--card-delay={`${idx * 0.05}s`}
        >
          <!-- Big bold Year in Bigger font with adjusted letter spacing -->
          <div class="year-header">
            <span class="year-text">{entry.year}</span>
            {#if entry.isCurrentEpoch}
              <div class="we-are-here-indicator">
                <span class="indicator-pulse"></span>
                <span class="indicator-label">WE ARE HERE</span>
              </div>
            {/if}
          </div>

          <!-- Horizontal Divider Rule (matching Figma image 5) -->
          <div class="card-divider-line" class:current-line={entry.isCurrentEpoch}></div>

          <!-- Description paragraph in DM Mono / Genova with Igloo.inc liquid text effect -->
          <div class="card-body">
            <p class="summary-text" use:liquidText>{entry.summary}</p>
          </div>
        </article>
      {/each}
    </div>
  </div>

  <!-- Bottom Bar: Archives Info (Left) & Circular Arrow Navigation (Right) -->
  <footer class="history-footer">
    <!-- Bottom Left: Welcome Notice & Logo (matching uploaded_media_0) -->
    <div class="footer-left">
      <img
        src="/forward-meridian/FORWARD MERIDIAN_Black Logo.png"
        alt="FORWARD MERIDIAN"
        class="footer-logo-img"
      />
      <div class="footer-intro-text">
        <p use:liquidText>WELCOME TO THE MERIDIAN ARCHIVES AT THE EPICENTER OF THE FALL OF CIVILIZATION.</p>
        <p class="highlight-kerala" use:liquidText>KERALA.</p>
      </div>
    </div>

    <!-- Bottom Right: Circular Navigation Buttons (< and >) -->
    <div class="footer-nav-controls">
      <button
        class="circle-nav-btn left"
        disabled={!canScrollLeft}
        onclick={() => scroll("left")}
        aria-label="Previous Chronology Event"
      >
        <svg
          class="nav-arrow-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        class="circle-nav-btn right"
        disabled={!canScrollRight}
        onclick={() => scroll("right")}
        aria-label="Next Chronology Event"
      >
        <svg
          class="nav-arrow-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </footer>
</section>

<style>
  .history-section {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #07b552;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    user-select: none;
    box-sizing: border-box;
    padding: 36px 48px;
  }

  /* Timeline Container: Sits with clear breathing room below the center logo */
  .timeline-container {
    position: relative;
    z-index: 10;
    width: 100%;
    margin-top: clamp(260px, 34vh, 320px);
    margin-bottom: auto;
    padding-top: 10px;
  }

  .timeline-track {
    display: flex;
    gap: 48px;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding-bottom: 24px;
    padding-right: 140px;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .timeline-track::-webkit-scrollbar {
    display: none;
  }

  /* Individual Timeline Entry Card (matching Figma Image 5) */
  .timeline-card {
    flex: 0 0 320px;
    display: flex;
    flex-direction: column;
    cursor: default;
    transition: transform 0.4s ease, opacity 0.4s ease;
    position: relative;
  }

  .active-slide .timeline-card {
    animation: timelineCardFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: var(--card-delay);
  }

  @keyframes timelineCardFadeIn {
    from {
      opacity: 0.2;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .timeline-card:hover {
    transform: translateY(-4px);
  }

  .year-header {
    margin-bottom: 8px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .year-text {
    font-family: "Bigger", sans-serif;
    letter-spacing: -1.5px; /* Clean spacing without letter collisions */
    font-size: clamp(3.4rem, 5.8vw, 5rem);
    line-height: 0.86;
    color: #003515;
    display: block;
  }

  /* Small indicator saying "WE ARE HERE" at 2022 */
  .we-are-here-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #003515;
    color: #00ff77;
    padding: 3px 8px;
    border-radius: 4px;
    font-family: "DM Mono", monospace;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    box-shadow: 0 0 10px rgba(0, 255, 119, 0.3);
  }

  .indicator-pulse {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00ff77;
    box-shadow: 0 0 8px #00ff77;
    animation: radarPulse 1.4s ease-in-out infinite;
  }

  @keyframes radarPulse {
    0%, 100% {
      opacity: 0.4;
      transform: scale(0.9);
    }
    50% {
      opacity: 1;
      transform: scale(1.3);
    }
  }

  /* The horizontal line under each year (Image 5) */
  .card-divider-line {
    width: 100%;
    height: 2px;
    background-color: #003515;
    margin-bottom: 18px;
  }

  .card-divider-line.current-line {
    background-color: #003515;
    box-shadow: 0 0 8px rgba(0, 255, 119, 0.4);
  }

  .card-body {
    display: flex;
    flex-direction: column;
  }

  .summary-text {
    margin: 0;
    font-family: "DM Mono", monospace;
    font-size: 0.86rem;
    line-height: 1.62;
    letter-spacing: 0.02em;
    color: #003515;
    text-align: left;
  }

  /* Footer (Image 5) */
  .history-footer {
    position: relative;
    z-index: 30;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    margin-top: 15px;
  }

  .footer-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: clamp(16px, 2vw, 32px);
    max-width: 680px;
  }

  .footer-logo-img {
    width: clamp(140px, 16vw, 220px);
    height: auto;
    display: block;
    opacity: 0.95;
    flex-shrink: 0;
  }

  .footer-intro-text {
    font-family: "Genova", sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    line-height: 1.45;
    letter-spacing: 0.12em;
    color: #003515;
    max-width: 380px;
  }

  .footer-intro-text p {
    margin: 0;
  }

  .highlight-kerala {
    font-weight: 700;
    letter-spacing: 0.22em;
    margin-top: 2px !important;
  }

  /* Circular Navigation Buttons (< and >) */
  .footer-nav-controls {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .circle-nav-btn {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: transparent;
    border: 2px solid #003515;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #003515;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    outline: none;
  }

  .circle-nav-btn:hover:not(:disabled) {
    background: #003515;
    color: #07b552;
    transform: scale(1.08);
  }

  .circle-nav-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .nav-arrow-icon {
    width: 26px;
    height: 26px;
  }

  @media (max-width: 900px) {
    .history-section {
      padding: 24px 20px;
    }
    .timeline-container {
      margin-top: 180px;
    }
    .timeline-card {
      flex: 0 0 280px;
    }
    .circle-nav-btn {
      width: 52px;
      height: 52px;
    }
  }
</style>

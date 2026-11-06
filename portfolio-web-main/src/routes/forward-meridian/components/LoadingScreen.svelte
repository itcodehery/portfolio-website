<script lang="ts">
  import { onMount } from "svelte";
  import GlassPlates from "./GlassPlates.svelte";
  import GridOverlay from "./GridOverlay.svelte";

  let {
    onEnter,
    mouseX = 0,
    mouseY = 0
  }: {
    onEnter: () => void;
    mouseX?: number;
    mouseY?: number;
  } = $props();

  let phase = $state<"loading" | "ready" | "entering">("loading");
  let progress = $state(0);
  let isHovered = $state(false);

  onMount(() => {
    const startTime = performance.now();
    const duration = 1400; // 1.4s smooth initialization

    const step = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      progress = pct;
      if (pct < 100) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          phase = "ready";
        }, 150);
      }
    };

    requestAnimationFrame(step);
  });

  function handleEnter() {
    if (phase !== "ready") return;
    phase = "entering";
    // Smooth 450ms transition into Hero
    setTimeout(() => {
      onEnter();
    }, 450);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if ((e.key === "Enter" || e.key === " ") && phase === "ready") {
      handleEnter();
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<div
  class="loading-view-container"
  class:entering={phase === "entering"}
  role="button"
  tabindex="0"
  onclick={handleEnter}
  aria-label="Click to enter Forward Meridian"
>
  <!-- Dark theme grid overlay matching uploaded_media_1 and uploaded_media_2 -->
  <GridOverlay theme="dark" />

  <!-- Persistent frosted glass plates -->
  <GlassPlates mode={phase === "loading" ? "loading" : "enter"} {mouseX} {mouseY} />

  <div class="center-stage">
    <!-- Title: FORWARD MERIDIAN (Intro logo with subtle sci-fi glow on dark background) -->
    <div
      class="title-wrapper"
      class:blurred={phase === "loading"}
      class:illuminated={phase === "ready" || phase === "entering"}
    >
      <img
        src="/forward-meridian/FORWARD MERIDIAN_Intro Logo.png"
        alt="FORWARD MERIDIAN"
        class="logo-asset-img"
      />
    </div>

    <!-- Status below logo: LOADING... or CLICK TO ENTER matching uploaded_media_1 & 2 -->
    <div class="status-wrapper">
      {#if phase === "loading"}
        <div class="loading-state">
          <span class="loading-label">LOADING...</span>
          <div class="progress-bar-wrap">
            <div class="progress-fill" style:width={`${progress}%`}></div>
          </div>
          <span class="progress-pct">{String(progress).padStart(2, "0")}%</span>
        </div>
      {:else}
        <button
          class="enter-button"
          class:hovered={isHovered}
          onmouseenter={() => (isHovered = true)}
          onmouseleave={() => (isHovered = false)}
          onclick={(e) => {
            e.stopPropagation();
            handleEnter();
          }}
        >
          <span class="enter-text">CLICK TO ENTER</span>
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .loading-view-container {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    /* Exactly matching the dark background in uploaded_media_1 & uploaded_media_2 */
    background-color: #001a0b;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    user-select: none;
    cursor: pointer;
    z-index: 1000;
  }

  /* Smooth, non-glitchy cinematic exit into the Hero section */
  .loading-view-container.entering {
    animation: smoothCinematicExit 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    pointer-events: none;
  }

  @keyframes smoothCinematicExit {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(-24px) scale(1.02);
      filter: blur(6px);
    }
  }

  .center-stage {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  /* Logo styling: Exactly matches uploaded_media_1 and uploaded_media_2 */
  .title-wrapper {
    position: relative;
    z-index: 5;
    transition:
      filter 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .logo-asset-img {
    width: clamp(280px, 27.6vw, 538px);
    height: auto;
    display: block;
    filter: none;
    transition: transform 0.4s ease;
  }

  /* Blurred state in loading (matching uploaded_media_1) */
  .title-wrapper.blurred .logo-asset-img {
    filter: blur(7px);
    transform: scale(0.97);
    opacity: 0.85;
  }

  /* Illuminated crisp state in ready (matching uploaded_media_2) */
  .title-wrapper.illuminated .logo-asset-img {
    filter: drop-shadow(0 0 20px rgba(0, 255, 120, 0.25));
    transform: scale(1);
    opacity: 1;
  }

  /* Status Wrapper */
  .status-wrapper {
    margin-top: 42px;
    min-height: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 30;
  }

  /* Loading State (matching uploaded_media_1) */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .loading-label {
    font-family: "Genova", sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    color: #12c965;
    animation: pulseLabel 1.5s ease-in-out infinite alternate;
  }

  @keyframes pulseLabel {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }

  .progress-bar-wrap {
    width: 120px;
    height: 2px;
    background: rgba(0, 224, 85, 0.18);
    position: relative;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #00e055;
    box-shadow: 0 0 6px #00e055;
    transition: width 0.08s linear;
  }

  .progress-pct {
    font-family: "DM Mono", monospace;
    font-size: 0.68rem;
    color: rgba(0, 224, 85, 0.75);
    letter-spacing: 0.15em;
  }

  /* Enter Button (clean mint green sans-serif matching uploaded_media_2) */
  .enter-button {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 10px 24px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .enter-text {
    font-family: "Genova", sans-serif;
    font-size: 0.84rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    color: #72e09b;
    transition: all 0.25s ease;
    animation: breath 2s ease-in-out infinite;
  }

  @keyframes breath {
    0%,
    100% {
      opacity: 0.75;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.02);
    }
  }

  .enter-button:hover .enter-text {
    color: #ffffff;
    text-shadow:
      -1.5px 0 rgba(255, 30, 80, 0.75),
      1.5px 0 rgba(0, 240, 255, 0.75),
      0 0 16px rgba(0, 224, 85, 0.8);
    transform: scale(1.06);
  }
</style>

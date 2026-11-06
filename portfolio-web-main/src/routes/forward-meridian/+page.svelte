<script lang="ts">
  import { onMount } from "svelte";
  import LoadingScreen from "./components/LoadingScreen.svelte";
  import StaticAppBar from "./components/StaticAppBar.svelte";
  import GlassPlates from "./components/GlassPlates.svelte";
  import HeroSection from "./components/HeroSection.svelte";
  import HistorySection from "./components/HistorySection.svelte";
  import FactionsSection from "./components/FactionsSection.svelte";
  import DemoSection from "./components/DemoSection.svelte";
  import LiquidCanvas from "./components/LiquidCanvas.svelte";

  let hasEntered = $state(false);

  let sliderContainer: HTMLDivElement | null = $state(null);
  let activeSlide = $state<"hero" | "history" | "factions" | "demo">("hero");
  let isGlitching = $state(false);
  let glitchTimeout: ReturnType<typeof setTimeout>;

  function triggerChromaticTransition() {
    isGlitching = true;
    clearTimeout(glitchTimeout);
    glitchTimeout = setTimeout(() => {
      isGlitching = false;
    }, 450);
  }

  // Mouse coordinate tracking for 3D parallax tilt on frosted glass cards
  let mouseX = $state(0);
  let mouseY = $state(0);

  function handleMouseMove(e: MouseEvent) {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    mouseX = (e.clientX - w / 2) / (w / 2);
    mouseY = (e.clientY - h / 2) / (h / 2);
  }

  function handleEnter() {
    hasEntered = true;
  }

  function scrollToSlide(slideId: "hero" | "history" | "factions" | "demo") {
    if (activeSlide !== slideId) {
      triggerChromaticTransition();
    }
    activeSlide = slideId;
    const el = document.getElementById(slideId);
    if (el && sliderContainer) {
      el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  }

  function updateActiveSlide() {
    if (!sliderContainer) return;
    const scrollLeft = sliderContainer.scrollLeft;
    const width = sliderContainer.clientWidth;
    const progress = scrollLeft / width;

    let index = 0;
    if (progress < 0.6) {
      index = 0; // Hero
    } else if (progress < 1.35) {
      index = 1; // History
    } else if (progress < 2.35) {
      index = 2; // Factions
    } else {
      index = 3; // Demo
    }

    const slides: Array<"hero" | "history" | "factions" | "demo"> = [
      "hero",
      "history",
      "factions",
      "demo"
    ];
    if (slides[index] && slides[index] !== activeSlide) {
      triggerChromaticTransition();
      activeSlide = slides[index];
    }
  }

  function handleWheel(e: WheelEvent) {
    if (!sliderContainer || !hasEntered) return;

    // If scrolling inside the inner history timeline track, let that handle its own scroll
    const target = e.target as HTMLElement | null;
    if (target?.closest(".timeline-track")) {
      return;
    }

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      sliderContainer.scrollBy({
        left: e.deltaY * 1.4,
        behavior: "smooth"
      });
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!hasEntered) return;
    const slides: Array<"hero" | "history" | "factions" | "demo"> = [
      "hero",
      "history",
      "factions",
      "demo"
    ];
    const currentIndex = slides.indexOf(activeSlide);

    if (e.key === "ArrowRight" || e.key === "PageDown") {
      if (currentIndex < slides.length - 1) {
        scrollToSlide(slides[currentIndex + 1]);
      }
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      if (currentIndex > 0) {
        scrollToSlide(slides[currentIndex - 1]);
      }
    }
  }
</script>

<svelte:head>
  <title>FORWARD MERIDIAN — Sci-Fi Tactical FPS</title>
  <meta
    name="description"
    content="Forward Meridian — A sci-fi tactical FPS set in a collapsing Kerala, 2022. Marathon-inspired retro-futurism, time-navigation infiltration, and covert syndicate warfare."
  />
  <link rel="stylesheet" href="/fonts/fonts.css" />
</svelte:head>

<svelte:window onmousemove={handleMouseMove} onkeydown={handleKeyDown} />

<div class="forward-meridian-root">
  {#if !hasEntered}
    <!-- Initial Loading Screen & Click to Enter Screen -->
    <LoadingScreen onEnter={handleEnter} {mouseX} {mouseY} />
  {/if}

  {#if hasEntered}
    <!-- Smart Persistent Logo that animates smoothly between Hero -> Timeline -> Factions -> Demo -->
    <div class={`smart-persistent-logo mode-${activeSlide}`} aria-hidden="true">
      <img
        src="/forward-meridian/FORWARD MERIDIAN_Black Logo.png"
        alt="FORWARD MERIDIAN"
        class="smart-logo-img"
      />
    </div>

    <!-- Global Persistent Frosted Glass Parallelogram Cards positioned ABOVE the logo (z-index: 20) -->
    <GlassPlates mode={activeSlide} {mouseX} {mouseY} />

    <!-- Static Global App Bar fixed at the top across all sections -->
    <StaticAppBar {activeSlide} onNavigate={scrollToSlide} />
  {/if}

  <!-- Interactive Liquid Ripple & Chromatic Aberration Canvas Overlay (Igloo.inc style) -->
  <LiquidCanvas {activeSlide} />

  <!-- Main Website Horizontal Slider (Hero -> History -> Factions -> Demo) -->
  <div
    class="horizontal-slider"
    class:visible={hasEntered}
    class:chromatic-ripple={isGlitching}
    bind:this={sliderContainer}
    onscroll={updateActiveSlide}
    onwheel={handleWheel}
  >
    <!-- Slide 1: Hero Section -->
    <div class="slide" id="hero">
      <HeroSection
        {hasEntered}
        {mouseX}
        {mouseY}
      />
    </div>

    <!-- Slide 2: History Timeline Section (Moved to Second Slide) -->
    <div class="slide" id="history">
      <HistorySection isActive={activeSlide === "history"} />
    </div>

    <!-- Slide 3: Factions Section -->
    <div class="slide" id="factions">
      <FactionsSection />
    </div>

    <!-- Slide 4: Demo Section (Final Last Slide with Game Play & Download) -->
    <div class="slide" id="demo">
      <DemoSection />
    </div>
  </div>
</div>

<style>
  .forward-meridian-root {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background-color: #001a0b;
    overflow: hidden;
    font-family: "Genova", sans-serif;
  }

  /* Smart Persistent Logo: Glides smoothly across sections */
  .smart-persistent-logo {
    position: fixed;
    z-index: 15; /* Directly underneath GlassPlates (z-index: 20) so frosted glass is physically ABOVE logo */
    pointer-events: none;
    transition:
      top 0.9s cubic-bezier(0.2, 0.85, 0.25, 1),
      left 0.9s cubic-bezier(0.2, 0.85, 0.25, 1),
      width 0.9s cubic-bezier(0.2, 0.85, 0.25, 1),
      transform 0.9s cubic-bezier(0.2, 0.85, 0.25, 1),
      filter 0.7s ease,
      opacity 0.7s ease;
  }

  .smart-logo-img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* 1. Hero Mode & 2. History Mode: IDENTICAL & LOCKED IN PLACE
     Zero movement between Hero and History to maintain complete rock-solid continuity */
  .smart-persistent-logo.mode-hero,
  .smart-persistent-logo.mode-history {
    top: clamp(80px, 11vh, 115px);
    left: 50%;
    transform: translateX(-50%);
    width: clamp(230px, 22vw, 360px);
    filter: drop-shadow(0 4px 14px rgba(0, 30, 10, 0.2));
    opacity: 1;
  }

  /* 3. Factions Mode: Glides down to bottom-left corner with safe breathing margin */
  .smart-persistent-logo.mode-factions {
    top: calc(100vh - clamp(75px, 9vh, 95px));
    left: clamp(32px, 3.5vw, 48px);
    transform: translateX(0);
    width: clamp(160px, 14vw, 200px);
    filter: brightness(0.7) contrast(1.2);
    opacity: 0.92;
  }

  /* 4. Demo Mode: Stays at bottom-left corner with safe breathing margin */
  .smart-persistent-logo.mode-demo {
    top: calc(100vh - clamp(75px, 9vh, 95px));
    left: clamp(32px, 3.5vw, 48px);
    transform: translateX(0);
    width: clamp(160px, 14vw, 190px);
    filter: drop-shadow(0 4px 12px rgba(0, 35, 12, 0.15));
    opacity: 0.95;
  }

  /* Horizontal Slider Track */
  .horizontal-slider {
    opacity: 0;
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .horizontal-slider::-webkit-scrollbar {
    display: none;
  }

  .horizontal-slider.visible {
    opacity: 1;
  }

  /* Subtle chromatic aberration flash on slide transitions */
  .horizontal-slider.chromatic-ripple {
    animation: chromaticGlitch 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes chromaticGlitch {
    0% {
      filter: drop-shadow(-2px 0 rgba(255, 30, 80, 0.45)) drop-shadow(2px 0 rgba(0, 240, 255, 0.45));
    }
    40% {
      filter: drop-shadow(2.5px 0 rgba(255, 30, 80, 0.5)) drop-shadow(-2.5px 0 rgba(0, 240, 255, 0.5));
    }
    100% {
      filter: none;
    }
  }

  .slide {
    flex: 0 0 100vw;
    width: 100vw;
    height: 100vh;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    overflow: hidden;
    position: relative;
  }

  @media (max-width: 900px) {
    .smart-persistent-logo.mode-factions,
    .smart-persistent-logo.mode-demo {
      left: 20px;
      top: calc(100vh - 65px);
      width: 150px;
    }
  }
</style>

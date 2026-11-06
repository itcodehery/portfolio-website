<script lang="ts">
  let {
    mode = "enter",
    mouseX = 0,
    mouseY = 0
  }: {
    mode: "loading" | "enter" | "hero" | "history" | "factions" | "demo";
    mouseX?: number;
    mouseY?: number;
  } = $props();

  // Interactive parallax offset based on normalized mouse coords (-1 to 1)
  let tiltX = $derived(mouseX * 6);
  let tiltY = $derived(mouseY * 6);
</script>

<!-- The two persistent frosted glass cards live continuously in the DOM across all slides:
     Hero / History: Compact signature parallelogram badges on the logo
     Factions: Expands into cinematic top-left and bottom-right corner plates
     Demo: Stays in corners and scales down to smaller ambient accents -->
<div class={`glass-system-wrap mode-${mode}`} aria-hidden="true">
  <div
    class="custom-frosted-card plate-left"
    style:--tilt-x={`${tiltX}px`}
    style:--tilt-y={`${tiltY}px`}
  >
    <div class="card-inner-glow"></div>
  </div>
  <div
    class="custom-frosted-card plate-right"
    style:--tilt-x={`${tiltX * -0.8}px`}
    style:--tilt-y={`${tiltY * -0.8}px`}
  >
    <div class="card-inner-glow"></div>
  </div>
</div>

<style>
  .glass-system-wrap {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 20; /* In Hero/History: strictly above logo (z-index: 15) */
    transition: z-index 0.3s ease;
  }

  /* In Factions & Demo: behind text content (z-index: 30) so all text is clearly readable on top */
  .glass-system-wrap.mode-factions,
  .glass-system-wrap.mode-demo {
    z-index: 10;
  }

  /* Pure CSS custom frosted glass cards - Exact Parallelogram shape with rounded corners.
     Uses 100% consistent top/left/width/height/transform properties across ALL modes
     to ensure silky-smooth continuous hardware-accelerated interpolation between phases. */
  .custom-frosted-card {
    position: absolute;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(14px) saturate(140%);
    -webkit-backdrop-filter: blur(14px) saturate(140%);
    border: 1.5px solid rgba(255, 255, 255, 0.38);
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.22),
      inset 0 1px 2px rgba(255, 255, 255, 0.5),
      inset 0 -1px 2px rgba(0, 0, 0, 0.12);
    pointer-events: none;
    transition:
      top 0.9s cubic-bezier(0.2, 0.85, 0.25, 1),
      left 0.9s cubic-bezier(0.2, 0.85, 0.25, 1),
      width 0.9s cubic-bezier(0.2, 0.85, 0.25, 1),
      height 0.9s cubic-bezier(0.2, 0.85, 0.25, 1),
      border-radius 0.9s cubic-bezier(0.2, 0.85, 0.25, 1),
      opacity 0.9s cubic-bezier(0.2, 0.85, 0.25, 1),
      transform 0.9s cubic-bezier(0.2, 0.85, 0.25, 1);
  }

  .card-inner-glow {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0) 65%
    );
    pointer-events: none;
  }

  /* ============================================================
     1. LOADING STATE
     ============================================================ */
  .mode-loading .plate-left {
    top: calc(50% - clamp(18px, 1.8vh, 32px));
    left: calc(50% - clamp(35px, 3.5vw, 65px));
    width: clamp(60px, 6.45vw, 124px);
    height: clamp(75px, 7.7vw, 148px);
    border-radius: clamp(10px, 1vw, 16px);
    opacity: 0.92;
    transform: translate(-50%, -50%) skewY(28deg);
  }
  .mode-loading .plate-right {
    top: calc(50% + clamp(18px, 1.8vh, 32px));
    left: calc(50% + clamp(35px, 3.5vw, 65px));
    width: clamp(60px, 6.45vw, 124px);
    height: clamp(75px, 7.7vw, 148px);
    border-radius: clamp(10px, 1vw, 16px);
    opacity: 0.88;
    transform: translate(-50%, -50%) skewY(-28deg);
  }

  /* ============================================================
     2. ENTER STATE (Click to enter)
     ============================================================ */
  .mode-enter .plate-left {
    top: calc(50% - clamp(50px, 9vh, 95px));
    left: calc(50% - clamp(130px, 12vw, 220px));
    width: clamp(60px, 6.45vw, 124px);
    height: clamp(75px, 7.7vw, 148px);
    border-radius: clamp(10px, 1vw, 16px);
    opacity: 0.88;
    transform: translate(-50%, -50%) skewY(28deg);
  }
  .mode-enter .plate-right {
    top: calc(50% + clamp(35px, 5.5vh, 65px));
    left: calc(50% + clamp(120px, 11vw, 210px));
    width: clamp(60px, 6.45vw, 124px);
    height: clamp(75px, 7.7vw, 148px);
    border-radius: clamp(10px, 1vw, 16px);
    opacity: 0.88;
    transform: translate(-50%, -50%) skewY(-28deg);
  }

  /* ============================================================
     3. HERO & 4. HISTORY: IDENTICAL POSITION, LOCKED IN PLACE
     ============================================================ */
  .mode-hero .plate-left,
  .mode-history .plate-left {
    top: calc(clamp(80px, 11vh, 115px) + clamp(10px, 1.5vh, 22px));
    left: calc(50% - clamp(105px, 10vw, 170px));
    width: clamp(52px, 5.5vw, 98px);
    height: clamp(65px, 6.8vw, 120px);
    border-radius: clamp(8px, 0.9vw, 14px);
    opacity: 0.88;
    transform: translate(-50%, -50%) skewY(28deg) translate(var(--tilt-x, 0px), var(--tilt-y, 0px));
  }
  .mode-hero .plate-right,
  .mode-history .plate-right {
    top: calc(clamp(80px, 11vh, 115px) + clamp(65px, 7.5vh, 110px));
    left: calc(50% + clamp(100px, 9.5vw, 160px));
    width: clamp(52px, 5.5vw, 98px);
    height: clamp(65px, 6.8vw, 120px);
    border-radius: clamp(8px, 0.9vw, 14px);
    opacity: 0.88;
    transform: translate(-50%, -50%) skewY(-28deg) translate(var(--tilt-x, 0px), var(--tilt-y, 0px));
  }

  /* ============================================================
     5. FACTIONS STATE: Expands smoothly into large corner plates
     All coordinates use top/left + translate(-50%, -50%) so the
     transition from Timeline to Factions glides seamlessly across screen!
     ============================================================ */
  .mode-factions .plate-left {
    top: clamp(45px, 6vw, 85px);
    left: clamp(45px, 6vw, 85px);
    width: clamp(140px, 14vw, 220px);
    height: clamp(180px, 18vw, 290px);
    border-radius: 26px;
    opacity: 0.78;
    transform: translate(-50%, -50%) skewY(28deg) translate(var(--tilt-x, 0px), var(--tilt-y, 0px));
  }
  .mode-factions .plate-right {
    top: calc(100% - clamp(45px, 6vw, 85px));
    left: calc(100% - clamp(45px, 6vw, 85px));
    width: clamp(140px, 14vw, 220px);
    height: clamp(180px, 18vw, 290px);
    border-radius: 26px;
    opacity: 0.78;
    transform: translate(-50%, -50%) skewY(-28deg) translate(var(--tilt-x, 0px), var(--tilt-y, 0px));
  }

  /* ============================================================
     6. DEMO STATE: Scales down to smaller ambient corner accents
     ============================================================ */
  .mode-demo .plate-left {
    top: clamp(25px, 3.5vw, 45px);
    left: clamp(25px, 3.5vw, 45px);
    width: clamp(70px, 7vw, 110px);
    height: clamp(90px, 9vw, 140px);
    border-radius: 16px;
    opacity: 0.6;
    transform: translate(-50%, -50%) skewY(28deg) translate(var(--tilt-x, 0px), var(--tilt-y, 0px));
  }
  .mode-demo .plate-right {
    top: calc(100% - clamp(25px, 3.5vw, 45px));
    left: calc(100% - clamp(25px, 3.5vw, 45px));
    width: clamp(70px, 7vw, 110px);
    height: clamp(90px, 9vw, 140px);
    border-radius: 16px;
    opacity: 0.6;
    transform: translate(-50%, -50%) skewY(-28deg) translate(var(--tilt-x, 0px), var(--tilt-y, 0px));
  }

  @media (max-width: 768px) {
    .mode-loading .plate-left,
    .mode-loading .plate-right,
    .mode-enter .plate-left,
    .mode-enter .plate-right,
    .mode-hero .plate-left,
    .mode-hero .plate-right {
      width: clamp(48px, 9vw, 75px);
      height: clamp(60px, 11vw, 90px);
    }
    .mode-factions .plate-left,
    .mode-factions .plate-right {
      width: 120px;
      height: 160px;
    }
  }
</style>

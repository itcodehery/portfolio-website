<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { PAD_GRID, ROW_LABELS, CATEGORY_COLORS, KEY_TO_PAD, playSound, getAnalyser } from '$lib/soundEngine';
  import type { PadConfig } from '$lib/soundEngine';
  import { getRandomFact } from '$lib/facts';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';

  // ─── State ───
  let activePads: Record<number, boolean> = $state({});
  let bubbles: Array<{ id: number; x: number; y: number; text: string }> = $state([]);
  let bubbleId = 0;
  let canvasEl: HTMLCanvasElement | undefined = $state(undefined);
  let sectionEl: HTMLElement | undefined = $state(undefined);
  let isVisible = $state(false);
  let animFrameId: number;
  let lastBubbleTime = 0;
  let isPipMode = $state(false);
  let inlineTop = $state(0);
  let wrapperEl: HTMLDivElement | undefined = $state(undefined);

  // ─── PiP Mode Logic ───
  $effect(() => {
    const checkMode = () => {
      const placeholder = document.getElementById('soundlab-placeholder');
      if ($page.url.pathname === '/' && placeholder) {
        isVisible = true;
        
        // Sync placeholder height to prevent overlap
        if (!isPipMode && wrapperEl) {
          placeholder.style.height = `${wrapperEl.offsetHeight}px`;
        }
        
        inlineTop = placeholder.offsetTop;
        const rect = placeholder.getBoundingClientRect();
        // Enter PiP if the placeholder scrolls completely out of view
        const isOut = rect.bottom < 0 || rect.top > window.innerHeight;
        isPipMode = isOut;
      } else {
        isPipMode = true; // PiP mode on all other pages
      }
    };

    window.addEventListener('scroll', checkMode);
    window.addEventListener('resize', checkMode);
    const interval = setInterval(checkMode, 1000); // Check occasionally for layout shifts
    
    checkMode();

    return () => {
      window.removeEventListener('scroll', checkMode);
      window.removeEventListener('resize', checkMode);
      clearInterval(interval);
    };
  });

  // ─── Pad Press Handler ───
  function handlePadPress(pad: PadConfig, event: MouseEvent | TouchEvent) {
    // Trigger sound
    playSound(pad.id);

    // Visual feedback
    activePads[pad.id] = true;
    setTimeout(() => {
      activePads[pad.id] = false;
    }, 200);

    // Spawn fact bubble randomly across the section (with a cooldown to prevent overlap)
    const now = Date.now();
    if (sectionEl && now - lastBubbleTime > 1200 && Math.random() < 0.6) {
      lastBubbleTime = now;
      const rect = sectionEl.getBoundingClientRect();
      const padding = 80; // Keep bubbles away from the very edges
      
      const newBubble = {
        id: bubbleId++,
        x: rect.left + padding + Math.random() * (rect.width - padding * 2),
        y: rect.top + padding + Math.random() * (rect.height - padding * 2),
        text: getRandomFact(),
      };
      bubbles = [...bubbles, newBubble];

      // Remove bubble after animation
      setTimeout(() => {
        bubbles = bubbles.filter(b => b.id !== newBubble.id);
      }, 3500);
    }
  }

  // ─── Keyboard Handler ───
  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    if (key in KEY_TO_PAD) {
      const padId = KEY_TO_PAD[key];
      playSound(padId);
      activePads[padId] = true;
      setTimeout(() => {
        activePads[padId] = false;
      }, 200);

      // Spawn fact bubble randomly across the section (with a cooldown)
      const now = Date.now();
      if (sectionEl && now - lastBubbleTime > 1200 && Math.random() < 0.6) {
        lastBubbleTime = now;
        const rect = sectionEl.getBoundingClientRect();
        const padding = 80;
        
        const newBubble = {
          id: bubbleId++,
          x: rect.left + padding + Math.random() * (rect.width - padding * 2),
          y: rect.top + padding + Math.random() * (rect.height - padding * 2),
          text: getRandomFact(),
        };
        bubbles = [...bubbles, newBubble];
        setTimeout(() => {
          bubbles = bubbles.filter(b => b.id !== newBubble.id);
        }, 3500);
      }
    }
  }

  // ─── Canvas Visualizer ───
  function startVisualizer() {
    const canvas = canvasEl;
    if (!canvas) return;
    const ctxCanvas = canvas.getContext('2d');
    if (!ctxCanvas) return;

    function draw() {
      animFrameId = requestAnimationFrame(draw);
      const analyserNode = getAnalyser();
      if (!analyserNode || !ctxCanvas || !canvas) return;

      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserNode.getByteFrequencyData(dataArray);

      // Resize canvas to match element size
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctxCanvas.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctxCanvas.clearRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let barX = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height * 0.6;

        // Gradient from lime-light to cyan-dark
        const alpha = 0.15 + (dataArray[i] / 255) * 0.4;
        const greenComponent = 200 + Math.floor((dataArray[i] / 255) * 55);
        ctxCanvas.fillStyle = `rgba(${180}, ${greenComponent}, ${170}, ${alpha})`;

        // Draw bar from bottom
        const barY = height - barHeight;
        ctxCanvas.fillRect(barX, barY, barWidth - 1, barHeight);

        // Glow effect
        ctxCanvas.shadowColor = `rgba(218, 244, 210, ${alpha * 0.5})`;
        ctxCanvas.shadowBlur = 8;

        barX += barWidth;
      }

      // Reset scale for next frame
      ctxCanvas.setTransform(1, 0, 0, 1, 0, 0);
    }

    draw();
  }

  // ─── Lifecycle ───
  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    startVisualizer();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  });
</script>

<div 
  bind:this={wrapperEl}
  class="soundlab-wrapper" 
  class:inline={!isPipMode} 
  class:pip={isPipMode}
  style={!isPipMode ? `top: ${inlineTop}px;` : ''}
>
<section bind:this={sectionEl} id="sound-lab">
  <!-- Background Visualizer Canvas -->
  <canvas bind:this={canvasEl} class="visualizer-canvas"></canvas>

  <div class="section-content">
    {#if isVisible}
      <div class="header" in:fly={{ y: 30, duration: 800 }}>
        <h2>Sound Lab</h2>
        <p class="subtitle">tap, click, or press keys to play</p>
      </div>
    {/if}

    <div class="grid-container">
      <!-- Row labels -->
      <div class="row-labels">
        {#each ROW_LABELS as label, i}
          <div class="row-label" style:animation-delay="{i * 50}ms">{label}</div>
        {/each}
      </div>

      <!-- Pad Grid -->
      <div class="pad-grid">
        {#each PAD_GRID as row, rowIndex}
          {#each row as pad (pad.id)}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <button
              class="pad {CATEGORY_COLORS[pad.category]}"
              class:active={activePads[pad.id]}
              onmousedown={(e) => handlePadPress(pad, e)}
              ontouchstart={(e) => { e.preventDefault(); handlePadPress(pad, e); }}
              aria-label="{pad.label} - {ROW_LABELS[rowIndex]}"
            >
              <span class="pad-label">{pad.label}</span>
              {#if pad.key}
                <span class="pad-key">{pad.key.toUpperCase()}</span>
              {/if}
              {#if activePads[pad.id]}
                <div class="ripple"></div>
              {/if}
            </button>
          {/each}
        {/each}
      </div>
    </div>

    <!-- Music Links -->
    <div class="music-links">
      <button class="music-link" onclick={() => window.open('https://open.spotify.com/artist/5uzY3x7q567a2Fmg7fKbWh', '_blank')}>
        <Icon icon="mdi:spotify" width="20" />
        <span>Spotify</span>
      </button>
      <button class="music-link" onclick={() => window.open('https://youtube.com/channel/UCKsrfag-JNkGQ2YJmElAkQQ', '_blank')}>
        <Icon icon="mdi:youtube" width="20" />
        <span>YouTube</span>
      </button>
    </div>
  </div>

  <!-- Fact Bubbles (fixed position, rendered over everything) -->
  {#each bubbles as bubble (bubble.id)}
    <div
      class="fact-bubble"
      style="left: {bubble.x}px; top: {bubble.y}px;"
      in:fade={{ duration: 200 }}
    >
      {bubble.text}
    </div>
  {/each}
</section>
</div>

<style>
  section {
    position: relative;
    background-color: rgba(4, 33, 37, 1);
    font-family: "DM Sans", sans-serif;
    color: #daf4d2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 750px;
    padding: 60px 20px 40px;
    overflow: hidden;
  }

  /* ─── Visualizer Canvas ─── */
  .visualizer-canvas {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }

  /* ─── Section Content ─── */
  .section-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
    max-width: 800px;
  }

  .header {
    text-align: center;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 48px;
    font-weight: 500;
    margin: 0;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #daf4d2, #88c07e, #daf4d2);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .subtitle {
    font-size: 14px;
    opacity: 0.5;
    margin: 8px 0 0 0;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* ─── Grid Container ─── */
  .grid-container {
    display: flex;
    gap: 8px;
    align-items: stretch;
    width: 100%;
    max-width: 740px;
  }

  /* ─── Row Labels ─── */
  .row-labels {
    display: flex;
    flex-direction: column;
    gap: 6px;
    justify-content: stretch;
  }

  .row-label {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    opacity: 0.4;
    white-space: nowrap;
    min-width: 50px;
  }

  /* ─── Pad Grid ─── */
  .pad-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 6px;
    flex: 1;
  }

  /* ─── Individual Pad ─── */
  .pad {
    position: relative;
    aspect-ratio: 1;
    border: 1px solid rgba(218, 244, 210, 0.08);
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    transition: all 0.15s ease;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    padding: 4px;
  }

  .pad:hover {
    transform: scale(1.05);
    border-color: rgba(218, 244, 210, 0.3);
  }

  .pad:active,
  .pad.active {
    transform: scale(0.95);
  }

  /* ─── Category Colors ─── */
  .cat-drums {
    background: rgba(218, 244, 210, 0.08);
  }
  .cat-drums:hover, .cat-drums.active {
    background: rgba(218, 244, 210, 0.2);
    box-shadow: 0 0 20px rgba(218, 244, 210, 0.15);
  }

  .cat-perc {
    background: rgba(218, 244, 210, 0.06);
  }
  .cat-perc:hover, .cat-perc.active {
    background: rgba(218, 244, 210, 0.18);
    box-shadow: 0 0 20px rgba(218, 244, 210, 0.12);
  }

  .cat-bass-sub {
    background: rgba(7, 59, 66, 0.6);
  }
  .cat-bass-sub:hover, .cat-bass-sub.active {
    background: rgba(7, 90, 100, 0.7);
    box-shadow: 0 0 20px rgba(7, 120, 130, 0.3);
  }

  .cat-bass-growl {
    background: rgba(7, 59, 66, 0.8);
  }
  .cat-bass-growl:hover, .cat-bass-growl.active {
    background: rgba(7, 100, 110, 0.7);
    box-shadow: 0 0 20px rgba(7, 130, 145, 0.3);
  }

  .cat-synth-lead {
    background: rgba(136, 192, 126, 0.1);
  }
  .cat-synth-lead:hover, .cat-synth-lead.active {
    background: rgba(136, 192, 126, 0.25);
    box-shadow: 0 0 20px rgba(136, 192, 126, 0.2);
  }

  .cat-synth-pad {
    background: rgba(136, 192, 126, 0.07);
  }
  .cat-synth-pad:hover, .cat-synth-pad.active {
    background: rgba(136, 192, 126, 0.2);
    box-shadow: 0 0 20px rgba(136, 192, 126, 0.15);
  }

  .cat-synth-bright {
    background: rgba(218, 244, 210, 0.1);
    border-color: rgba(218, 244, 210, 0.1);
  }
  .cat-synth-bright:hover, .cat-synth-bright.active {
    background: rgba(218, 244, 210, 0.25);
    box-shadow: 0 0 25px rgba(218, 244, 210, 0.2);
  }

  .cat-fx {
    background: linear-gradient(135deg, rgba(7, 59, 66, 0.5), rgba(136, 192, 126, 0.1));
  }
  .cat-fx:hover, .cat-fx.active {
    background: linear-gradient(135deg, rgba(7, 80, 90, 0.6), rgba(136, 192, 126, 0.25));
    box-shadow: 0 0 25px rgba(218, 244, 210, 0.18);
  }

  /* ─── Pad Labels ─── */
  .pad-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.3px;
    opacity: 0.8;
    text-align: center;
    line-height: 1.1;
    pointer-events: none;
    color: rgba(218, 244, 210, 0.4);
  }

  .pad-key {
    font-size: 7px;
    opacity: 0.3;
    font-weight: 500;
    pointer-events: none;
  }

  /* ─── Ripple Effect ─── */
  .ripple {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    border: 2px solid rgba(218, 244, 210, 0.5);
    animation: rippleAnim 0.4s ease-out forwards;
    pointer-events: none;
  }

  @keyframes rippleAnim {
    0% {
      transform: scale(0.8);
      opacity: 1;
    }
    100% {
      transform: scale(1.3);
      opacity: 0;
    }
  }

  /* ─── Music Links ─── */
  .music-links {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }

  .music-link {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(7, 59, 66, 0.5);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(218, 244, 210, 0.1);
    border-radius: 100px;
    padding: 10px 20px;
    color: #daf4d2;
    font-family: "DM Sans", sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .music-link:hover {
    background: rgba(7, 59, 66, 0.8);
    border-color: rgba(218, 244, 210, 0.3);
    box-shadow: 0 0 20px rgba(218, 244, 210, 0.1);
    transform: translateY(-2px);
  }

  /* ─── Fact Bubbles ─── */
  .fact-bubble {
    position: fixed;
    z-index: 9999;
    transform: translate(-50%, -100%);
    background: rgba(7, 59, 66, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(218, 244, 210, 0.15);
    border-radius: 16px;
    padding: 12px 18px;
    font-size: 13px;
    font-weight: 500;
    color: #daf4d2;
    max-width: 260px;
    text-align: center;
    pointer-events: none;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    animation: bubbleFloat 3.5s ease-out forwards;
    white-space: normal;
    line-height: 1.4;
  }

  @keyframes bubbleFloat {
    0% {
      opacity: 0;
      transform: translate(-50%, -80%) scale(0.8);
    }
    10% {
      opacity: 1;
      transform: translate(-50%, -100%) scale(1);
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -220px) scale(0.9);
    }
  }

  /* ─── Responsive ─── */
  @media (max-width: 768px) {
    section {
      min-height: auto;
      padding: 40px 12px 30px;
    }

    h2 {
      font-size: 32px;
    }

    .grid-container {
      max-width: 100%;
    }

    .row-labels {
      display: none;
    }

    .pad-grid {
      gap: 4px;
    }

    .pad {
      border-radius: 8px;
      aspect-ratio: 1;
    }

    .pad-label {
      font-size: 7px;
    }

    .pad-key {
      display: none;
    }

    .fact-bubble {
      max-width: 200px;
      font-size: 11px;
      padding: 8px 14px;
    }
  }

  @media (max-width: 480px) {
    .pad-grid {
      gap: 3px;
    }

    .pad {
      border-radius: 6px;
    }

    .pad-label {
      font-size: 6px;
    }

    .music-links {
      flex-direction: column;
      align-items: center;
    }
  }

  /* ─── PiP Mode Styles ─── */
  .soundlab-wrapper {
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .soundlab-wrapper.inline {
    position: absolute;
    left: 0;
    width: 100%;
    max-width: 100vw;
    z-index: 1;
    animation: inlineEnter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes inlineEnter {
    0% { opacity: 0; transform: scale(0.95) translateY(-20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  .soundlab-wrapper.pip {
    z-index: 9999;
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 320px;
    height: auto;
    border-radius: 20px;
    background: rgba(5, 43, 48, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(218, 244, 210, 0.2);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    overflow: hidden;
    animation: pipEnter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes pipEnter {
    0% { opacity: 0; transform: scale(0.8) translateY(40px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  .pip section {
    min-height: auto;
    padding: 20px;
  }

  .pip .header, .pip .music-links, .pip .row-labels {
    display: none;
  }

  .pip .pad-grid {
    gap: 4px;
  }

  .pip .pad {
    border-radius: 6px;
    padding: 2px;
  }

  .pip .pad-label {
    font-size: 6px;
  }
  
  .pip .pad-key {
    display: none;
  }

  .pip .visualizer-canvas {
    opacity: 0.3;
  }

  .pip .fact-bubble {
    font-size: 11px;
    padding: 8px 12px;
    max-width: 200px;
  }

  @media (max-width: 768px) {
    .soundlab-wrapper.pip {
      bottom: 110px;
      right: 15px;
      width: 260px;
    }
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";

  let {
    activeSlide = "hero"
  }: {
    activeSlide?: string;
  } = $props();

  let canvas: HTMLCanvasElement | null = $state(null);

  interface Ripple {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    speed: number;
    opacity: number;
    decay: number;
    spread: number;
    width: number;
  }

  const ripples: Ripple[] = [];
  let lastX = 0;
  let lastY = 0;
  let lastSpawnTime = 0;
  let animId: number;

  function spawnRipple(x: number, y: number, strength = 1, maxR = 90) {
    if (ripples.length > 12) ripples.shift();
    ripples.push({
      x,
      y,
      radius: 4,
      maxRadius: maxR * strength,
      speed: 2.0 * strength,
      opacity: Math.min(0.38, 0.25 * strength),
      decay: 0.965,
      spread: Math.min(3, 1.5 * strength),
      width: Math.min(2, 1.2 * strength)
    });
  }

  function handlePointerMove(e: MouseEvent) {
    const now = performance.now();
    // Throttle to at most one ripple every 380ms, and only on significant pointer movement
    if (now - lastSpawnTime < 380) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Only spawn when mouse is moving with deliberate velocity (not on every pixel)
    if (dist > 65) {
      spawnRipple(e.clientX, e.clientY, 1.0, 85);
      lastX = e.clientX;
      lastY = e.clientY;
      lastSpawnTime = now;
    }
  }

  function handleClick(e: MouseEvent) {
    spawnRipple(e.clientX, e.clientY, 1.8, 130);
  }

  // Single soft chromatic ripple on slide navigation
  $effect(() => {
    if (activeSlide && canvas) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      spawnRipple(cx, cy, 2.0, Math.min(window.innerWidth, window.innerHeight) * 0.7);
    }
  });

  onMount(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    function render() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity *= r.decay;

        if (r.opacity < 0.01 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Soft Chromatic Aberration RGB displacement rings
        // 1. Red / Magenta fringe
        ctx.beginPath();
        ctx.arc(r.x - r.spread, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 30, 80, ${r.opacity * 0.45})`;
        ctx.lineWidth = r.width;
        ctx.stroke();

        // 2. Cyan / Ice Green fringe
        ctx.beginPath();
        ctx.arc(r.x + r.spread, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${r.opacity * 0.45})`;
        ctx.lineWidth = r.width;
        ctx.stroke();

        // 3. Soft specular water highlight
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.6})`;
        ctx.lineWidth = r.width * 0.8;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("click", handleClick);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="liquid-ripple-canvas"
  aria-hidden="true"
></canvas>

<style>
  .liquid-ripple-canvas {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 45;
    mix-blend-mode: screen;
  }
</style>

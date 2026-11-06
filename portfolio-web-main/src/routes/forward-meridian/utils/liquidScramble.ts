/**
 * Smooth Liquid Text Interaction
 * When the pointer brushes against text, words smoothly undulate like ripples on a liquid surface
 * with an elegant chromatic aberration effect, without glitching or scrambling characters.
 */

export function liquidText(node: HTMLElement) {
  const text = node.textContent?.trim() || "";
  if (!text) return;

  // Split into words wrapped in spans for fluid liquid undulation
  const words = text.split(/\s+/);
  node.innerHTML = words
    .map(
      (w) =>
        `<span class="liquid-word" style="display:inline-block; transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.35s ease; will-change: transform;">${w}&nbsp;</span>`
    )
    .join("");

  const wordSpans = Array.from(node.querySelectorAll<HTMLSpanElement>(".liquid-word"));

  function handlePointerMove(e: MouseEvent) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const radius = 100;

    for (let i = 0; i < wordSpans.length; i++) {
      const span = wordSpans[i];
      const sRect = span.getBoundingClientRect();
      const cx = sRect.left + sRect.width / 2;
      const cy = sRect.top + sRect.height / 2;

      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const factor = (1 - dist / radius);
        // Smooth sine wave liquid displacement
        const liftY = -7 * factor * Math.cos((dist / radius) * Math.PI * 0.5);
        const pushX = (cx - mouseX) * 0.06 * factor;
        const scale = 1 + 0.03 * factor;
        const chroma = (factor * 2).toFixed(1);

        span.style.transform = `translate3d(${pushX.toFixed(1)}px, ${liftY.toFixed(1)}px, 0) scale(${scale.toFixed(2)})`;
        span.style.textShadow = `-${chroma}px 0 rgba(255, 30, 80, ${0.4 * factor}), ${chroma}px 0 rgba(0, 240, 255, ${0.4 * factor})`;
      } else {
        if (span.style.textShadow && span.style.textShadow !== "none") {
          span.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
          span.style.textShadow = "none";
        }
      }
    }
  }

  function handlePointerLeave() {
    for (let i = 0; i < wordSpans.length; i++) {
      wordSpans[i].style.transform = "translate3d(0px, 0px, 0px) scale(1)";
      wordSpans[i].style.textShadow = "none";
    }
  }

  node.addEventListener("pointermove", handlePointerMove, { passive: true });
  node.addEventListener("pointerleave", handlePointerLeave, { passive: true });

  return {
    destroy() {
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerleave", handlePointerLeave);
      node.innerHTML = text;
    }
  };
}

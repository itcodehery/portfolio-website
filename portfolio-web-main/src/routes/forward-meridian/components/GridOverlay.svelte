<script lang="ts">
  let { theme = "dark" }: { theme?: "dark" | "bright" | "factions" } = $props();
</script>

<div class="grid-overlay-container" aria-hidden="true">
  <svg class="grid-svg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
    <g class={`lines-group theme-${theme}`}>
      <!-- Primary angled aperture lines matching Figma screenshots -->
      <line x1="-100" y1="720" x2="880" y2="-50" stroke-width="1.2" />
      <line x1="450" y1="-50" x2="2020" y2="820" stroke-width="1.2" />
      <line x1="160" y1="1130" x2="2020" y2="210" stroke-width="1.2" />
      <line x1="-50" y1="180" x2="1350" y2="1130" stroke-width="1.2" />
      
      <!-- Secondary subtle tactical coordinates / crosshair rays -->
      <line x1="960" y1="0" x2="960" y2="60" stroke-width="1" stroke-dasharray="3 3" opacity="0.6" />
      <line x1="960" y1="1020" x2="960" y2="1080" stroke-width="1" stroke-dasharray="3 3" opacity="0.6" />
      <line x1="0" y1="540" x2="60" y2="540" stroke-width="1" stroke-dasharray="3 3" opacity="0.6" />
      <line x1="1860" y1="540" x2="1920" y2="540" stroke-width="1" stroke-dasharray="3 3" opacity="0.6" />
    </g>
  </svg>
</div>

<style>
  .grid-overlay-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 1;
  }

  .grid-svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .lines-group {
    transition: stroke 0.6s ease;
  }

  .lines-group.theme-dark line {
    stroke: rgba(0, 255, 120, 0.12);
  }

  .lines-group.theme-bright line {
    stroke: rgba(0, 45, 18, 0.16);
  }

  .lines-group.theme-factions line {
    stroke: rgba(160, 255, 200, 0.14);
  }
</style>

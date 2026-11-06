<script lang="ts">
  let {
    activeSlide = "hero",
    onNavigate
  }: {
    activeSlide: "hero" | "history" | "factions" | "demo";
    onNavigate: (section: "hero" | "history" | "factions" | "demo") => void;
  } = $props();

  // Factions has dark green bg (#175b34), other sections have bright green (#07b552)
  let isDarkTheme = $derived(activeSlide === "factions");
</script>

<header class="static-appbar" class:dark-theme={isDarkTheme}>
  <div class="appbar-inner">
    <a
      href="/"
      class="nav-brand"
      title="Return to Main Portfolio"
    >
      ITCODEHERY
    </a>

    <nav class="nav-links">
      <button
        class="nav-link"
        class:active={activeSlide === "hero"}
        onclick={() => onNavigate("hero")}
      >
        HERO
      </button>

      <button
        class="nav-link"
        class:active={activeSlide === "history"}
        onclick={() => onNavigate("history")}
      >
        HISTORY
      </button>

      <button
        class="nav-link"
        class:active={activeSlide === "factions"}
        onclick={() => onNavigate("factions")}
      >
        FACTIONS
      </button>

      <button
        class="nav-link demo-pill"
        class:active={activeSlide === "demo"}
        onclick={() => onNavigate("demo")}
      >
        PLAY DEMO
      </button>
    </nav>
  </div>
</header>

<style>
  .static-appbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    padding: 32px 48px;
    box-sizing: border-box;
    pointer-events: none;
    transition: color 0.4s ease;
  }

  .appbar-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    pointer-events: auto;
  }

  .nav-brand {
    font-family: "Genova", sans-serif;
    font-weight: 500;
    font-size: 1.1rem;
    letter-spacing: 0.16em;
    color: #003615;
    text-decoration: none;
    transition: color 0.3s ease, transform 0.2s ease;
  }

  .nav-brand:hover {
    color: #ffffff;
    transform: translateX(2px);
    text-shadow: -1.5px 0 rgba(255, 30, 80, 0.75), 1.5px 0 rgba(0, 240, 255, 0.75);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-link {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: "Genova", sans-serif;
    font-weight: 500;
    font-size: 0.92rem;
    letter-spacing: 0.18em;
    color: #003816;
    padding: 6px 4px;
    position: relative;
    transition: color 0.3s ease, transform 0.2s ease, text-shadow 0.2s ease;
  }

  .nav-link:hover {
    color: #ffffff;
    transform: translateY(-1px);
    text-shadow: -1.5px 0 rgba(255, 30, 80, 0.75), 1.5px 0 rgba(0, 240, 255, 0.75);
  }

  .nav-link.active {
    font-weight: 700;
  }

  .demo-pill {
    padding: 6px 16px;
    border-radius: 999px;
    background: rgba(0, 45, 18, 0.12);
  }

  .demo-pill:hover,
  .demo-pill.active {
    background: #003816;
    color: #00ff77;
  }

  /* Dark theme overrides for Factions section */
  .dark-theme .nav-brand {
    color: #e5fdf0;
  }
  .dark-theme .nav-brand:hover {
    color: #00ff77;
  }
  .dark-theme .nav-link {
    color: rgba(229, 253, 240, 0.75);
  }
  .dark-theme .nav-link:hover {
    color: #ffffff;
  }
  .dark-theme .demo-pill {
    background: rgba(0, 30, 15, 0.45);
    color: #7ceba0;
  }
  .dark-theme .demo-pill:hover,
  .dark-theme .demo-pill.active {
    background: #00ff77;
    color: #001a0b;
  }

  @media (max-width: 900px) {
    .static-appbar {
      padding: 20px 20px;
    }
    .nav-links {
      gap: 16px;
    }
    .nav-link {
      font-size: 0.8rem;
      letter-spacing: 0.1em;
    }
    .demo-pill {
      padding: 4px 10px;
    }
  }
</style>

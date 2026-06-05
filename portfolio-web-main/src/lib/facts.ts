// Facts about Hari Prasad, sourced from across the portfolio
const allFacts: string[] = [
  "Full Stack App Developer and Designer",
  "Built Heliolisk — a Vim-like terminal text editor with a modern TUI",
  "Spotify artist — check out my music! 🎵",
  "Led a technical session on Rust Programming Fundamentals for my peers 🦀",
  "Writes a blog called Hobservations ✍️",
  "Conducted a Git and GitHub session for Junior Orientation Week",
  "Skills include Flutter, Rust, Svelte, and Figma",
  "Built Forward Meridian — a sci-fi FPS in Godot with South Indian worldbuilding",
  "Member of The Vox Technologia Collective",
  "Designs app redesigns — Blogger, YouTube, WhatsApp & more",
  "Creator of SiGUI, a Rust TUI for Wi-Fi management available on Crates.io",
  "Loves music, coding, and design equally ❤️",
  "Active on Codewars and Codecademy",
  "Designing for the Future.",
  "Has a YouTube channel for music 🎬",
  "Built sidebet-monad, a Web3 Telegram bot integration",
  "Created a Roadmap app design with a modern look",
  "Passionate about intuitive user experiences",
  "Fluent in Mobile Dev, UI/UX, Full Stack & Systems programming",
  "Built Morsels at CodeSprint 2026 — a Flutter & Supabase food logistics app",
  "Crafts intuitive experiences through code & design",
  "Email: hariprasadbk@proton.me 📧",
  "Open-source contributor on GitHub 🐙",
  "Redesigned Twitch based on pure design inspiration",
];

let remaining: string[] = [];

/**
 * Returns a random fact about Hari. Cycles through all facts
 * before repeating any, ensuring variety.
 */
export function getRandomFact(): string {
  if (remaining.length === 0) {
    // Refill and shuffle
    remaining = [...allFacts];
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }
  }
  return remaining.pop()!;
}

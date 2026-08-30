<script lang="ts">
    import { isPerformanceMode } from "../lib/settings";
    import Icon from "@iconify/svelte";

    let isVisible = $state(false);
    let element: HTMLElement | null = $state(null);

    $effect(() => {
        if (!$isPerformanceMode) {
            isVisible = true;
            return;
        }
        
        if (!element) return;
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                isVisible = true;
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        observer.observe(element);

        return () => observer.disconnect();
    });

    const stack = [
        { category: "Languages", items: [
            { name: "Rust", icon: "simple-icons:rust" },
            { name: "Go", icon: "simple-icons:go" },
            { name: "TypeScript", icon: "simple-icons:typescript" },
            { name: "C++", icon: "simple-icons:cplusplus" },
            { name: "Solidity", icon: "simple-icons:solidity" },
            { name: "Dart", icon: "simple-icons:dart" }
        ]},
        { category: "Frameworks", items: [
            { name: "Svelte", icon: "simple-icons:svelte" },
            { name: "React", icon: "simple-icons:react" },
            { name: "Flutter", icon: "simple-icons:flutter" },
            { name: "FastAPI", icon: "simple-icons:fastapi" },
            { name: "Tailwind CSS", icon: "simple-icons:tailwindcss" }
        ]},
        { category: "Tools & Creative", items: [
            { name: "Git", icon: "mdi:git" },
            { name: "Linux", icon: "mdi:linux" },
            { name: "VS Code", icon: "mdi:microsoft-visual-studio-code" },
            { name: "Godot", icon: "mdi:controller" },
            { name: "Blender", icon: "mdi:video-3d" },
            { name: "Figma", icon: "mdi:palette-outline" }
        ]}
    ];
</script>

<section>
    <div class="global-wrapper" bind:this={element}>
        <div class="header" class:visible={isVisible || !$isPerformanceMode}>
            <h4>My Arsenal</h4>
            <h1 class="shimmer-text">Tech Stack</h1>
        </div>
        
        <div class="stack-grid">
            {#each stack as category, i}
                <div class="category-card" class:visible={isVisible || !$isPerformanceMode} style="--reveal-delay: {i * 150}ms;">
                    <h3>{category.category}</h3>
                    <div class="pill-container">
                        {#each category.items as item}
                            <div class="tech-pill">
                                <Icon icon={item.icon} width="24" />
                                <span>{item.name}</span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    section {
        font-family: "DM Sans", sans-serif;
        color: #daf4d2;
        display: flex;
        flex-direction: column;
        min-height: 696px;
        align-items: center;
        justify-content: center;
        padding: 32px 16px;
    }

    .global-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 960px;
    }

    .header {
        text-align: center;
        margin-bottom: 48px;
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .header.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .header h4 {
        font-size: 19.2px;
        font-weight: 400;
        margin-bottom: 8px;
        margin-top: 0;
        color: rgba(218, 244, 210, 0.7);
    }

    .header h1 {
        font-size: 57.6px;
        font-weight: 500;
        letter-spacing: -1.6px;
        padding-bottom: 8px;
        margin: 0;
    }

    .shimmer-text {
        background: linear-gradient(
            90deg,
            rgba(218, 244, 210, 1) 0%,
            rgba(255, 255, 255, 1) 30%,
            rgba(218, 244, 210, 0.6) 50%,
            rgba(255, 255, 255, 1) 70%,
            rgba(218, 244, 210, 1) 100%
        );
        background-size: 200% 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 4s ease-in-out infinite;
    }

    @keyframes shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
    }

    .stack-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
        width: 100%;
    }
    
    .category-card:last-child:nth-child(odd) {
        grid-column: 1 / -1;
    }

    .category-card {
        background: linear-gradient(145deg, rgba(218, 244, 210, 0.06), rgba(218, 244, 210, 0.01));
        border-radius: 24px;
        padding: 32px;
        backdrop-filter: blur(9.6px);
        -webkit-backdrop-filter: blur(9.6px);
        box-shadow: inset 0 0 16px rgba(218, 244, 210, 0.02), 0 8px 24px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(48px) translateZ(0);
        will-change: transform, opacity;
        transition: opacity 0.7s ease-out, transform 0.7s ease-out, box-shadow 0.4s ease;
        transition-delay: var(--reveal-delay, 0ms);
    }

    .category-card.visible {
        opacity: 1;
        transform: translateY(0) translateZ(0);
    }

    .category-card h3 {
        font-size: 20.8px;
        font-weight: 500;
        margin-bottom: 20px;
        margin-top: 0;
        letter-spacing: -0.5px;
    }

    .pill-container {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    .tech-pill {
        display: flex;
        align-items: center;
        gap: 9.6px;
        padding: 11.2px 20.8px;
        background: linear-gradient(145deg, rgba(218, 244, 210, 0.08), rgba(218, 244, 210, 0.02));
        border-radius: 12.8px;
        font-size: 12.8px;
        font-weight: 500;
        box-shadow: 0 3.2px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        cursor: default;
        position: relative;
        overflow: hidden;
    }

    .tech-pill span {
        position: relative;
        z-index: 1;
    }

    @media (max-width: 819.2px) {
        .stack-grid {
            grid-template-columns: 1fr;
        }
        .header h1 {
            font-size: 44.8px;
        }
    }

    @media (max-width: 480px) {
        .category-card {
            padding: 24px 16px;
        }
        .pill-container {
            justify-content: center;
        }
        .header h1 {
            font-size: 33.6px;
        }
        .tech-pill {
            padding: 8px 14.4px;
            font-size: 11.2px;
        }
    }
</style>

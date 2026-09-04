<script>
    import Tag from "./Tag.svelte";
    import { fade } from "svelte/transition";
    import { spring } from "svelte/motion";
    import { playJazzChord } from "../lib/soundEngine";
    
    let chars = "Hari Prasad".split("");
    let waveTriggers = chars.map(() => false);
    
    // Spring for the SVG liquid displacement scale
    let liquidScale = spring(0, { stiffness: 0.05, damping: 0.1 });
    
    function poke() {
        // Play a random lush jazz chord
        playJazzChord();

        // Instant splash, smooth settle back down
        liquidScale.set(35, { hard: true });
        setTimeout(() => {
            liquidScale.set(0);
        }, 10);
        
        // Ripple wave across the letters using CSS classes
        chars.forEach((_, i) => {
            setTimeout(() => {
                waveTriggers[i] = true;
                waveTriggers = waveTriggers; // trigger Svelte reactivity
                setTimeout(() => {
                    waveTriggers[i] = false;
                    waveTriggers = waveTriggers;
                }, 50); // short jump duration, letting CSS transition handle the spring down
            }, i * 35);
        });
    }
</script>

<section>
    <!-- Hidden SVG filter for the liquid distortion -->
    <svg style="position: absolute; width: 0; height: 0; pointer-events: none;">
        <filter id="liquid-name">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.035" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={$liquidScale} xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </svg>

    <div class="globalwrapper" in:fade={{ duration: 2000 }}>
        <div class="text-container">
            <h4>Hello!</h4>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <span class="typing-text">
                <h1 class="liquidy-name" onclick={poke} style="filter: url(#liquid-name);">
                    I'm 
                    {#each chars as char, i}
                        <span class="char" class:waving={waveTriggers[i]}>{char === ' ' ? '\u00A0' : char}</span>
                    {/each}
                </h1>
            </span>
        </div>
        <div class="tags-container">
            <Tag name="Designer" />
            <Tag name="Coder" />
            <Tag name="Musician" />
        </div>
    </div>
</section>

<style>
    section {
        font-family: "DM Sans", sans-serif;
        color: #daf4d2;
        display: flex;
        flex-direction: column;
        height: 696px;
        align-items: center;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        align-self: center;
        align-content: center;
        position: relative;
    }

    .globalwrapper {
        margin-top: 48px;
        padding: 8px;
        align-items: center;
        align-content: center;
        align-self: center;
        text-align: center;
    }

    .text-container {
        align-items: center;
        text-align: center;
        align-self: center;
    }

    h1 {
        font-size: 57.6px;
        font-weight: 400;
        margin: 0px;
        padding-bottom: 8px;
        display: inline-block;
    }

    .liquidy-name {
        cursor: pointer;
        user-select: none;
        transition: color 0.3s ease, text-shadow 0.3s ease;
    }

    .liquidy-name:hover {
        color: #ffffff;
        text-shadow: 0 0 16px rgba(218, 244, 210, 0.5);
    }

    .char {
        display: inline-block;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .char.waving {
        transform: translateY(-15px);
        transition: transform 0.05s ease-out;
    }

    h4 {
        margin: 0px;
        font-size: 19.2px;
        padding-bottom: 8px;
        font-weight: 400;
    }

    .tags-container {
        align-items: center;
        align-self: center;
        justify-content: center;
        justify-self: center;
        display: flex;
        flex-direction: row;
        gap: 8px;
    }

    @media (max-width: 614.4px) {
        h1 {
            font-size: 38.4px;
        }

        h4 {
            font-size: 14.4px;
        }

        .tags-container {
            scale: 0.8;
        }

        .globalwrapper {
            background-size: contain;
        }
    }
</style>

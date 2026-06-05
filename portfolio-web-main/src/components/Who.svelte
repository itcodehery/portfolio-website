<script lang="ts">
    import FlippableCard from "./FlippableCard.svelte";
    import { fly } from "svelte/transition";

    let isVisible = $state(false);
    let element: HTMLElement | null = $state(null);

    $effect(() => {
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isVisible = true;
                        if (element) {
                            observer.unobserve(element);
                        }
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    });
</script>

<section>
    <div class="global-wrapper" bind:this={element}>
        {#if isVisible}
            <div class="leftwrapper" transition:fly={{ duration: 2000 }}>
                <FlippableCard />
            </div>
        {/if}
        <div class="rightwrapper">
            <div class="text-container">
                <h4 class:visible={isVisible} style="--reveal-delay: 0ms;">I am a</h4>
                <h1 class="shimmer-text" class:visible={isVisible} style="--reveal-delay: 200ms;">Full Stack App</h1>
                <h1 class="shimmer-text" class:visible={isVisible} style="--reveal-delay: 400ms;">Developer and</h1>
                <h1 class="shimmer-text" class:visible={isVisible} style="--reveal-delay: 600ms;">Designer</h1>
            </div>
        </div>
    </div>
</section>

<style>
    section {
        background-color: #daf4d2;
        background-image: url("/who-bg.png");
        background-size: cover;
        background-repeat: no-repeat;
        font-family: "DM Sans", sans-serif;
        color: rgba(4, 33, 37, 1);
        display: flex;
        flex-direction: row;
        height: 870px;
        align-items: center;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        align-self: center;
        align-content: center;
    }

    .rightwrapper {
        margin-top: 100px;
        align-items: center;
        align-content: center;
        align-self: center;
        text-align: center;
        transition: all 0.5s ease-in-out;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .leftwrapper {
        align-items: center;
        align-content: center;
        align-self: center;
        text-align: left;
        justify-content: center;
        justify-items: center;
        padding: 20px 120px;
        margin-right: 200px;
    }

    .text-container {
        align-items: center;
        text-align: left;
        align-self: center;
        line-height: 56px;
    }

    /* Staggered line-by-line reveal */
    .text-container h1,
    .text-container h4 {
        opacity: 0;
        transform: translateX(60px);
        transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        transition-delay: var(--reveal-delay, 0ms);
    }

    .text-container h1.visible,
    .text-container h4.visible {
        opacity: 1;
        transform: translateX(0);
    }

    h1 {
        font-size: 72px;
        font-weight: 500;
        letter-spacing: -2px;
        margin: 0px;
        padding-bottom: 10px;
    }

    /* Gradient shimmer animation on h1 */
    .shimmer-text {
        background: linear-gradient(
            90deg,
            rgba(4, 33, 37, 1) 0%,
            rgba(7, 59, 66, 1) 30%,
            rgba(4, 33, 37, 0.6) 50%,
            rgba(7, 59, 66, 1) 70%,
            rgba(4, 33, 37, 1) 100%
        );
        background-size: 200% 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 4s ease-in-out infinite;
    }

    @keyframes shimmer {
        0% {
            background-position: 100% 0;
        }
        100% {
            background-position: -100% 0;
        }
    }

    h4 {
        margin: 0px;
        font-size: 24px;
        padding-bottom: 10px;
        font-weight: 400;
    }

    .global-wrapper {
        display: flex;
        flex-direction: row;
    }

    @media (max-width: 768px) {
        section {
            background-size: auto;
        }
        .global-wrapper {
            display: flex;
            flex-direction: column;
        }

        .leftwrapper {
            margin-right: 0px;
            padding: 20px 20px;
        }

        h1 {
            font-size: 48px;
            letter-spacing: -3px;
        }

        h4 {
            font-size: 24px;
            letter-spacing: -1px;
        }

        .text-container {
            line-height: 34px;
        }
    }
</style>

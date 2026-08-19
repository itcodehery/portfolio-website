<script lang="ts">
    import SoundLab from "../components/SoundLab.svelte";
    import LabFloatingButton from "../components/LabFloatingButton.svelte";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { onNavigate } from "$app/navigation";
    import { dev } from '$app/environment';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';

    injectAnalytics({ mode: dev ? 'development' : 'production' });

    let isLoading = $state(true);
    let loadedPads = $state(0);
    let showApp = $state(false);

    onNavigate((navigation) => {
        if (!document.startViewTransition) return;
        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });

    onMount(() => {
        const interval = setInterval(() => {
            loadedPads++;
            if (loadedPads >= 32) {
                clearInterval(interval);
                setTimeout(() => {
                    isLoading = false;
                    setTimeout(() => showApp = true, 50);
                }, 500);
            }
        }, 40);
    });
</script>

{#if showApp}
    <div in:fade={{ duration: 1000 }}>
        <slot />
        <LabFloatingButton />
    </div>
    <SoundLab isAppIntro={true} />
{/if}

{#if isLoading}
    <div class="loading-overlay" out:fade={{ duration: 800 }}>
        <div class="loading-grid">
            {#each Array(32) as _, i}
                <div class="loading-dot" class:filled={i < loadedPads}></div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .loading-overlay {
        position: fixed;
        inset: 0;
        background: rgba(4, 33, 37, 1);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loading-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 8px;
        width: 240px;
    }
    .loading-dot {
        aspect-ratio: 1;
        border-radius: 4px;
        background: rgba(218, 244, 210, 0.1);
        transition: background 0.1s, box-shadow 0.1s;
    }
    .loading-dot.filled {
        background: #daf4d2;
        box-shadow: 0 0 10px rgba(218, 244, 210, 0.6);
    }

    :global(body) {
        margin: 0;
        padding: 0;
        background-color: rgba(4, 33, 37, 1);
        color: #daf4d2;
        scroll-behavior: smooth;
        padding-bottom: 30px;
        overflow-x: hidden;
        max-width: 100vw;
    }

    /* Custom themed scrollbar */
    :global(::-webkit-scrollbar) {
        width: 6px;
    }

    :global(::-webkit-scrollbar-track) {
        background: #073b42;
    }

    :global(::-webkit-scrollbar-thumb) {
        background: rgba(218, 244, 210, 0.3);
        border-radius: 3px;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background: rgba(218, 244, 210, 0.5);
    }
</style>

<script lang="ts">
    import { playTrack, pauseTrack, resumeTrack, currentlyPlaying } from "../lib/soundEngine";
    import Icon from "@iconify/svelte";

    let {
        name,
        description,
        image = "",
        url = "",
        ytLink = ""
    }: {
        name: string;
        description: string;
        image?: string;
        url?: string;
        ytLink?: string;
    } = $props();

    let isPlaying = $derived($currentlyPlaying?.name === name && $currentlyPlaying?.isPlaying);
    let isLoading = $derived($currentlyPlaying?.name === name && $currentlyPlaying?.isLoading);

    function togglePlay() {
        if (isPlaying && !isLoading) {
            pauseTrack();
        } else if (!isLoading) {
            if ($currentlyPlaying?.name === name) {
                resumeTrack();
            } else {
                playTrack(url, name);
            }
        }
    }
</script>

<div class="music-slide">
    <div class="editorial-card" class:playing={isPlaying && !isLoading} on:click={togglePlay} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && togglePlay()}>
        {#if isPlaying && !isLoading}
            <div class="bg-equalizer">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        {/if}

        <div class="top-row">
            <h3 class="title">{name}</h3>
            
            <button class="icon-play" aria-label={isPlaying ? 'Pause' : 'Play'}>
                {#if isLoading}
                    <Icon icon="ph:spinner-gap-bold" width="36" class="spin-anim" />
                {:else if isPlaying}
                    <div class="playing-bars">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                {:else}
                    <Icon icon="ph:play-light" width="42" />
                {/if}
            </button>
        </div>
        
        <div class="bottom-row">
            <p class="description">{description}</p>
            
            {#if ytLink}
                <a href={ytLink} target="_blank" class="yt-icon-pill" aria-label="Watch on YouTube" on:click|stopPropagation>
                    <Icon icon="ph:youtube-logo-fill" width="20" /> 
                    <span>Watch</span>
                </a>
            {/if}
        </div>
    </div>
</div>

<style>
    .music-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 16px;
    }

    .editorial-card {
        width: 100%;
        height: 224px;
        border: 1px solid rgba(162, 119, 255, 0.15);
        border-radius: 19.2px;
        background-color: rgba(14, 5, 26, 0.6);
        padding: 25.6px 25.6px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        font-family: 'DM Sans', sans-serif;
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }
    
    .editorial-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url('/home-bg.png');
        background-size: cover;
        background-position: center;
        opacity: 0.3;
        filter: grayscale(100%);
        mix-blend-mode: overlay;
        z-index: 0;
        pointer-events: none;
        transition: opacity 0.5s;
    }

    .editorial-card:hover {
        border-color: rgba(162, 119, 255, 0.4);
        box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
    }
    
    .editorial-card:hover::before {
        opacity: 0.4;
    }

    .editorial-card.playing {
        border-color: rgba(162, 119, 255, 0.7);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), inset 0 0 16px rgba(162, 119, 255, 0.05);
    }

    .editorial-card.playing::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(162, 119, 255, 0.12) 0%, rgba(14, 5, 26, 0.5) 100%);
        z-index: 0;
        pointer-events: none;
    }

    .editorial-card > * {
        z-index: 2;
    }

    /* Background Equalizer Animation */
    .bg-equalizer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 9.6px;
        opacity: 0.06;
        z-index: 1;
        pointer-events: none;
    }

    .bg-equalizer .bar {
        width: 15%;
        background: #a277ff;
        animation: bounce 1.2s ease-in-out infinite alternate;
        border-radius: 16px 16px 0 0;
    }

    .bg-equalizer .bar:nth-child(1) { animation-delay: 0.1s; height: 30%; }
    .bg-equalizer .bar:nth-child(2) { animation-delay: 0.4s; height: 70%; }
    .bg-equalizer .bar:nth-child(3) { animation-delay: 0.2s; height: 50%; }
    .bg-equalizer .bar:nth-child(4) { animation-delay: 0.5s; height: 90%; }

    @keyframes bounce {
        0% { transform: scaleY(0.3); transform-origin: bottom; }
        100% { transform: scaleY(1); transform-origin: bottom; }
    }

    .top-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
        position: relative;
    }

    .title {
        font-size: 33.6px;
        font-weight: 500;
        letter-spacing: -0.5px;
        color: #ffffff;
        margin: 0;
        line-height: 1.1;
        max-width: 80%;
        transition: color 0.4s;
    }

    .editorial-card.playing .title {
        color: #e4d5ff;
    }

    .icon-play {
        background: transparent;
        border: none;
        color: rgba(162, 119, 255, 0.7);
        cursor: pointer;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 33.6px;
    }

    .icon-play:hover {
        transform: scale(1.15);
        color: #ffffff;
    }

    :global(.spin-anim) {
        animation: rotate 1s linear infinite;
        opacity: 0.7;
    }

    @keyframes rotate {
        100% { transform: rotate(360deg); }
    }

    .playing-bars {
        display: flex;
        gap: 4.8px;
        height: 22.4px;
        align-items: flex-end;
    }

    .playing-bars .bar {
        width: 3.2px;
        background: #a277ff;
        animation: pulse 0.8s ease-in-out infinite alternate;
        border-radius: 1.6px;
    }

    .playing-bars .bar:nth-child(2) { animation-delay: 0.2s; }
    .playing-bars .bar:nth-child(3) { animation-delay: 0.4s; }

    @keyframes pulse { 
        0% { height: 30%; } 
        100% { height: 100%; } 
    }

    .bottom-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 32px;
        position: relative;
    }

    .description {
        font-size: 12px;
        color: #bfa3ff;
        opacity: 0.75;
        line-height: 1.6;
        margin: 0;
        font-weight: 400;
        max-width: 75%;
    }

    .yt-icon-pill {
        display: flex;
        align-items: center;
        gap: 4.8px;
        padding: 6.4px 12.8px;
        border-radius: 16px;
        background: rgba(255, 0, 0, 0.1);
        color: #ff4d4d;
        border: 1px solid rgba(255, 0, 0, 0.2);
        font-size: 11.2px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        white-space: nowrap;
    }

    .yt-icon-pill:hover {
        background: rgba(255, 0, 0, 0.2);
        color: #ff6666;
        transform: translateY(-1.6px);
        box-shadow: 0 6.4px 12.8px rgba(255, 0, 0, 0.15);
    }

    @media (max-width: 614.4px) {
        .editorial-card {
            height: 208px;
            padding: 19.2px 16px;
        }
        .title {
            font-size: 25.6px;
        }
        .description {
            font-size: 11.2px;
        }
    }
</style>

<script lang="ts">
    import { playTrack, pauseTrack, resumeTrack, currentlyPlaying } from "../lib/soundEngine";

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

    // Sync play state with global store
    let isPlaying = $derived($currentlyPlaying?.name === name && $currentlyPlaying?.isPlaying);

    function togglePlay() {
        if (isPlaying) {
            pauseTrack();
        } else {
            if ($currentlyPlaying?.name === name) {
                resumeTrack();
            } else {
                playTrack(url, name);
            }
        }
    }
</script>

<div class="music-slide">
    <div class="music-card" class:playing={isPlaying}>
        <div class="content-row">
            <div class="info-section">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            
            <div class="controls-section">
                {#if url}
                    <button class="play-btn" on:click={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                        {isPlaying ? '⏸' : '▶'}
                    </button>
                {/if}
                {#if ytLink}
                    <a href={ytLink} target="_blank" rel="noopener noreferrer" class="yt-button">
                        YouTube ↗
                    </a>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .music-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 20px;
    }

    .music-card {
        width: 100%;
        max-width: 600px;
        background: rgba(14, 5, 26, 0.6);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(162, 119, 255, 0.15);
        border-radius: 16px;
        padding: 24px 32px;
        color: #a277ff;
        font-family: 'DM Sans', sans-serif;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
    }
    
    .music-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
        border-color: rgba(162, 119, 255, 0.3);
    }

    .music-card.playing {
        border-color: rgba(162, 119, 255, 0.6);
        box-shadow: 0 0 30px rgba(162, 119, 255, 0.2);
    }

    .content-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }

    .info-section {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    h3 {
        margin: 0 0 8px 0;
        font-size: 28px;
        font-weight: 600;
        letter-spacing: -0.5px;
        color: #e4d5ff;
    }

    p {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        font-weight: 400;
        color: #a277ff;
        opacity: 0.8;
    }

    .controls-section {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .play-btn {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(162, 119, 255, 0.1);
        border: 1px solid rgba(162, 119, 255, 0.3);
        color: #a277ff;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s ease;
        padding-left: 4px; /* optical center for play icon */
    }

    .play-btn:hover {
        background: #a277ff;
        color: #0e051a;
        transform: scale(1.1);
        box-shadow: 0 10px 20px rgba(162, 119, 255, 0.3);
    }

    .music-card.playing .play-btn {
        padding-left: 0; /* pause icon is centered */
        background: #a277ff;
        color: #0e051a;
    }

    .yt-button {
        color: #a277ff;
        font-family: 'DM Sans', sans-serif;
        text-decoration: none;
        font-weight: 600;
        display: inline-flex;
        padding: 12px 24px;
        background: rgba(162, 119, 255, 0.1);
        border: 1px solid rgba(162, 119, 255, 0.3);
        border-radius: 50px;
        transition: all 0.3s ease;
        font-size: 14px;
    }

    .yt-button:hover {
        background: rgba(162, 119, 255, 0.2);
        color: #e4d5ff;
        transform: translateY(-2px);
    }

    @supports (-moz-appearance: none) {
        .music-card {
            background: rgba(14, 5, 26, 0.95);
            backdrop-filter: none;
        }
    }
    
    @media (max-width: 768px) {
        .content-row {
            flex-direction: column;
            align-items: flex-start;
        }
        .music-card {
            padding: 20px;
        }
    }
</style>

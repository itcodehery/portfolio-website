<script lang="ts">
    import Icon from "@iconify/svelte";
    import { scale, fade, slide, blur } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { currentlyPlaying, pauseTrack, resumeTrack, trackProgress, seekTrack } from "../lib/soundEngine";
    import { musicProjects, codeProjects } from "../lib/projects";

    let isOpen = $state(false);

    // Only show miniplayer if there's an active track. If lab is open, we can optionally hide it or just keep the shape.
    let isPlaying = $derived($currentlyPlaying?.isPlaying || false);
    let hasTrack = $derived($currentlyPlaying !== null);

    let trackNameWidth = $state(0);
    let trackNameScrollWidth = $state(0);
    let shouldMarquee = $derived(trackNameScrollWidth > trackNameWidth);

    function toggleMenu(e: MouseEvent) {
        e.stopPropagation();
        isOpen = !isOpen;
    }

    function jumpToCurrentSong() {
        if (!$currentlyPlaying) return;
        const index = musicProjects.findIndex(p => p.name === $currentlyPlaying.name);
        if (index !== -1) {
            const pinStart = 6000 + (codeProjects.length * 1200);
            const numMusic = musicProjects.length;
            const pinEnd = pinStart + Math.max(0, numMusic - 1) * 1200;
            
            const progress = index / Math.max(1, numMusic - 1);
            const targetScrollY = pinStart + progress * (pinEnd - pinStart);
            window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
        }
    }

    function closeMenu() {
        isOpen = false;
    }
    
    function preventClose(e: MouseEvent) {
        e.stopPropagation();
    }

    function togglePlayState(e: MouseEvent) {
        e.stopPropagation();
        if (isPlaying) {
            pauseTrack();
        } else {
            resumeTrack();
        }
    }

    function formatTime(seconds: number) {
        if (!seconds || isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function onSeek(e: Event) {
        const target = e.target as HTMLInputElement;
        seekTrack(Number(target.value));
    }
</script>

<svelte:window onclick={closeMenu} />

<div class="lab-container" class:has-player={hasTrack && !isOpen}>
    <div class="pill-wrapper" class:expanded={hasTrack && !isOpen}>
        <button class="lab-floating-button" class:active={isOpen} onclick={toggleMenu} aria-label="Toggle Lab Menu">
            <Icon icon={isOpen ? "mdi:close" : "material-symbols:science"} width="24" />
        </button>

        {#if hasTrack && !isOpen}
            <div class="miniplayer-content" transition:fade={{ duration: 200 }}>
                {#if $currentlyPlaying?.isTransitioning}
                    <div class="transition-overlay" in:blur={{ amount: 15, duration: 600, delay: 300 }} out:blur={{ amount: 15, duration: 1500 }}>
                        <div class="slide-icon">
                            <Icon icon="ph:fast-forward-fill" width="24" />
                        </div>
                    </div>
                {/if}

                {#if !$currentlyPlaying?.isTransitioning}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="track-info" style="cursor: pointer;" in:blur={{ amount: 10, duration: 800, delay: 1000 }} out:blur={{ amount: 10, duration: 300 }} onclick={jumpToCurrentSong}>
                        <div class="track-header">
                            <span class="now-playing-label">Now Playing</span>
                            <span class="time-label">{formatTime($trackProgress.currentTime)} / {formatTime($trackProgress.duration)}</span>
                        </div>
                        <div class="track-name-container" class:has-marquee={shouldMarquee} bind:clientWidth={trackNameWidth}>
                            <div class="track-name-scroller" class:marquee={shouldMarquee}>
                                <span class="track-name" style="display: inline-block;" bind:clientWidth={trackNameScrollWidth}>{$currentlyPlaying?.name}</span>
                                {#if shouldMarquee}
                                    <span class="track-name" style="display: inline-block;">{$currentlyPlaying?.name}</span>
                                {/if}
                            </div>
                        </div>
                        <input 
                            type="range" 
                            class="seek-bar" 
                            min="0" 
                            max={$trackProgress.duration || 100} 
                            value={$trackProgress.currentTime} 
                            oninput={onSeek}
                            onclick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <button class="mini-play-btn" in:blur={{ amount: 10, duration: 800, delay: 1000 }} out:blur={{ amount: 10, duration: 300 }} onclick={togglePlayState}>
                        {#if isPlaying}
                            <Icon icon="mdi:pause" width="24" />
                        {:else}
                            <Icon icon="mdi:play" width="24" />
                        {/if}
                    </button>
                {/if}
            </div>
        {/if}
    </div>

    {#if isOpen}
        <div 
            class="lab-menu" 
            onclick={preventClose}
            in:scale={{ duration: 250, start: 0.9, opacity: 0, easing: cubicOut }}
            out:fade={{ duration: 150 }}
        >
            <div class="menu-header">
                <h3>The Lab</h3>
                <span class="badge">Experiments</span>
            </div>
            
            <div class="menu-items">
                <button class="menu-item">
                    <div class="menu-icon"><Icon icon="material-symbols:music-note" width="20" /></div>
                    <div class="menu-content">
                        <h4>The Sound Lab</h4>
                        <p>Web Audio Synthesizer</p>
                    </div>
                    <span class="status-dot active"></span>
                </button>
                
                <button class="menu-item">
                    <div class="menu-icon"><Icon icon="material-symbols:deployed-code" width="20" /></div>
                    <div class="menu-content">
                        <h4>WebGL Physics</h4>
                        <p>Soft-body simulation</p>
                    </div>
                    <span class="status-dot active"></span>
                </button>
                
                <button class="menu-item disabled">
                    <div class="menu-icon"><Icon icon="material-symbols:animation" width="20" /></div>
                    <div class="menu-content">
                        <h4>Generative Art</h4>
                        <p>Procedural algorithms</p>
                    </div>
                    <span class="status-dot pending"></span>
                </button>
            </div>
        </div>
    {/if}
</div>

<style>
    .lab-container {
        position: fixed;
        bottom: 30px;
        left: 30px;
        z-index: 1000;
        transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .pill-wrapper {
        display: flex;
        align-items: center;
        background-color: transparent;
        border-radius: 50px;
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        width: 50px;
        height: 50px;
        box-sizing: border-box;
        position: relative;
    }

    .pill-wrapper.expanded {
        width: 280px;
        height: 64px;
        padding: 4px;
        background-color: var(--soundlab-bg, rgba(4, 33, 37, 0.85));
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid var(--soundlab-pad-border, rgba(218, 244, 210, 0.2));
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        border-radius: 32px;
    }

    .lab-floating-button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--soundlab-bg, rgba(4, 33, 37, 0.6));
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: var(--theme-text, rgba(218, 244, 210, 0.7));
        border: 1px solid var(--soundlab-pad-border, rgba(218, 244, 210, 0.15));
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
        transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        margin: 0;
    }

    .pill-wrapper.expanded .lab-floating-button {
        width: 54px;
        height: 54px;
        background-color: var(--soundlab-bg, rgba(4, 33, 37, 0.9));
        border-color: var(--soundlab-pad-border, rgba(218, 244, 210, 0.15));
        color: var(--theme-text, rgba(218, 244, 210, 0.7));
        box-shadow: none;
    }

    .lab-floating-button:hover, .lab-floating-button.active {
        transform: scale(1.1);
        background-color: var(--soundlab-bg, rgba(7, 59, 66, 0.9));
        border-color: var(--soundlab-pad-border, rgba(218, 244, 210, 0.4));
        color: var(--theme-text, #daf4d2);
        box-shadow: 0 8px 25px var(--soundlab-pad-border, rgba(218, 244, 210, 0.15));
    }
    
    .pill-wrapper.expanded .lab-floating-button:hover {
        transform: scale(1.05);
        background-color: var(--soundlab-bg, rgba(7, 59, 66, 0.9));
        color: var(--theme-text, #daf4d2);
        border-color: var(--soundlab-pad-border, rgba(218, 244, 210, 0.3));
    }

    .lab-floating-button:not(.active):not(.expanded):hover {
        transform: scale(1.1) rotate(5deg);
    }

    /* Miniplayer */
    .miniplayer-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 14px;
        padding-right: 14px;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        opacity: 1;
        height: 100%;
        position: relative;
    }

    .transition-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        pointer-events: none;
    }

    .slide-icon {
        animation: slideSlowly 3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--theme-text, #daf4d2);
    }

    @keyframes slideSlowly {
        0% { transform: translateX(-15px); }
        100% { transform: translateX(15px); }
    }

    .track-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        flex: 1;
        margin-right: 12px;
        gap: 3px;
    }

    .track-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .now-playing-label {
        font-family: 'DM Sans', sans-serif;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--theme-text, #daf4d2);
        opacity: 0.7;
        text-transform: uppercase;
        transition: color 0.4s, opacity 0.4s;
    }

    .time-label {
        font-family: 'DM Sans', sans-serif;
        font-size: 9px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.4);
        font-variant-numeric: tabular-nums;
    }

    .track-name-container {
        width: 100%;
        overflow: hidden;
        margin-bottom: 2px;
        position: relative;
    }

    .track-name-container.has-marquee {
        mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
    }

    .track-name-scroller {
        display: flex;
        width: max-content;
        gap: 24px; /* gap between duplicates */
    }

    .track-name-scroller.marquee {
        animation: marquee 8s linear infinite;
    }

    .track-name {
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: var(--theme-text, #a277ff);
        line-height: 1.2;
        white-space: nowrap;
    }

    @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-50% - 12px)); }
    }

    .seek-bar {
        -webkit-appearance: none;
        width: 100%;
        height: 10px; /* Fixed height for reliable layout spacing */
        background: transparent;
        outline: none;
        cursor: pointer;
        margin: 0;
        padding: 0;
    }

    .seek-bar::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 2px;
        margin-top: 3px;
    }

    .seek-bar::-moz-range-track {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 2px;
    }

    .seek-bar::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 6px;
        border-radius: 3px;
        background: var(--theme-text, #a277ff);
        cursor: pointer;
        margin-top: -1px; /* (6 - 4) / 2 = 1 */
        transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }

    .seek-bar::-moz-range-thumb {
        width: 16px;
        height: 6px;
        border-radius: 3px;
        background: var(--theme-text, #a277ff);
        border: none;
        cursor: pointer;
        transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }

    .seek-bar::-webkit-slider-thumb:hover {
        transform: scale(1.3);
    }
    
    .seek-bar::-moz-range-thumb:hover {
        transform: scale(1.3);
    }

    .mini-play-btn {
        background: transparent;
        border: none;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        transition: transform 0.2s ease, color 0.2s ease;
    }

    .mini-play-btn:hover {
        transform: scale(1.1);
        color: var(--theme-text, #a277ff);
    }

    /* Context Menu Styles */
    .lab-menu {
        position: absolute;
        bottom: 70px;
        left: 0;
        width: 280px;
        background: rgba(5, 43, 48, 0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(218, 244, 210, 0.2);
        border-radius: 16px;
        padding: 8px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05);
        transform-origin: bottom left;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid rgba(218, 244, 210, 0.1);
        margin-bottom: 4px;
    }

    .menu-header h3 {
        margin: 0;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #daf4d2;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .badge {
        font-size: 10px;
        background: rgba(218, 244, 210, 0.1);
        padding: 2px 6px;
        border-radius: 100px;
        color: rgba(218, 244, 210, 0.7);
    }

    .menu-items {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 16px;
        background: transparent;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
        width: 100%;
    }

    .menu-item:hover:not(.disabled) {
        background: rgba(218, 244, 210, 0.08);
    }

    .menu-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        color: #daf4d2;
    }

    .menu-content {
        flex: 1;
    }

    .menu-content h4 {
        margin: 0 0 2px 0;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
    }

    .menu-content p {
        margin: 0;
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .status-dot.active {
        background: #88c07e;
        box-shadow: 0 0 8px rgba(136, 192, 126, 0.6);
    }

    .status-dot.pending {
        background: rgba(255, 255, 255, 0.2);
    }

    .menu-item.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    :global(body.modal-open) .lab-container {
        opacity: 0;
        pointer-events: none;
        transform: scale(0.8) translateY(20px);
    }

        @media (max-width: 850px) {
        .lab-container {
            bottom: 20px;
            left: 20px;
        }
        .lab-floating-button {
            width: 44px;
            height: 44px;
        }
    }
</style>

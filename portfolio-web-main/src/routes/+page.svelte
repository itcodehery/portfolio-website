<script lang="ts">
    import { onMount } from "svelte";
    import Finale from "../components/Finale.svelte";
    import Intro from "../components/Intro.svelte";
    import Who from "../components/Who.svelte";
    import ThreeScene from "../components/ThreeScene.svelte";
    import ScatteredProject from "../components/ScatteredProject.svelte";
    import { codeProjects, designProjects } from "../lib/projects";
    import { goto } from "$app/navigation";
    import { fly, fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import Icon from "@iconify/svelte";
    import { browser } from "$app/environment";
    import LinksPage from './links/+page.svelte';
    import PortfolioPage from './portfolio/+page.svelte';
    import JourneyPage from './journey/+page.svelte';

    let windowScrollY = 0;
    let targetScroll = 0;
    let scrollY = 0;
    let maxScroll = 30000;
    let scrollProgress = 0;
    let innerHeight = 1000; // default for SSR

    const timelineSections = [
        { label: 'Start', z: 0 },
        { label: 'About', z: 1500 },
        { label: 'Code', z: 3000 },
        { label: 'Design', z: 21000 },
        { label: 'Contact', z: 30000 }
    ];

    let activeModal: string | null = null;

    $: targetScroll = windowScrollY;

    $: indicatorTop = getIndicatorTop(scrollY);
    $: closeness = getCloseness(scrollY);

    $: if (browser) {
        if (activeModal !== null) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }

    function getIndicatorTop(scroll: number) {
        if (scroll <= timelineSections[0].z) return 0;
        if (scroll >= timelineSections[timelineSections.length - 1].z) return (timelineSections.length - 1) * 40;
        
        for (let i = 0; i < timelineSections.length - 1; i++) {
            const z1 = timelineSections[i].z;
            const z2 = timelineSections[i+1].z;
            if (scroll >= z1 && scroll < z2) {
                const progress = (scroll - z1) / (z2 - z1);
                return (i * 40) + (progress * 40);
            }
        }
        return 0;
    }

    function getCloseness(scroll: number) {
        let minDiff = Infinity;
        for (const sec of timelineSections) {
            const diff = Math.abs(scroll - sec.z);
            if (diff < minDiff) minDiff = diff;
        }
        return Math.max(0, 1 - (minDiff / 400));
    }

    onMount(() => {
        let frameId: number;
        const renderScroll = () => {
            scrollY += (targetScroll - scrollY) * 0.05; // Inertia factor
            scrollProgress = scrollY / (document.body.scrollHeight - innerHeight || 1);
            frameId = requestAnimationFrame(renderScroll);
        };
        renderScroll();
        return () => cancelAnimationFrame(frameId);
    });

    function getOpacity(sectionZ: number, currentScroll: number) {
        const currentZ = sectionZ + currentScroll;
        if (currentZ < -1500 || currentZ > 1000) return 0;
        if (currentZ < 0) {
            return 1 - (Math.abs(currentZ) / 1500);
        } else {
            return 1 - (currentZ / 1000);
        }
    }

    function getBlur(sectionZ: number, currentScroll: number) {
        const currentZ = sectionZ + currentScroll;
        if (currentZ > 0) {
            return currentZ / 100; // blurs as it passes behind camera
        } else if (currentZ < 0) {
            return Math.min(Math.abs(currentZ) / 200, 15);
        }
        return 0;
    }

    // Function to calculate curved path X coordinate based on Z
    function getCurveX(z: number) {
        return Math.sin(z / 2000) * 800;
    }

    // Custom wipe transitions with cross-browser support
    function wipeIn(node: Element, { duration = 800, delay = 0 }) {
        return {
            duration, delay, easing: cubicInOut,
            css: (t: number) => {
                const percent = (1 - t) * 100;
                return `
                    opacity: ${t};
                    clip-path: inset(0 0 0 ${percent}%);
                    -webkit-clip-path: inset(0 0 0 ${percent}%);
                `;
            }
        };
    }

    function wipeOut(node: Element, { duration = 800, delay = 0 }) {
        return {
            duration, delay, easing: cubicInOut,
            css: (t: number) => {
                const percent = (1 - t) * 100;
                return `
                    opacity: ${t};
                    clip-path: inset(0 ${percent}% 0 0);
                    -webkit-clip-path: inset(0 ${percent}% 0 0);
                `;
            }
        };
    }

    $: activeSection = getActiveSection(scrollY);

    function getActiveSection(scroll: number) {
        if (scroll >= 3000 && scroll < 21000) return 'Code Portfolio';
        if (scroll >= 21000 && scroll < 29000) return 'Design Portfolio';
        return '';
    }
</script>

<svelte:window bind:scrollY={windowScrollY} bind:innerHeight={innerHeight} />

<ThreeScene {scrollProgress} />

<div class="fixed-section-title">
    {#if activeSection !== ''}
        {#key activeSection}
            <div 
                in:wipeIn={{ duration: 600, delay: 200 }} 
                out:wipeOut={{ duration: 600 }} 
                class="title-content"
            >
                {activeSection}
            </div>
        {/key}
    {/if}
</div>

<button 
    class="back-to-top" 
    class:visible={scrollY > 1000}
    onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    aria-label="Back to Start"
>
    <Icon icon="material-symbols:arrow-upward" width="24" />
</button>

<div class="scroll-container" class:faded={activeModal !== null} style="height: {maxScroll + innerHeight}px;">
    <!-- Snap points for magnetism -->
    <div class="snap-point" style="top: 0px;"></div>
    <div class="snap-point" style="top: 1500px;"></div>
    <div class="snap-point" style="top: 3000px;"></div>
    {#each codeProjects as _, i}
        <div class="snap-point" style="top: {4500 + (i * 1500)}px;"></div>
    {/each}
    <div class="snap-point" style="top: {4500 + (codeProjects.length * 1500)}px;"></div>
    {#each designProjects as _, i}
        <div class="snap-point" style="top: {6000 + (codeProjects.length * 1500) + (i * 1500)}px;"></div>
    {/each}
    <div class="snap-point" style="top: {maxScroll}px;"></div>

    <!-- Timeline Tracker -->
    <div class="timeline" class:faded={activeModal !== null}>
        <div class="timeline-indicator" style="top: {indicatorTop}px; width: {12 + closeness * 24}px; opacity: {0.3 + closeness * 0.7};"></div>
        {#each timelineSections as section, i}
            <button class="timeline-item" style="top: {i * 40}px" onclick={() => window.scrollTo({ top: section.z, behavior: 'smooth' })}>
                <span class="timeline-label" class:active={Math.abs(scrollY - section.z) < 400}>{section.label}</span>
            </button>
        {/each}
    </div>

    <!-- Fixed Navigation on Landing Page -->
    <nav class="landing-nav" class:faded={activeModal !== null}>
        <div class="nav-links">
            {#each [
                { id: 'links', icon: 'mdi:link-variant', label: 'Links' },
                { id: 'portfolio', icon: 'mdi:code-braces-box', label: 'Portfolio' },
                { id: 'journey', icon: 'mdi:compass-outline', label: 'Journey' }
            ] as link}
                <button class="nav-btn" onclick={() => activeModal = link.id}>
                    <div class="icon-wrap"><Icon icon={link.icon} width="24" /></div>
                    <span class="nav-text">{link.label}</span>
                </button>
            {/each}
        </div>
    </nav>

    <!-- The 3D CSS container -->
    <div class="perspective-container" class:faded={activeModal !== null}>
        <!-- Move scene in opposite direction of curve to make camera follow it -->
        <div class="scene-3d" style="transform: translateZ({scrollY}px) translateX({-getCurveX(-scrollY)}px);">
            <div class="section-wrapper" style="transform: translateZ(0px) translateX(0px); pointer-events: {getOpacity(0, scrollY) > 0.1 ? 'auto' : 'none'};">
                <div class="content-wrapper" style="opacity: {getOpacity(0, scrollY)}; filter: blur({getBlur(0, scrollY)}px);">
                    <Intro />
                </div>
            </div>
            
            <div class="section-wrapper" style="transform: translateZ(-1500px) translateX({getCurveX(-1500)}px); pointer-events: {getOpacity(-1500, scrollY) > 0.1 ? 'auto' : 'none'};">
                <div class="content-wrapper" style="opacity: {getOpacity(-1500, scrollY)}; filter: blur({getBlur(-1500, scrollY)}px);">
                    <Who />
                </div>
            </div>

            <div class="section-wrapper title-wrapper" style="transform: translateZ(-3000px) translateX({getCurveX(-3000)}px); pointer-events: none;">
                <div class="content-wrapper" style="opacity: {getOpacity(-3000, scrollY)}; filter: blur({getBlur(-3000, scrollY)}px);">
                    <h2 class="section-title">Code Portfolio</h2>
                </div>
            </div>

            {#each codeProjects as project, i}
                {@const zPos = -4500 - (i * 1500)}
                <div class="section-wrapper" 
                     style="transform: translateZ({zPos}px) translateX({getCurveX(zPos) + (i % 2 === 0 ? -1 : 1) * 200}px) translateY({-150 + (i % 3 === 0 ? -1 : 1) * 50}px); 
                            pointer-events: {getOpacity(zPos, scrollY) > 0.1 ? 'auto' : 'none'};">
                    <div class="content-wrapper" style="opacity: {getOpacity(zPos, scrollY)}; filter: blur({getBlur(zPos, scrollY)}px);">
                        <ScatteredProject {...project} />
                    </div>
                </div>
            {/each}

            <div class="section-wrapper title-wrapper" style="transform: translateZ({-4500 - (codeProjects.length * 1500)}px) translateX({getCurveX(-4500 - (codeProjects.length * 1500))}px); pointer-events: none;">
                <div class="content-wrapper" style="opacity: {getOpacity(-4500 - (codeProjects.length * 1500), scrollY)}; filter: blur({getBlur(-4500 - (codeProjects.length * 1500), scrollY)}px);">
                    <h2 class="section-title">Design Portfolio</h2>
                </div>
            </div>

            {#each designProjects as project, i}
                {@const zPos = -6000 - (codeProjects.length * 1500) - (i * 1500)}
                <div class="section-wrapper" 
                     style="transform: translateZ({zPos}px) translateX({getCurveX(zPos) + (i % 2 === 0 ? 1 : -1) * 200}px) translateY({-150 + (i % 3 === 0 ? 1 : -1) * 50}px); 
                            pointer-events: {getOpacity(zPos, scrollY) > 0.1 ? 'auto' : 'none'};">
                    <div class="content-wrapper" style="opacity: {getOpacity(zPos, scrollY)}; filter: blur({getBlur(zPos, scrollY)}px);">
                        <ScatteredProject {...project} />
                    </div>
                </div>
            {/each}

            <div class="section-wrapper" style="transform: translateZ(-30000px) translateX({getCurveX(-30000)}px); pointer-events: {getOpacity(-30000, scrollY) > 0.1 ? 'auto' : 'none'};">
                <div class="content-wrapper" style="opacity: {getOpacity(-30000, scrollY)}; filter: blur({getBlur(-30000, scrollY)}px);">
                    <Finale />
                </div>
            </div>
        </div>
    </div>
</div>

{#if activeModal !== null}
    <div class="modal-overlay" transition:fade={{ duration: 600 }}>
        <button class="close-btn" onclick={() => activeModal = null} aria-label="Close">
            <Icon icon="mdi:close" width="24" />
        </button>
        <div class="modal-content" transition:fly={{ x: 150, duration: 800, easing: cubicInOut }}>
            <div class="modal-scroll-area">
                {#if activeModal === 'links'}
                    <LinksPage />
                {:else if activeModal === 'portfolio'}
                    <PortfolioPage />
                {:else if activeModal === 'journey'}
                    <JourneyPage />
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    :global(html) {
        scroll-snap-type: y mandatory;
        scroll-behavior: smooth;
    }
    :global(body) {
        overflow-x: hidden;
    }
    .snap-point {
        position: absolute;
        width: 100%;
        height: 1px;
        scroll-snap-align: start;
        pointer-events: none;
    }
    .landing-nav {
        position: fixed;
        top: 50%;
        left: 40px;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        z-index: 100;
    }
    .nav-links {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .nav-btn {
        background: transparent;
        border: none;
        color: #daf4d2;
        font-family: 'DM Sans', sans-serif;
        font-size: 18px;
        display: flex;
        align-items: center;
        cursor: pointer;
        opacity: 0.6;
        transition: color 0.3s, transform 0.3s, opacity 0.3s;
        text-shadow: 0 2px 4px rgba(4,33,37,0.8);
        position: relative;
        padding: 8px 0;
    }
    .nav-text {
        position: absolute;
        left: 40px; /* 24px icon + 16px gap */
        white-space: nowrap;
        opacity: 0;
        filter: blur(8px);
        transform: translateX(-15px);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        pointer-events: none;
    }
    .nav-btn:hover {
        color: #fff;
        transform: translateY(-2px);
        opacity: 1;
    }
    .nav-btn:hover .nav-text {
        opacity: 1;
        filter: blur(0px);
        transform: translateX(0px);
    }
    .perspective-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        perspective: 1000px;
        overflow: hidden;
        pointer-events: none;
    }
    
    /* Timeline Tracker CSS */
    .timeline {
        position: fixed;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
        width: 120px;
        height: 160px; /* 4 gaps * 40px */
        z-index: 100;
        pointer-events: none;
    }
    .timeline-indicator {
        position: absolute;
        right: 0;
        height: 2px;
        margin-top: -1px;
        background: #daf4d2;
        border-radius: 2px;
        box-shadow: 0 0 10px rgba(218, 244, 210, 0.8);
        will-change: top, width, opacity;
    }
    .timeline-item {
        position: absolute;
        right: 0;
        width: 100%;
        height: 24px;
        margin-top: -12px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background: transparent;
        border: none;
        cursor: pointer;
        pointer-events: auto;
        padding-right: 45px; /* space for the indicator line */
    }
    .timeline-label {
        font-family: 'DM Sans', sans-serif;
        font-size: 11px;
        color: rgba(218, 244, 210, 0.4);
        letter-spacing: 2px;
        text-transform: uppercase;
        white-space: nowrap;
        transition: color 0.3s;
    }
    .timeline-item:hover .timeline-label {
        color: rgba(218, 244, 210, 0.8);
    }
    .timeline-label.active {
        color: #daf4d2;
        font-weight: 600;
        text-shadow: 0 0 10px rgba(218, 244, 210, 0.5);
    }
    
    .faded {
        opacity: 0 !important;
        pointer-events: none !important;
        transition: opacity 0.5s ease !important;
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1000;
        display: flex;
        justify-content: flex-end;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
    }
    .modal-content {
        width: 90vw;
        max-width: 1300px;
        height: 96vh;
        margin: 2vh 2vw;
        background: #042125;
        border-radius: 30px;
        box-shadow: -20px 0 60px rgba(0,0,0,0.6);
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(218, 244, 210, 0.15);
    }
    .modal-scroll-area {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .modal-scroll-area::-webkit-scrollbar {
        display: none;
    }
    .close-btn {
        position: absolute;
        top: 4vh;
        right: calc(90vw + 4vw);
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: rgba(218, 244, 210, 0.1);
        border: 1px solid rgba(218, 244, 210, 0.3);
        color: #daf4d2;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1010;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .close-btn:hover {
        background: #daf4d2;
        color: #042125;
        transform: rotate(90deg) scale(1.1);
    }
    
    @media (max-width: 768px) {
        .modal-content {
            width: 100vw;
            height: 100vh;
            margin: 0;
            border-radius: 0;
        }
        .close-btn {
            top: 20px;
            right: 20px;
            background: rgba(4, 33, 37, 0.8);
            border-color: #daf4d2;
        }
    }

    .scene-3d {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        position: absolute;
        top: 0;
        left: 0;
        will-change: transform;
    }
    .section-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: auto;
    }
    .content-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        will-change: opacity, filter;
    }
    .title-wrapper {
        pointer-events: none;
    }
    .section-title {
        font-family: 'DM Sans', sans-serif;
        font-size: 72px;
        color: #daf4d2;
        font-weight: 600;
        letter-spacing: -2px;
        text-shadow: 0 4px 20px rgba(7, 59, 66, 0.8);
    }
    @media (max-width: 768px) {
        .section-title {
            font-size: 42px;
        }
    }
    .fixed-section-title {
        position: fixed;
        top: 40px;
        left: 40px;
        font-family: 'DM Sans', sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: rgba(218, 244, 210, 0.8);
        z-index: 100;
        text-shadow: 0 4px 20px rgba(7, 59, 66, 0.8);
        pointer-events: none;
        display: flex;
        align-items: center;
        letter-spacing: -0.5px;
    }
    .title-content {
        position: absolute;
        white-space: nowrap;
    }
    .back-to-top {
        position: fixed;
        top: 40px;
        right: 40px;
        background: rgba(218, 244, 210, 0.05);
        border: 1px solid rgba(218, 244, 210, 0.2);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #daf4d2;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 100;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    .back-to-top.visible {
        opacity: 1;
        pointer-events: auto;
    }
    .back-to-top:hover {
        background: rgba(218, 244, 210, 0.15);
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(218, 244, 210, 0.1);
    }
</style>
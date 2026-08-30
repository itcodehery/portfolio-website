<script lang="ts">
    import { onMount } from "svelte";
    import Finale from "../components/Finale.svelte";
    import Intro from "../components/Intro.svelte";
    import Who from "../components/Who.svelte";
    import TechStack from "../components/TechStack.svelte";
    import ThreeScene from "../components/ThreeScene.svelte";
    import ScatteredProject from "../components/ScatteredProject.svelte";
    import MusicProject from "../components/MusicProject.svelte";
    import { codeProjects, designProjects, musicProjects } from "../lib/projects";
    import { goto } from "$app/navigation";
    import { fly, fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import Icon from "@iconify/svelte";
    import { browser } from "$app/environment";
    import LinksPage from './links/+page.svelte';
    import PortfolioPage from './portfolio/+page.svelte';
    import JourneyPage from './journey/+page.svelte';
    import { isPerformanceMode } from '../lib/settings';
    import { spring } from "svelte/motion";

    let windowScrollY = 0;
    let targetScroll = 0;
    let scrollY = 0;
    let scrollProgress = 0;
    let innerHeight = 1000; // default for SSR

    const timelineSections = [
        { label: 'Start', z: 0, count: 0 },
        { label: 'About', z: 1500, count: 0 },
        { label: 'Stack', z: 3000, count: 0 },
        { label: 'Code', z: 4500, count: codeProjects.length },
        { label: 'Music', z: 6000 + codeProjects.length * 1500, count: musicProjects.length },
        { label: 'Design', z: 7500 + (codeProjects.length + musicProjects.length) * 1500, count: designProjects.length },
        { label: 'Contact', z: 9000 + (codeProjects.length + musicProjects.length + designProjects.length) * 1500, count: 0 }
    ];
    
    let activeModal: 'links' | 'portfolio' | 'journey' | null = null;
    
    $: maxScroll = timelineSections[6].z;

    $: activeMode = (!$isPerformanceMode && timelineSections && timelineSections.length >= 7) ? 
        (scrollY >= timelineSections[5].z - 1000 && scrollY < timelineSections[6].z - 1000 ? 'design' :
        (scrollY >= timelineSections[4].z - 1000 && scrollY < timelineSections[5].z - 1000 ? 'music' :
        (scrollY >= timelineSections[3].z - 1000 && scrollY < timelineSections[4].z - 1000 ? 'code' : 'default'))) : 'default';
    
    $: if (typeof document !== 'undefined') {
        document.body.style.transition = 'background-color 1.5s ease-in-out';
        document.body.style.backgroundImage = 'none';
        document.body.classList.remove('theme-code', 'theme-design', 'theme-music');
        
        if (activeMode === 'code') {
            document.body.classList.add('theme-code');
            document.body.style.backgroundColor = '#000000'; // AMOLED black
            document.documentElement.style.setProperty('--soundlab-bg', 'rgba(10, 10, 10, 0.95)');
            document.documentElement.style.setProperty('--soundlab-pad-bg', 'rgba(255, 255, 255, 0.05)');
            document.documentElement.style.setProperty('--soundlab-pad-border', 'rgba(255, 255, 255, 0.15)');
            document.documentElement.style.setProperty('--theme-text', '#ffffff');
        } else if (activeMode === 'design') {
            document.body.classList.add('theme-design');
            document.body.style.backgroundColor = '#061329'; // interesting deep ocean blue
            document.documentElement.style.setProperty('--soundlab-bg', 'rgba(6, 19, 41, 0.95)');
            document.documentElement.style.setProperty('--soundlab-pad-bg', 'rgba(150, 200, 255, 0.05)');
            document.documentElement.style.setProperty('--soundlab-pad-border', 'rgba(150, 200, 255, 0.15)');
            document.documentElement.style.setProperty('--theme-text', '#96c8ff');
        } else if (activeMode === 'music') {
            document.body.classList.add('theme-music');
            document.body.style.backgroundColor = '#0e051a'; // deep violet
            document.documentElement.style.setProperty('--soundlab-bg', 'rgba(15, 10, 28, 0.95)');
            document.documentElement.style.setProperty('--soundlab-pad-bg', 'rgba(162, 119, 255, 0.05)');
            document.documentElement.style.setProperty('--soundlab-pad-border', 'rgba(162, 119, 255, 0.15)');
            document.documentElement.style.setProperty('--theme-text', '#a277ff');
        } else {
            document.body.style.backgroundColor = '#042125'; // dark green
            document.documentElement.style.removeProperty('--soundlab-bg');
            document.documentElement.style.removeProperty('--soundlab-pad-bg');
            document.documentElement.style.removeProperty('--soundlab-pad-border');
            document.documentElement.style.setProperty('--theme-text', '#daf4d2');
        }
    }

    const expandCode = spring(0, { stiffness: 0.04, damping: 0.3 });
    const expandDesign = spring(0, { stiffness: 0.04, damping: 0.3 });
    const expandMusic = spring(0, { stiffness: 0.04, damping: 0.3 });

    $: {
        let activeIdx = 0;
        for (let i = timelineSections.length - 1; i >= 0; i--) {
            if (scrollY >= timelineSections[i].z - 1000) {
                activeIdx = i;
                break;
            }
        }
        expandCode.set(activeIdx === 3 ? 1 : 0);
        expandMusic.set(activeIdx === 4 ? 1 : 0);
        expandDesign.set(activeIdx === 5 ? 1 : 0);
    }

    $: tops = timelineSections.map((sec, i) => {
        let top = i * 40;
        if (i > 3) top += $expandCode * timelineSections[3].count * 12;
        if (i > 4) top += $expandMusic * timelineSections[4].count * 20;
        if (i > 5) top += $expandDesign * timelineSections[5].count * 20;
        return top;
    });

    $: targetScroll = windowScrollY;

    $: indicatorTop = getIndicatorTop(scrollY, tops, timelineSections);
    $: closeness = getCloseness(scrollY);

    $: if (browser) {
        if (activeModal !== null) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }

    function getIndicatorTop(scroll: number, calculatedTops: number[], sections: typeof timelineSections) {
        if (scroll <= sections[0].z) return calculatedTops[0];
        if (scroll >= sections[sections.length - 1].z) return calculatedTops[calculatedTops.length - 1];
        
        for (let i = 0; i < sections.length - 1; i++) {
            const z1 = sections[i].z;
            const z2 = sections[i+1].z;
            if (scroll >= z1 && scroll < z2) {
                const progress = (scroll - z1) / (z2 - z1);
                return calculatedTops[i] + progress * (calculatedTops[i+1] - calculatedTops[i]);
            }
        }
        return 0;
    }

    function getCloseness(scroll: number) {
        let minDiff = Infinity;
        for (const sec of timelineSections) {
            const diff = Math.abs(scroll - sec.z);
            if (diff < minDiff) minDiff = diff;
            
            if (sec.label === 'Code') {
                for (let i = 0; i < codeProjects.length; i++) {
                    const subZ = sec.z + (i + 1) * 1500;
                    const subDiff = Math.abs(scroll - subZ);
                    if (subDiff < minDiff) minDiff = subDiff;
                }
            } else if (sec.label === 'Design') {
                for (let i = 0; i < designProjects.length; i++) {
                    const subZ = sec.z + (i + 1) * 1500;
                    const subDiff = Math.abs(scroll - subZ);
                    if (subDiff < minDiff) minDiff = subDiff;
                }
            } else if (sec.label === 'Music') {
                for (let i = 0; i < musicProjects.length; i++) {
                    const subZ = sec.z + (i + 1) * 1500;
                    const subDiff = Math.abs(scroll - subZ);
                    if (subDiff < minDiff) minDiff = subDiff;
                }
            }
        }
        return Math.max(0, 1 - (minDiff / 400));
    }

    onMount(() => {
        if (window.innerWidth <= 768) {
            $isPerformanceMode = true;
        }
        let frameId: number;
        const renderScroll = () => {
            if (!$isPerformanceMode) {
                scrollY += (targetScroll - scrollY) * 0.05; // Inertia factor
                scrollProgress = scrollY / (document.body.scrollHeight - innerHeight || 1);
            }
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

    function getCurveX(z: number) {
        return Math.sin(z / 2000) * 800;
    }

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
        if (!timelineSections || timelineSections.length < 7) return '';
        const codeStart = timelineSections[3].z;
        const musicStart = timelineSections[4].z;
        const designStart = timelineSections[5].z;
        const contactStart = timelineSections[6].z;
        
        if (scroll >= codeStart - 100 && scroll < musicStart - 100) return 'Code Portfolio';
        if (scroll >= musicStart - 100 && scroll < designStart - 100) return 'Music Portfolio';
        if (scroll >= designStart - 100 && scroll < contactStart - 100) return 'Design Portfolio';
        return '';
    }

    function slowScrollTo(targetZ: number) {
        if (typeof window === 'undefined') return;
        window.scrollTo({
            top: targetZ,
            behavior: 'smooth'
        });
    }
</script>

<svelte:window bind:scrollY={windowScrollY} bind:innerHeight={innerHeight} />

<div class="main-wrapper">

{#if !$isPerformanceMode}
<ThreeScene {scrollProgress} {activeMode} />
{/if}

<div class="top-controls">
    <button class="minimal-toggle" onclick={() => $isPerformanceMode = !$isPerformanceMode} aria-label="Toggle Performance Mode">
        <span class="toggle-label" class:active={!$isPerformanceMode}>3D</span>
        <div class="toggle-track">
            <div class="toggle-knob" class:right={$isPerformanceMode}></div>
        </div>
        <span class="toggle-label" class:active={$isPerformanceMode}>Lite</span>
    </button>
</div>

{#if !$isPerformanceMode}
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
{/if}

{#if $isPerformanceMode}
<div class="perf-container" class:faded={activeModal !== null}>
    <div class="perf-section intro-section">
        <Intro />
    </div>
    
    <nav class="floating-app-bar" class:faded={activeModal !== null}>
        {#each [
            { id: 'links', icon: 'mdi:link-variant', label: 'Links' },
            { id: 'portfolio', icon: 'mdi:code-braces-box', label: 'Portfolio' },
            { id: 'journey', icon: 'mdi:compass-outline', label: 'Journey' }
        ] as link}
            <button class="app-bar-btn" onclick={() => activeModal = link.id as "portfolio" | "links" | "journey"} aria-label={link.label}>
                <div class="app-bar-icon"><Icon icon={link.icon} width="20" /></div>
                <span>{link.label}</span>
            </button>
        {/each}
    </nav>
    
    <div class="perf-section who-section"><Who /></div>
    <div class="perf-section stack-section"><TechStack /></div>
    
    <div class="perf-portfolio-wrap">
        <h2 class="perf-title">Code Portfolio</h2>
        <div class="perf-grid">
            {#each codeProjects as project}
                <ScatteredProject {...project} />
            {/each}
        </div>
        
        <h2 class="perf-title" style="margin-top: 100px;">Music Portfolio</h2>
        <div class="perf-grid">
            {#each musicProjects as project}
                <MusicProject {...project} />
            {/each}
        </div>

        <h2 class="perf-title" style="margin-top: 100px;">Design Portfolio</h2>
        <div class="perf-grid">
            {#each designProjects as project}
                <ScatteredProject {...project} isDesign={true} />
            {/each}
        </div>
    </div>
    
    <div class="perf-section finale-section"><Finale /></div>
</div>
{:else}
<div class="scroll-container" class:faded={activeModal !== null} style="height: {maxScroll + innerHeight}px;">
    <!-- Snap points for magnetism -->
    <div class="snap-point" style="top: 0px;"></div>
    <div class="snap-point" style="top: 1500px;"></div>
    <div class="snap-point" style="top: 3000px;"></div>
    <div class="snap-point" style="top: 4500px;"></div>
    {#each codeProjects as _, i}
        <div class="snap-point" style="top: {6000 + (i * 1500)}px;"></div>
    {/each}
    <div class="snap-point" style="top: {6000 + (codeProjects.length * 1500)}px;"></div>
    {#each musicProjects as _, i}
        <div class="snap-point" style="top: {7500 + (codeProjects.length * 1500) + (i * 1500)}px;"></div>
    {/each}
    <div class="snap-point" style="top: {7500 + (codeProjects.length * 1500) + (musicProjects.length * 1500)}px;"></div>
    {#each designProjects as _, i}
        <div class="snap-point" style="top: {9000 + (codeProjects.length * 1500) + (musicProjects.length * 1500) + (i * 1500)}px;"></div>
    {/each}
    <div class="snap-point" style="top: {maxScroll}px;"></div>

    <!-- Timeline Tracker -->
    <div class="timeline" class:faded={activeModal !== null} style="height: {tops[tops.length - 1]}px;">
        {#if $expandCode > 0.01}
            {#each Array(timelineSections[3].count) as _, j}
                {@const z = timelineSections[3].z + (j + 1) * 1500}
                {@const progress = (j + 1) / (timelineSections[3].count + 1)}
                <button 
                    class="timeline-submark" 
                    style="top: {tops[3] + progress * (tops[4] - tops[3])}px; opacity: {Math.max(0, $expandCode * (Math.abs(scrollY - z) < 400 ? 1 : 0.3))};"
                    onclick={() => slowScrollTo(z)}
                    aria-label="Code Project {j + 1}"
                ></button>
            {/each}
        {/if}

        {#if $expandMusic > 0.01}
            {#each Array(timelineSections[4].count) as _, j}
                {@const z = timelineSections[4].z + (j + 1) * 1500}
                {@const progress = (j + 1) / (timelineSections[4].count + 1)}
                <button 
                    class="timeline-submark" 
                    style="top: {tops[4] + progress * (tops[5] - tops[4])}px; opacity: {Math.max(0, $expandMusic * (Math.abs(scrollY - z) < 400 ? 1 : 0.3))};"
                    onclick={() => slowScrollTo(z)}
                    aria-label="Music Project {j + 1}"
                ></button>
            {/each}
        {/if}

        {#if $expandDesign > 0.01}
            {#each Array(timelineSections[5].count) as _, j}
                {@const z = timelineSections[5].z + (j + 1) * 1500}
                {@const progress = (j + 1) / (timelineSections[5].count + 1)}
                <button 
                    class="timeline-submark" 
                    style="top: {tops[5] + progress * (tops[6] - tops[5])}px; opacity: {Math.max(0, $expandDesign * (Math.abs(scrollY - z) < 400 ? 1 : 0.3))};"
                    onclick={() => slowScrollTo(z)}
                    aria-label="Design Project {j + 1}"
                ></button>
            {/each}
        {/if}

        <div class="timeline-indicator" style="top: {indicatorTop}px; width: {12 + closeness * 24}px; opacity: {0.3 + closeness * 0.7};"></div>
        
        {#each timelineSections as section, i}
            <button class="timeline-item" style="top: {tops[i]}px" onclick={() => slowScrollTo(section.z)}>
                {#if section.label === 'Music' && new Date() < new Date('2026-09-30')}
                    <span class="new-chip">NEW</span>
                {/if}
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
                <button class="nav-btn" onclick={() => activeModal = link.id as "portfolio" | "links" | "journey"}>
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

            <div class="section-wrapper" style="transform: translateZ(-3000px) translateX({getCurveX(-3000)}px); pointer-events: {getOpacity(-3000, scrollY) > 0.1 ? 'auto' : 'none'};">
                <div class="content-wrapper" style="opacity: {getOpacity(-3000, scrollY)}; filter: blur({getBlur(-3000, scrollY)}px);">
                    <TechStack />
                </div>
            </div>

            <div class="section-wrapper title-wrapper" style="transform: translateZ(-4500px) translateX({getCurveX(-4500)}px); pointer-events: none;">
                <div class="content-wrapper" style="opacity: {getOpacity(-4500, scrollY)}; filter: blur({getBlur(-4500, scrollY)}px);">
                    <h2 class="section-title">Code Portfolio</h2>
                </div>
            </div>

            {#each codeProjects as project, i}
                {@const zPos = -6000 - (i * 1500)}
                <div class="section-wrapper" 
                     style="transform: translateZ({zPos}px) translateX({getCurveX(zPos) + (i % 2 === 0 ? -1 : 1) * 200}px) translateY({-150 + (i % 3 === 0 ? -1 : 1) * 50}px); 
                            pointer-events: {getOpacity(zPos, scrollY) > 0.1 ? 'auto' : 'none'};">
                    <div class="content-wrapper" style="opacity: {getOpacity(zPos, scrollY)}; filter: blur({getBlur(zPos, scrollY)}px);">
                        <ScatteredProject {...project} />
                    </div>
                </div>
            {/each}

            <div class="section-wrapper title-wrapper" style="transform: translateZ({-6000 - (codeProjects.length * 1500)}px) translateX({getCurveX(-6000 - (codeProjects.length * 1500))}px); pointer-events: none;">
                <div class="content-wrapper" style="opacity: {getOpacity(-6000 - (codeProjects.length * 1500), scrollY)}; filter: blur({getBlur(-6000 - (codeProjects.length * 1500), scrollY)}px);">
                    <h2 class="section-title">Music Portfolio</h2>
                </div>
            </div>

            <!-- MUSIC PROJECTS HORIZONTAL SCROLL -->
            {#if !$isPerformanceMode || activeMode === 'music'}
                {@const pinStart = timelineSections[4].z + 1500}
                {@const numMusic = musicProjects.length}
                {@const pinEnd = pinStart + Math.max(0, numMusic - 1) * 1500}
                {@const pinnedZ = scrollY < pinStart ? -pinStart : (scrollY > pinEnd ? -pinEnd : -scrollY)}
                {@const musicProgress = numMusic > 1 ? Math.max(0, Math.min(1, (scrollY - pinStart) / (pinEnd - pinStart))) : 0}
                {@const slideSpacing = 700}
                {@const totalPan = Math.max(0, numMusic - 1) * slideSpacing}
                {@const centerOffset = totalPan / 2}
                {@const currentPan = musicProgress * totalPan}
                {@const xOffset = getCurveX(-scrollY) - currentPan + centerOffset}
                
                <div class="section-wrapper" 
                     style="transform: translateZ({pinnedZ}px) translateX({xOffset}px) translateY(-100px); 
                            pointer-events: {getOpacity(pinnedZ, scrollY) > 0.1 ? 'auto' : 'none'};">
                    <div class="content-wrapper" style="opacity: {getOpacity(pinnedZ, scrollY)}; filter: blur({getBlur(pinnedZ, scrollY)}px);">
                        <div class="music-row" style="display: flex; gap: {slideSpacing - 600}px; align-items: center; width: max-content;">
                            {#each musicProjects as project, i}
                                {@const cardProgress = musicProgress * Math.max(0, numMusic - 1)}
                                {@const dist = Math.abs(cardProgress - i)}
                                {@const scale = Math.max(0.8, 1 - (dist * 0.15))}
                                {@const cardOpacity = Math.max(0.2, 1 - (dist * 0.6))}
                                <div class="music-slide-container" style="width: 600px; flex-shrink: 0; transform: scale({scale}); opacity: {cardOpacity}; transition: transform 0.1s ease-out, opacity 0.1s ease-out;">
                                    <MusicProject {...project} />
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}

            <div class="section-wrapper title-wrapper" style="transform: translateZ({-7500 - ((codeProjects.length + musicProjects.length) * 1500)}px) translateX({getCurveX(-7500 - ((codeProjects.length + musicProjects.length) * 1500))}px); pointer-events: none;">
                <div class="content-wrapper" style="opacity: {getOpacity(-7500 - ((codeProjects.length + musicProjects.length) * 1500), scrollY)}; filter: blur({getBlur(-7500 - ((codeProjects.length + musicProjects.length) * 1500), scrollY)}px);">
                    <h2 class="section-title">Design Portfolio</h2>
                </div>
            </div>

            {#each designProjects as project, i}
                {@const zPos = -9000 - ((codeProjects.length + musicProjects.length) * 1500) - (i * 1500)}
                <div class="section-wrapper" 
                     style="transform: translateZ({zPos}px) translateX({getCurveX(zPos) + (i % 2 === 0 ? 1 : -1) * 200}px) translateY({-150 + (i % 3 === 0 ? 1 : -1) * 50}px); 
                            pointer-events: {getOpacity(zPos, scrollY) > 0.1 ? 'auto' : 'none'};">
                    <div class="content-wrapper" style="opacity: {getOpacity(zPos, scrollY)}; filter: blur({getBlur(zPos, scrollY)}px);">
                        <ScatteredProject {...project} isDesign={true} />
                    </div>
                </div>
            {/each}

            <div class="section-wrapper" style="transform: translateZ({-timelineSections[6].z}px) translateX({getCurveX(-timelineSections[6].z)}px); pointer-events: {getOpacity(-timelineSections[6].z, scrollY) > 0.1 ? 'auto' : 'none'};">
                <div class="content-wrapper" style="opacity: {getOpacity(-timelineSections[6].z, scrollY)}; filter: blur({getBlur(-timelineSections[6].z, scrollY)}px);">
                    <Finale />
                </div>
            </div>
        </div>
    </div>
</div>
{/if}

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

</div>

<style>
    :global(html) {
        scroll-snap-type: y mandatory;
        scroll-behavior: smooth;
    }
    :global(body) {
        overflow-x: hidden;
    }
    .top-controls {
        position: fixed;
        top: 40px;
        right: 40px;
        display: flex;
        gap: 20px;
        z-index: 1000;
        align-items: center;
        transition: color 0.3s ease;
    }
    .minimal-toggle {
        display: flex;
        align-items: center;
        gap: 10px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }
    .toggle-label {
        color: #daf4d2;
        font-family: 'DM Sans', sans-serif;
        font-size: 11px;
        font-weight: 500;
        opacity: 0.3;
        transition: opacity 0.3s;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .toggle-label.active {
        opacity: 1;
    }
    .toggle-track {
        width: 36px;
        height: 18px;
        border-radius: 18px;
        border: 1px solid rgba(218, 244, 210, 0.4);
        position: relative;
        transition: border-color 0.3s;
    }
    .toggle-knob {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 12px;
        height: 12px;
        background: #daf4d2;
        border-radius: 50%;
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .toggle-knob.right {
        transform: translateX(18px);
    }
    .minimal-toggle:hover .toggle-track {
        border-color: rgba(218, 244, 210, 0.8);
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
        z-index: 100;
        pointer-events: none;
        will-change: height;
    }
    .timeline-submark {
        position: absolute;
        right: 0;
        width: 6px;
        height: 2px;
        margin-top: -1px;
        background: #daf4d2;
        border-radius: 1px;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s;
        z-index: 99;
    }
    .timeline-submark:hover {
        width: 14px;
        background: #fff;
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
        z-index: 100;
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
        gap: 8px;
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
    .new-chip {
        background-color: var(--theme-text, #daf4d2);
        color: #000000;
        font-family: 'DM Sans', sans-serif;
        font-size: 9px;
        font-weight: 800;
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 0.5px;
        box-shadow: 0 0 8px var(--theme-text, #daf4d2);
        pointer-events: none;
        display: flex;
        align-items: center;
        transition: background-color 1.5s ease-in-out, box-shadow 1.5s ease-in-out;
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
        min-height: 100vh;
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
        min-height: 100vh;
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
    
    /* Performance Mode Styles */
    .perf-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        position: relative;
        z-index: 1;
        background-color: #042125;
    }
    .perf-portfolio-wrap {
        padding: 80px 20px;
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
    }
    .intro-section {
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        background-image: url("/home-bg.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .who-section {
        width: 100%;
        background-image: url("/who-bg.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .stack-section {
        width: 100%;
        padding: 60px 0;
    }
    
    .floating-app-bar {
        position: fixed;
        top: 40px;
        bottom: auto;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: rgba(4, 33, 37, 0.65);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(218, 244, 210, 0.15);
        border-radius: 100px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(218, 244, 210, 0.05);
        z-index: 900; /* below top-controls but above content */
        transition: opacity 0.4s ease;
    }
    
    .app-bar-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 24px;
        background: transparent;
        border: none;
        color: #daf4d2;
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        font-weight: 500;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        opacity: 0.7;
    }
    
    .app-bar-btn:hover {
        background: rgba(218, 244, 210, 0.12);
        opacity: 1;
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .app-bar-icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    @media (max-width: 600px) {
        .floating-app-bar {
            top: 20px;
            bottom: auto;
            width: 90%;
            justify-content: space-between;
        }
        .app-bar-btn {
            padding: 10px 16px;
            gap: 6px;
            font-size: 13px;
        }
    }
    .perf-section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .finale-section { margin-top: 40px; }
    .perf-title {
        font-family: 'DM Sans', sans-serif;
        font-size: 56px;
        color: #daf4d2;
        margin: 0 0 40px 0;
        text-align: center;
        letter-spacing: -2px;
    }
    .perf-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 60px 40px;
        width: 100%;
    }
    
    /* Make inner component sections transparent so wrappers show through */
    :global(.perf-container section) {
        background-color: transparent !important;
        background-image: none !important;
    }
    
    /* Hide tether lines in perf mode */
    :global(.perf-container .tether-line) {
        display: none !important;
    }
    :global(.perf-container .project-container) {
        animation: none !important;
    }

    .fixed-title-container h1 {
        font-size: 100px;
        font-weight: 700;
        margin: 0;
        letter-spacing: -3px;
        color: #daf4d2;
        text-shadow: 0 0 20px rgba(218, 244, 210, 0.4);
        transition: color 1.5s ease, text-shadow 1.5s ease;
    }
    
    /* --- THEME TRANSITIONS (For 3D Mode Sections) --- */
    
    :global(body.theme-code .project-card),
    :global(body.theme-code .soundlab-wrapper.pip),
    :global(body.theme-code .soundlab-wrapper.expanded),
    :global(body.theme-code .expand-btn),
    :global(body.theme-code .lab-floating-button) {
        background: rgba(10, 10, 10, 0.85) !important;
        transition: background 1.5s ease, transform 0.3s ease !important;
    }
    
    :global(body.theme-design .project-card),
    :global(body.theme-design .soundlab-wrapper.pip),
    :global(body.theme-design .soundlab-wrapper.expanded),
    :global(body.theme-design .expand-btn),
    :global(body.theme-design .lab-floating-button) {
        background: rgba(6, 19, 41, 0.85) !important;
        transition: background 1.5s ease, transform 0.3s ease !important;
    }
    
    :global(body.theme-code .pad) {
        background: rgba(255, 255, 255, 0.05) !important;
        border-color: rgba(255, 255, 255, 0.15) !important;
    }
    
    :global(body.theme-design .pad) {
        background: rgba(150, 200, 255, 0.05) !important;
        border-color: rgba(150, 200, 255, 0.15) !important;
    }
    
    :global(body .project-card),
    :global(body .soundlab-wrapper),
    :global(body .expand-btn),
    :global(body .lab-floating-button) {
        transition: background 1.5s ease, transform 0.3s ease;
    }

    @media (max-width: 768px) {
        .top-controls {
            display: none !important;
        }
    }
</style>
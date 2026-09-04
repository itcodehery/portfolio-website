import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// true = stripped down normal scroll, false = full 3D experience
export const isPerformanceMode = writable(false);
export const labsModalOpen = writable(false);

const getDefaultLabsSettings = () => {
    let isLowEnd = false;
    if (browser) {
        const cores = navigator.hardwareConcurrency || 4;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        isLowEnd = cores <= 4 || isMobile;
    }
    return {
        renderResolution: !isLowEnd, // true = high res, false = 1.0
        chromaticAberration: !isLowEnd,
        highPolyTerrain: !isLowEnd,
        cssGlassEffects: !isLowEnd,
        ambientParticles: !isLowEnd,
        reactivity: !isLowEnd
    };
};

export const labsSettings = writable(getDefaultLabsSettings());

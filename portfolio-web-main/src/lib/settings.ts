import { writable } from 'svelte/store';

// true = stripped down normal scroll, false = full 3D experience
export const isPerformanceMode = writable(false);

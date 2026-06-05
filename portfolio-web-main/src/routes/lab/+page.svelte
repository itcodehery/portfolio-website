<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import Icon from "@iconify/svelte";
</script>

<svelte:head>
    <title>Lab | Hari Prasad</title>
</svelte:head>

<div class="page-container" in:fade={{ duration: 600 }}>
    <header class="page-header" in:fly={{ y: 30, duration: 800, delay: 200 }}>
        <Icon icon="material-symbols:science" width="48" style="color: var(--lime-light, #daf4d2);" />
        <h1>The Lab</h1>
        <p>A playground for creative coding, micro-interactions, and experimental UI.</p>
    </header>

    <div class="content" in:fly={{ y: 30, duration: 800, delay: 400 }}>
        <div class="experiment-card">
            <div class="card-icon">
                <Icon icon="material-symbols:music-note" width="32" />
            </div>
            <h3>The Sound Lab</h3>
            <p>You might have noticed the Sound Lab widget following you around! It's a fully functional 8x8 audio synthesizer built with Web Audio API. Try playing a beat on the homepage.</p>
            <span class="status-badge">Active</span>
        </div>

        <div class="experiment-card coming-soon">
            <div class="card-icon">
                <Icon icon="material-symbols:deployed-code" width="32" />
            </div>
            <h3>WebGL Physics Engine</h3>
            <p>Experimenting with Three.js and custom shaders to create a soft-body physics simulation right in the browser.</p>
            <span class="status-badge pending">In Progress</span>
        </div>

        <div class="experiment-card coming-soon">
            <div class="card-icon">
                <Icon icon="material-symbols:animation" width="32" />
            </div>
            <h3>Generative Art</h3>
            <p>Procedural canvas drawing algorithms exploring chaos theory and fluid dynamics.</p>
            <span class="status-badge pending">Coming Soon</span>
        </div>
    </div>
</div>

<style>
    .page-container {
        padding: 120px 20px 100px;
        min-height: 100vh;
        max-width: 1000px;
        margin: 0 auto;
        font-family: "DM Sans", sans-serif;
    }

    .page-header {
        text-align: center;
        margin-bottom: 80px;
    }

    h1 {
        font-size: 48px;
        font-weight: 600;
        margin: 16px 0;
        letter-spacing: -1px;
        background: linear-gradient(to right, #daf4d2, #88c07e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .page-header p {
        font-size: 18px;
        opacity: 0.7;
        margin: 0;
    }

    .content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
    }

    .experiment-card {
        background: rgba(7, 59, 66, 0.4);
        border: 1px solid rgba(218, 244, 210, 0.1);
        padding: 30px;
        border-radius: 24px;
        backdrop-filter: blur(12px);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .experiment-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border-color: rgba(218, 244, 210, 0.3);
    }

    .card-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        background: rgba(218, 244, 210, 0.1);
        border-radius: 16px;
        color: #daf4d2;
        margin-bottom: 24px;
    }

    h3 {
        font-size: 22px;
        margin: 0 0 12px 0;
        font-weight: 500;
    }

    p {
        font-size: 15px;
        line-height: 1.6;
        opacity: 0.8;
        margin: 0 0 24px 0;
    }

    .status-badge {
        display: inline-block;
        padding: 6px 12px;
        background: rgba(136, 192, 126, 0.2);
        color: #88c07e;
        border-radius: 100px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }

    .status-badge.pending {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.6);
    }

    .experiment-card.coming-soon {
        opacity: 0.7;
    }

    .experiment-card.coming-soon:hover {
        opacity: 1;
    }
</style>

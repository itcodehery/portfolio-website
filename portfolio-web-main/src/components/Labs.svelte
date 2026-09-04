<script lang="ts">
    import { labsSettings } from "../lib/settings";
</script>

<div class="labs-container">
    <h2>Performance Labs</h2>
    <p class="subtitle">Fine-tune your 3D experience by toggling these settings. On low-end hardware, these are disabled by default.</p>

    <div class="settings-grid">
        <label class="setting-item">
            <div class="info">
                <h3>Render Resolution</h3>
                <p>Toggle high-DPI rendering. Disabling this runs the 3D scene at standard 1080p, offering the biggest performance boost.</p>
            </div>
            <input type="checkbox" bind:checked={$labsSettings.renderResolution} />
        </label>

        <label class="setting-item">
            <div class="info">
                <h3>Chromatic Aberration</h3>
                <p>Render extra layers for red and cyan color fringing. Disabling this cuts terrain drawing costs by 66%.</p>
            </div>
            <input type="checkbox" bind:checked={$labsSettings.chromaticAberration} />
        </label>

        <label class="setting-item">
            <div class="info">
                <h3>High-Poly Terrain</h3>
                <p>Use a dense grid for the waving landscape. Disabling uses a lighter geometry.</p>
            </div>
            <input type="checkbox" bind:checked={$labsSettings.highPolyTerrain} />
        </label>

        <label class="setting-item">
            <div class="info">
                <h3>CSS Glass & Blur</h3>
                <p>Expensive backdrop blurs on the UI cards and moving elements. Highly recommended to disable on older devices.</p>
            </div>
            <input type="checkbox" bind:checked={$labsSettings.cssGlassEffects} />
        </label>

        <label class="setting-item">
            <div class="info">
                <h3>Ambient Particles</h3>
                <p>Renders 2000 floating dots in the background.</p>
            </div>
            <input type="checkbox" bind:checked={$labsSettings.ambientParticles} />
        </label>

        <label class="setting-item">
            <div class="info">
                <h3>Mouse & Audio Reactivity</h3>
                <p>Enables cursor camera sway and audio-reactive bumps on the terrain.</p>
            </div>
            <input type="checkbox" bind:checked={$labsSettings.reactivity} />
        </label>
    </div>
</div>

<style>
    .labs-container {
        color: var(--theme-text, #daf4d2);
        font-family: 'DM Sans', sans-serif;
        padding: 32px 16px;
        max-width: 600px;
        margin: 0 auto;
    }

    h2 {
        font-size: 32px;
        margin: 0 0 8px 0;
        font-weight: 600;
        letter-spacing: -1px;
    }

    .subtitle {
        opacity: 0.7;
        margin-bottom: 32px;
        font-size: 14px;
        line-height: 1.5;
    }

    .settings-grid {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(4, 33, 37, 0.4);
        padding: 20px;
        border-radius: 16px;
        border: 1px solid rgba(218, 244, 210, 0.1);
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .setting-item:hover {
        background: rgba(4, 33, 37, 0.8);
    }

    .info {
        flex: 1;
        padding-right: 24px;
    }

    .info h3 {
        margin: 0 0 4px 0;
        font-size: 16px;
        font-weight: 500;
    }

    .info p {
        margin: 0;
        font-size: 12px;
        opacity: 0.6;
        line-height: 1.4;
    }

    input[type="checkbox"] {
        appearance: none;
        width: 48px;
        height: 24px;
        background: rgba(218, 244, 210, 0.2);
        border-radius: 24px;
        position: relative;
        cursor: pointer;
        outline: none;
        transition: background 0.3s ease;
        flex-shrink: 0;
    }

    input[type="checkbox"]::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background: #daf4d2;
        border-radius: 50%;
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    input[type="checkbox"]:checked {
        background: #daf4d2;
    }

    input[type="checkbox"]:checked::after {
        transform: translateX(24px);
        background: #042125;
    }
</style>

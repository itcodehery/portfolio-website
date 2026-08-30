<script lang="ts">
    import { isPerformanceMode } from "../lib/settings";
    export let name: string;
    export let description: string;
    export let image: string;
    export let url: string = "";
    export let isDesign = false;
    
    // Some random floating animation offset
    const floatDelay = Math.random() * -5;

    const defaultDesignUrl = "https://www.figma.com/file/6lUhI6edjVVi2N4mEIq9wu/All-Concept-Finals?type=design&node-id=0%3A1&mode=design&t=JjXUthBvDO1YWEYY-1";
    $: finalUrl = url || (isDesign ? defaultDesignUrl : "");
</script>

<div class="project-container" class:lite={$isPerformanceMode} style="animation-delay: {floatDelay}s;">
    <div class="project-card" class:lite={$isPerformanceMode}>
        <div class="image-wrap">
            <img src={image} alt={name} />
        </div>
        <div class="info">
            <h3>{name}</h3>
            <div class="description-wrapper">
                <div class="description-inner">
                    <p>{description}</p>
                </div>
            </div>
            {#if finalUrl}
                <div class="button-wrapper">
                    <div class="button-inner">
                        <div class="button-reveal">
                            <a href={finalUrl} target="_blank" rel="noopener noreferrer">{isDesign ? 'View Design ↗' : 'View Project ↗'}</a>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
    <div class="tether-line"></div>
</div>

<style>
    .project-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: float 4s ease-in-out infinite;
        position: relative;
    }

    .tether-line {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 1.2px;
        height: 640px; /* extends down to the landscape */
        background: linear-gradient(to bottom, rgba(218, 244, 210, 0.5), transparent);
        margin-top: 12px;
        border-radius: 1.6px;
        box-shadow: 0 0 12px rgba(218, 244, 210, 0.3);
        pointer-events: none;
    }

    .project-card {
        width: 288px;
        background: rgba(4, 33, 37, 0.75);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: none;
        border-radius: 16px;
        padding: 0 0 16px 0;
        display: flex;
        flex-direction: column;
        gap: 0;
        color: #daf4d2;
        font-family: 'DM Sans', sans-serif;
        box-shadow: inset 0 1px 1.6px rgba(255, 255, 255, 0.1), 0 24px 48px rgba(0, 0, 0, 0.6);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
    }
    
    .project-card:hover {
        transform: scale(1.03) translateY(-4px);
        box-shadow: inset 0 1px 1.6px rgba(255, 255, 255, 0.15), 0 32px 64px rgba(0, 0, 0, 0.6);
    }

    /* Firefox fallback because backdrop-filter combined with 3D contexts fails to render */
    @supports (-moz-appearance: none) {
        .project-card {
            background: rgba(4, 33, 37, 0.98);
            backdrop-filter: none;
        }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-9.6px); }
    }

    .image-wrap {
        width: 100%;
        height: 160px;
        border-radius: 16px 16px 0 0;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.2);
        flex-shrink: 0;
    }

    .image-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.85;
        transition: opacity 0.4s ease, transform 0.4s ease;
    }

    .project-card:hover .image-wrap img {
        opacity: 1;
        transform: scale(1.05);
    }

    .info {
        display: flex;
        flex-direction: column;
        padding: 16px 16px 0 16px;
    }

    h3 {
        margin: 0;
        font-size: 17.6px;
        font-weight: 600;
        letter-spacing: -0.5px;
    }

    .description-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.4s ease, margin-top 0.4s ease;
        margin-top: 0;
    }

    .project-card:hover .description-wrapper {
        grid-template-rows: 1fr;
        margin-top: 8px;
    }

    .description-inner {
        overflow: hidden;
    }

    p {
        margin: 0;
        font-size: 11.2px;
        opacity: 0;
        transform: translateY(8px);
        line-height: 1.5;
        font-weight: 400;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .project-card:hover p {
        opacity: 0.75;
        transform: translateY(0);
        transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
    }

    .button-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.4s ease, margin-top 0.4s ease;
        margin-top: 0;
    }

    .project-card:hover .button-wrapper {
        grid-template-rows: 1fr;
        margin-top: 12.8px;
        transition-delay: 1.2s;
    }

    .button-inner {
        overflow: hidden;
    }

    .button-reveal {
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        padding-bottom: 8px;
    }

    .project-card:hover .button-reveal {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.4s ease 1.3s, transform 0.4s ease 1.3s;
    }

    a {
        color: var(--lime-light, #daf4d2);
        text-decoration: none;
        font-weight: 500;
        display: inline-flex;
        padding: 8px 16px;
        background: rgba(218, 244, 210, 0.05);
        border-radius: 40px;
        transition: all 0.3s ease;
        backdrop-filter: blur(4px);
    }

    a:hover {
        background: var(--lime-light, #daf4d2);
        color: #042125;
        transform: translateY(-1.6px);
        box-shadow: 0 8px 16px rgba(218, 244, 210, 0.2);
    }

    /* Firefox fallback because backdrop-filter combined with 3D contexts fails to render */
    @supports (-moz-appearance: none) {
        a {
            background: rgba(218, 244, 210, 0.15);
            backdrop-filter: none;
        }
    }
    
    @media (max-width: 614.4px) {
        .project-card {
            width: 240px;
            padding: 0 0 12.8px 0;
            border-radius: 12.8px;
        }
        .image-wrap {
            height: 128px;
        }
        .tether-line {
            height: 400px;
        }
    }

    /* LITE mode styles */
    .project-card.lite .description-wrapper {
        grid-template-rows: 1fr;
        margin-top: 8px;
    }
    .project-card.lite p {
        opacity: 0.75;
        transform: translateY(0);
    }
    .project-card.lite .button-wrapper {
        grid-template-rows: 1fr;
        margin-top: 12.8px;
    }
    .project-card.lite .button-reveal {
        opacity: 1;
        transform: translateY(0);
    }
    .project-container.lite .tether-line {
        display: none;
    }
</style>

<script lang="ts">
    import { isPerformanceMode, labsSettings } from "../lib/settings";
    export let name: string;
    export let description: string;
    export let image: string;
    export let url: string = "";
    export let isDesign = false;
    export let playUrl: string | undefined = undefined;
    export let index: number = 0;
    
    // Some random floating animation offset
    const floatDelay = Math.random() * -5;

    const defaultDesignUrl = "https://www.figma.com/file/6lUhI6edjVVi2N4mEIq9wu/All-Concept-Finals?type=design&node-id=0%3A1&mode=design&t=JjXUthBvDO1YWEYY-1";
    $: finalUrl = url || (isDesign ? defaultDesignUrl : "");
</script>

<div class="project-container" class:lite={$isPerformanceMode} style="animation-delay: {floatDelay}s;">
    <div class="project-card" class:reverse={index % 2 !== 0}>
        <div class="image-wrap">
            <img src={image} alt={name} />
        </div>
        <div class="info">
            <h3>{name}</h3>
            <p>{description}</p>
            {#if finalUrl || playUrl}
                <div class="button-reveal">
                    {#if finalUrl}
                        <a href={finalUrl} target="_blank" rel="noopener noreferrer">{isDesign ? 'View Design ↗' : 'View Project ↗'}</a>
                    {/if}
                    {#if playUrl}
                        <a href={playUrl} target="_blank" rel="noopener noreferrer" style="background: var(--lime-light, #daf4d2); color: #042125;">Play ↗</a>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .project-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: float 4s ease-in-out infinite;
        position: relative;
    }

    .project-card {
        display: flex;
        align-items: center;
        gap: 64px;
        width: 860px;
        max-width: 90vw;
        color: #daf4d2;
        font-family: 'DM Sans', sans-serif;
        background: transparent;
        box-shadow: none;
        backdrop-filter: none;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .project-card.reverse {
        flex-direction: row-reverse;
    }

    .project-card:hover {
        transform: scale(1.02);
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-9.6px); }
    }

    .image-wrap {
        width: 420px;
        height: 260px;
        border-radius: 16px;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.2);
        flex-shrink: 0;
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.6);
    }

    .image-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.9;
        transition: opacity 0.4s ease, transform 0.4s ease;
    }

    .project-card:hover .image-wrap img {
        opacity: 1;
        transform: scale(1.05);
    }

    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    
    .project-card.reverse .info {
        text-align: right;
        align-items: flex-end;
    }

    h3 {
        margin: 0 0 16px 0;
        font-size: 32px;
        font-weight: 600;
        letter-spacing: -0.5px;
    }

    p {
        margin: 0 0 32px 0;
        font-size: 15px;
        line-height: 1.6;
        font-weight: 400;
        opacity: 0.85;
    }

    .button-reveal {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }

    a {
        color: var(--lime-light, #daf4d2);
        text-decoration: none;
        font-weight: 500;
        display: inline-flex;
        padding: 10px 24px;
        background: rgba(218, 244, 210, 0.05);
        border-radius: 40px;
        transition: all 0.3s ease;
        border: 1px solid rgba(218, 244, 210, 0.2);
    }

    a:hover {
        background: var(--lime-light, #daf4d2);
        color: #042125;
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(218, 244, 210, 0.15);
    }

    @media (max-width: 860px) {
        .project-card {
            flex-direction: column;
            width: 100%;
            gap: 32px;
            text-align: center;
        }
        .project-card.reverse {
            flex-direction: column;
        }
        .image-wrap {
            width: 100%;
            height: 220px;
        }
        .info {
            text-align: center;
            align-items: center;
        }
        .project-card.reverse .info {
            text-align: center;
            align-items: center;
        }
    }
</style>

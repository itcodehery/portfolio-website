<script lang="ts">
    export let name: string;
    export let description: string;
    export let image: string;
    export let url: string = "";
    
    // Some random floating animation offset
    const floatDelay = Math.random() * -5;
</script>

<div class="project-container" style="animation-delay: {floatDelay}s;">
    <div class="project-card">
        <div class="image-wrap">
            <img src={image} alt={name} />
        </div>
        <div class="info">
            <h3>{name}</h3>
            <p>{description}</p>
            {#if url}
                <a href={url} target="_blank" rel="noopener noreferrer">View Project ↗</a>
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
        width: 1.5px;
        height: 800px; /* extends down to the landscape */
        background: linear-gradient(to bottom, rgba(218, 244, 210, 0.5), transparent);
        margin-top: 15px;
        border-radius: 2px;
        box-shadow: 0 0 15px rgba(218, 244, 210, 0.3);
        pointer-events: none;
    }

    .project-card {
        width: 360px;
        background: rgba(4, 33, 37, 0.75);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: none;
        border-radius: 20px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        color: #daf4d2;
        font-family: 'DM Sans', sans-serif;
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 30px 60px rgba(0, 0, 0, 0.6);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
    }
    
    .project-card:hover {
        transform: scale(1.03) translateY(-5px);
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.15), 0 40px 80px rgba(0, 0, 0, 0.6);
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
        50% { transform: translateY(-12px); }
    }

    .image-wrap {
        width: 100%;
        height: 200px;
        border-radius: 12px;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.2);
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
        gap: 10px;
    }

    h3 {
        margin: 0;
        font-size: 22px;
        font-weight: 600;
        letter-spacing: -0.5px;
    }

    p {
        margin: 0;
        font-size: 14px;
        opacity: 0.75;
        line-height: 1.5;
        font-weight: 400;
    }

    a {
        color: var(--lime-light, #daf4d2);
        text-decoration: none;
        font-weight: 500;
        margin-top: 8px;
        display: inline-flex;
        padding: 10px 20px;
        background: rgba(218, 244, 210, 0.05);
        border-radius: 50px;
        align-self: flex-start;
        transition: all 0.3s ease;
        backdrop-filter: blur(5px);
    }

    a:hover {
        background: var(--lime-light, #daf4d2);
        color: #042125;
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(218, 244, 210, 0.2);
    }

    /* Firefox fallback because backdrop-filter combined with 3D contexts fails to render */
    @supports (-moz-appearance: none) {
        a {
            background: rgba(218, 244, 210, 0.15);
            backdrop-filter: none;
        }
    }
    
    @media (max-width: 768px) {
        .project-card {
            width: 300px;
            padding: 16px;
            border-radius: 16px;
        }
        .image-wrap {
            height: 160px;
        }
        .tether-line {
            height: 500px;
        }
    }
</style>

<script>
    import { flip } from 'svelte/animate';
    import Icon from "@iconify/svelte";

    let flipped = false;

    function toggleFlip() {
        flipped = !flipped;
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flip-card" on:click={toggleFlip}>
    <div class="flip-card-inner" class:flipped={flipped}>
        <div class="flip-card-front">
            <!-- Front Content -->
            <div class="card-content">
                <div class="image-wrapper">
                    <div class="profile-image"></div>
                </div>
                <div class="info-wrapper">
                    <h3>Hari Prasad</h3>
                    <p class="role">Developer & Designer</p>
                </div>
                <div class="hint">
                    <p>Click to flip</p>
                    <Icon icon="material-symbols:arrow-forward-rounded" width="16" />
                </div>
            </div>
        </div>
        <div class="flip-card-back">
            <!-- Back Content -->
            <div class="card-content back-content">
                <h3>About Me</h3>
                <p class="bio">Passionate developer crafting intuitive experiences. Love coding, music, and design.</p>
                
                <div class="skills-container">
                    <span class="skill-tag">Mobile Dev</span>
                    <span class="skill-tag">UI/UX</span>
                    <span class="skill-tag">Full Stack</span>
                    <span class="skill-tag">Systems</span>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Levitating / floating animation */
    @keyframes levitate {
        0%, 100% {
            transform: rotateZ(-2deg) translateY(0px) translateZ(0);
        }
        50% {
            transform: rotateZ(-2deg) translateY(-8px) translateZ(0);
        }
    }

    /* Pulsing glow shadow animation */
    @keyframes glowPulse {
        0%, 100% {
            box-shadow: 0 16px 32px rgba(218, 244, 210, 0.1);
        }
        50% {
            box-shadow: 0 20px 40px rgba(218, 244, 210, 0.2);
        }
    }

    .flip-card {
        background-color: transparent;
        width: 256px;
        height: 352px;
        perspective: 800px;
        cursor: pointer;
        transform: rotateZ(-2deg) translateZ(0); /* translateZ enables hardware accel */
        font-family: "DM Sans", sans-serif;
        animation: levitate 3s ease-in-out infinite;
    }

    .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform-style: preserve-3d;
    }

    .flip-card-inner.flipped {
        transform: rotateY(180deg);
    }

    .flip-card-front, .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border-radius: 19.2px;
        border: 1px solid rgba(218, 244, 210, 0.1);
        overflow: hidden;
        animation: glowPulse 3s ease-in-out infinite;
    }

    .flip-card-front {
        background: radial-gradient(circle at top right, rgba(7, 59, 66, 0.95), rgba(4, 33, 37, 1));
        display: flex;
        flex-direction: column;
        color: var(--lime-light);
    }

    .flip-card-back {
        background: radial-gradient(circle at bottom left, rgba(7, 59, 66, 0.95), rgba(4, 33, 37, 1));
        color: var(--lime-light);
        transform: rotateY(180deg);
        display: flex;
        flex-direction: column;
    }

    .card-content {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px;
        box-sizing: border-box;
    }

    /* Front Styles */
    .image-wrapper {
        margin-top: 16px;
        padding: 6.4px;
        border-radius: 50%;
        border: 1px solid rgba(218, 244, 210, 0.2);
        margin-bottom: 19.2px;
    }

    .profile-image {
        background-image: url("/me.jpg");
        background-position: center;
        background-size: cover;
        height: 128px;
        width: 128px;
        border-radius: 50%;
        filter: brightness(0.9);
    }

    .info-wrapper {
        text-align: center;
        flex-grow: 1;
    }

    h3 {
        font-size: 22.4px;
        font-weight: 600;
        margin: 0 0 6.4px 0;
        letter-spacing: -0.5px;
        background: linear-gradient(to right, #DAF4D2, #88c07e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .role {
        font-size: 12.8px;
        color: rgba(218, 244, 210, 0.7);
        font-weight: 400;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin: 0;
    }

    .hint {
        display: flex;
        align-items: center;
        gap: 6.4px;
        color: rgba(218, 244, 210, 0.5);
        font-size: 10.4px;
        margin-bottom: 8px;
    }

    /* Back Styles */
    .back-content {
        justify-content: center;
    }

    .back-content h3 {
        margin-bottom: 16px;
        font-size: 19.2px;
    }

    .bio {
        font-size: 12px;
        line-height: 1.6;
        color: rgba(218, 244, 210, 0.9);
        margin-bottom: 24px;
        text-align: center;
    }

    .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
    }

    .skill-tag {
        background: rgba(218, 244, 210, 0.1);
        padding: 6.4px 12.8px;
        border-radius: 80px;
        font-size: 10.4px;
        font-weight: 500;
        color: #daf4d2;
        border: 1px solid rgba(218, 244, 210, 0.05);
    }
</style>

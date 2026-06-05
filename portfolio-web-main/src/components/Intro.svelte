<script>
    import Tag from "./Tag.svelte";
    import { fade } from "svelte/transition";
</script>

<section>
    <div class="globalwrapper" in:fade={{ duration: 2000 }}>
        <div class="text-container">
            <h4>Hello!</h4>
            <span class="typing-text"><h1>I'm Hari Prasad</h1></span>
        </div>
        <div class="tags-container">
            <Tag name="Designer" />
            <Tag name="Coder" />
            <Tag name="Musician" />
        </div>
    </div>
    <!-- Animated scroll-down chevron -->
    <div class="scroll-chevron" aria-hidden="true">
        <div class="chevron-arrow"></div>
    </div>
</section>

<style>
    section {
        background-color: rgba(4, 33, 37, 1);
        background-repeat: no-repeat;
        background-image: url("/home-bg.png");
        background-position: center;
        background-size: contain;
        font-family: "DM Sans", sans-serif;
        color: #daf4d2;
        display: flex;
        flex-direction: column;
        height: 870px;
        align-items: center;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        align-self: center;
        align-content: center;
        position: relative;
    }

    .globalwrapper {
        margin-top: 60px;
        padding: 10px;
        align-items: center;
        align-content: center;
        align-self: center;
        text-align: center;
    }

    .text-container {
        align-items: center;
        text-align: center;
        align-self: center;
        gap: none;
    }

    h1 {
        font-size: 72px;
        font-weight: 400;
        margin: 0px;
        padding-bottom: 10px;
        display: inline-block;
    }

    /* Typewriter cursor blink effect */
    h1::after {
        content: "|";
        display: inline-block;
        margin-left: 4px;
        animation: blink 1s step-end infinite;
        color: #daf4d2;
        font-weight: 300;
    }

    @keyframes blink {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }

    h4 {
        margin: 0px;
        font-size: 24px;
        padding-bottom: 10px;
        font-weight: 400;
    }

    .tags-container {
        align-items: center;
        align-self: center;
        justify-content: center;
        justify-self: center;
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    /* Animated scroll-down chevron */
    .scroll-chevron {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        animation: bob 2s ease-in-out infinite;
    }

    .chevron-arrow {
        width: 24px;
        height: 24px;
        border-right: 2px solid rgba(218, 244, 210, 0.6);
        border-bottom: 2px solid rgba(218, 244, 210, 0.6);
        transform: rotate(45deg);
    }

    @keyframes bob {
        0%, 100% {
            transform: translateX(-50%) translateY(0px);
            opacity: 0.6;
        }
        50% {
            transform: translateX(-50%) translateY(12px);
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 48px;
        }

        h4 {
            font-size: 18px;
        }

        .tags-container {
            scale: 0.8;
        }

        .globalwrapper {
            background-size: contain;
        }

        .scroll-chevron {
            bottom: 24px;
        }

        .chevron-arrow {
            width: 18px;
            height: 18px;
        }
    }
</style>

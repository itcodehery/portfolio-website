<script>
    import { fade } from "svelte/transition";
    import Tag from "./Tag.svelte";
</script>

<section>
    <div class="globalwrapper" transition:fade={{ duration: 2000 }}>
        <div class="text-container">
            <h4>Hello!</h4>
            <h1>I'm Hari Prasad</h1>
        </div>
        <div class="tags-container">
            <Tag name="Designer" />
            <Tag name="Coder" />
            <Tag name="Musician" />
        </div>
    </div>
</section>

<style>
    section {
        background-color: rgba(4, 33, 37, 1);
        background-repeat: no-repeat;
        font-family: "Circular Standard", sans-serif;
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
    }

    .globalwrapper {
        background-image: url("/home-bg.png");
        background-position: center;
        background-size: cover;
        margin-top: 100px;
        padding: 280px;
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
        font-weight: lighter;
        letter-spacing: -2px;
        margin: 0px;
        padding-bottom: 10px;
    }

    h4 {
        margin: 0px;
        font-size: 24px;
        padding-bottom: 10px;
        font-weight: lighter;
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
    }
</style>

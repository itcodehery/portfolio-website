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
</section>

<style>
    section {
        font-family: "DM Sans", sans-serif;
        color: #daf4d2;
        display: flex;
        flex-direction: column;
        height: 696px;
        align-items: center;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        align-self: center;
        align-content: center;
        position: relative;
    }

    .globalwrapper {
        margin-top: 48px;
        padding: 8px;
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
        font-size: 57.6px;
        font-weight: 400;
        margin: 0px;
        padding-bottom: 8px;
        display: inline-block;
    }





    h4 {
        margin: 0px;
        font-size: 19.2px;
        padding-bottom: 8px;
        font-weight: 400;
    }

    .tags-container {
        align-items: center;
        align-self: center;
        justify-content: center;
        justify-self: center;
        display: flex;
        flex-direction: row;
        gap: 8px;
    }

    @media (max-width: 614.4px) {
        h1 {
            font-size: 38.4px;
        }

        h4 {
            font-size: 14.4px;
        }

        .tags-container {
            scale: 0.8;
        }

        .globalwrapper {
            background-size: contain;
        }
    }
</style>

<script>
    import { onMount } from "svelte";
    import MeCard from "./MeCard.svelte";
    import { fade, fly } from "svelte/transition";

    let isVisible = false;

    onMount(() => {
        // get element by id
        const element = document.getElementById("globalwrap");
        // when the element is in view, set isVisible to true
        if (element) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            isVisible = true;
                        }
                    });
                },
                {
                    threshold: 0.5,
                },
            );
            observer.observe(element);
        }
    });
</script>

<section>
    <div class="global-wrapper" id="globalwrap">
        {#if isVisible}
            <div class="leftwrapper" transition:fly={{ duration: 2000 }}>
                <MeCard />
            </div>
        {/if}
        <div class="rightwrapper">
            <div class="text-container">
                <h4>I am a</h4>
                <h1>Frontend</h1>
                <h1>Developer and</h1>
                <h1>Designer</h1>
            </div>
        </div>
    </div>
</section>

<style>
    section {
        background-color: #daf4d2;
        background-image: url("/who-bg.png");
        background-size: cover;
        background-repeat: no-repeat;
        font-family: "Circular Standard", sans-serif;
        color: rgba(4, 33, 37, 1);
        display: flex;
        flex-direction: row;
        height: 870px;
        align-items: center;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        align-self: center;
        align-content: center;
    }

    .rightwrapper {
        margin-top: 100px;
        align-items: center;
        align-content: center;
        align-self: center;
        text-align: center;
    }

    .leftwrapper {
        align-items: center;
        align-content: center;
        align-self: center;
        text-align: left;
        justify-content: center;
        justify-items: center;
        padding: 20px 120px;
        margin-right: 200px;
    }

    .text-container {
        align-items: center;
        text-align: left;
        align-self: center;
        line-height: 56px;
    }

    h1 {
        font-size: 72px;
        font-weight: lighter;
        letter-spacing: -5px;
        margin: 0px;
        padding-bottom: 10px;
    }

    h4 {
        margin: 0px;
        font-size: 24px;
        padding-bottom: 10px;
        font-weight: lighter;
        letter-spacing: -2px;
    }

    .global-wrapper {
        display: flex;
        flex-direction: row;
    }
</style>

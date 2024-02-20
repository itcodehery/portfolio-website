<script>
    import { onMount } from "svelte";
    import MeCard from "./MeCard.svelte";
    import { fly } from "svelte/transition";

    let isVisible = false;

    onMount(() => {
        const element = document.getElementById("globalwrap");
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
        transition: all 0.5s ease-in-out;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

    @media (max-width: 768px) {
        section {
            background-size: auto;
        }
        .global-wrapper {
            display: flex;
            flex-direction: column;
        }

        .leftwrapper {
            margin-right: 0px;
            padding: 20px 20px;
        }

        h1 {
            font-size: 48px;
            letter-spacing: -3px;
        }

        h4 {
            font-size: 24px;
            letter-spacing: -1px;
        }

        .text-container {
            line-height: 34px;
        }
    }
</style>

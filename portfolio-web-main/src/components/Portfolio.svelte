<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Carousel from "./carousel.svelte";

    let isMobile = false;

    onMount(() => {
        if (window.innerWidth < 768) {
            isMobile = true;
        }
    });
</script>

<section id="portfolio">
    <div class="global-wrap">
        <!-- a marquee title -->
        <div class="text-container">
            <span>MY DESIGN PORTFOLIO</span>
            <button on:click={() => goto("/portfolio")}
                >{isMobile ? "View Portfolio" : "View All"}</button
            >
        </div>
        <div class="global-wrapper">
            <Carousel />
        </div>
    </div>
</section>

<style>
    section {
        background-image: url("/portfolio-bg.png");
        background-size: cover;
        background-color: rgba(4, 33, 37, 1);
        background-repeat: no-repeat;
        font-family: "Circular Standard", sans-serif;
        color: #daf4d2;
        display: flex;
        flex-direction: column;
        height: 700px;
        align-items: center;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        align-self: center;
        align-content: center;
    }

    .text-container {
        display: flex;
        flex-direction: row;
        align-self: center;
        align-items: center;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        margin: 10px;
        height: 40px;
        width: 100%;
        padding: 20px;
        letter-spacing: 10px;
        overflow: hidden;
        white-space: no-wrap;
        text-align: center;
    }

    button {
        min-height: 44px;
        min-width: 80px;
        font-family: "Circular Standard", sans-serif;
        background-color: var(--cyan-dark);
        color: var(--lime-light);
        padding: 2px 25px;
        border: none;
        gap: 14px;
        align-items: center;
        align-self: center;
        text-align: center;
        border-radius: 40px;
        display: flex;
        flex-direction: row;
        transition: ease-in 300ms;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        cursor: pointer;
    }

    button:hover {
        scale: 0.9;
        border: 1px solid var(--lime-light);
        background-color: #042429;
    }

    button:active {
        scale: 0.9;
        border: 1px solid var(--lime-light);
        background-color: #042429;
    }

    span {
        font-size: 48px;
        margin-top: 5px;
    }

    /* .global-wrapper {
        display: flex;
        flex-direction: row;
    } */

    .global-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        align-self: center;
        align-content: center;
    }

    @media (max-width: 768px) {
        section {
            height: 500px;
            flex-direction: column;
        }

        .text-container {
            height: 160px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            justify-items: center;
            justify-self: center;
            align-self: center;
            align-content: center;
            text-align: center;
        }

        span {
            font-size: 36px;
            align-self: center;
            align-items: center;
            justify-content: center;
            justify-items: center;
            justify-self: center;
            margin-bottom: 20px;
        }

        .global-wrapper {
            display: none;
        }
    }
</style>

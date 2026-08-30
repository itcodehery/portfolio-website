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
            <div class="marquee-wrapper">
                <div class="marquee-track">
                    <span>My Design Portfolio&nbsp;✦&nbsp;My Design Portfolio&nbsp;✦&nbsp;My Design Portfolio&nbsp;✦&nbsp;</span>
                    <span aria-hidden="true">My Design Portfolio&nbsp;✦&nbsp;My Design Portfolio&nbsp;✦&nbsp;My Design Portfolio&nbsp;✦&nbsp;</span>
                </div>
            </div>
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
        font-family: "DM Sans", sans-serif;
        color: #daf4d2;
        display: flex;
        flex-direction: column;
        height: 560px;
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
        margin: 8px;
        height: 32px;
        width: 100%;
        padding: 16px;
        letter-spacing: -1px;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
    }

    /* Marquee wrapper and animation */
    .marquee-wrapper {
        flex: 1;
        overflow: hidden;
        position: relative;
        mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }

    .marquee-track {
        display: inline-flex;
        animation: marquee 20s linear infinite;
        white-space: nowrap;
    }

    .marquee-track span {
        font-size: 38.4px;
        margin-top: 4px;
        display: inline-block;
        flex-shrink: 0;
    }

    @keyframes marquee {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    button {
        min-height: 35.2px;
        min-width: 64px;
        font-family: "Circular Standard", sans-serif;
        background-color: var(--cyan-dark);
        color: var(--lime-light);
        padding: 1.6px 20px;
        border: none;
        gap: 11.2px;
        align-items: center;
        align-self: center;
        text-align: center;
        border-radius: 32px;
        display: flex;
        flex-direction: row;
        transition: ease-in 300ms;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        cursor: pointer;
        flex-shrink: 0;
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

    @media (max-width: 614.4px) {
        section {
            height: 400px;
            flex-direction: column;
        }

        .text-container {
            height: 128px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            justify-items: center;
            justify-self: center;
            align-self: center;
            align-content: center;
            text-align: center;
        }

        /* On mobile, no marquee — show static text */
        .marquee-track {
            animation: none;
        }

        .marquee-track span {
            font-size: 28.8px;
            align-self: center;
            align-items: center;
            justify-content: center;
            justify-items: center;
            justify-self: center;
            margin-bottom: 16px;
        }

        /* Hide duplicated span on mobile */
        .marquee-track span:nth-child(2) {
            display: none;
        }

        .global-wrapper {
            display: none;
        }
    }
</style>

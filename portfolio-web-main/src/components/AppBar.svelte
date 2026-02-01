<script lang="ts">
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";
    import Alert from "./Alert.svelte";

    function navigateTo(link: string) {
        goto(link);
    }

    let showAlert = $state(false);
    let alertMessage = $state("");

    const showAlertMessage = (message: string) => {
        // for duration of 3 seconds, show the alert
        alertMessage = message;
        showAlert = true;
        setTimeout(() => {
            showAlert = false;
        }, 5000);
    };
</script>

<header class="app-bar">
    <div class="app-bar_container">
        <div class="home-wrap">
            <button class="home-button" on:click={() => navigateTo("/")}>
                <h2>Hari Prasad</h2>
            </button>
        </div>

        <nav class="app-bar__nav">
            <button class="secondary-but" on:click={() => navigateTo("/links")}>
                <div class="icon_id">
                    <Icon icon="material-symbols:link" width="24" />
                </div>
                <p class="button_text">Links</p>
            </button>
            <button class="secondary-but" on:click={() => navigateTo("/portfolio")}>
                <div class="icon_id">
                    <Icon icon="material-symbols:design-services" width="24" />
                </div>
                <p class="button_text">Portfolio</p>
            </button>
        </nav>

        <div class="contact-wrap">
            <button
                class="primary-button"
                on:click={() => showAlertMessage("Email: haririo321@gmail.com \nPhone: +91 90080 15121")}
            >
                Contact
            </button>
        </div>
    </div>
    {#if showAlert}
        <div class="alert-container">
            <Alert message={alertMessage} />
        </div>
    {/if}
</header>

<style>
    /* @import "../fontimport.css"; */

    .app-bar {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(4, 33, 37, 0.5);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        padding: 0 20px;
        height: 70px;
        width: 95%;
        color: #daf4d2;
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba(218, 244, 210, 0.1);
        margin-top: 10px;
        border-radius: 100px;
    }

    .app-bar_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .home-wrap {
        flex: 1;
        display: flex;
        justify-content: flex-start;
    }

    .app-bar__nav {
        flex: 2;
        display: flex;
        justify-content: center;
        gap: 1.5rem;
    }

    .contact-wrap {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }

    .icon_id {
        display: none;
    }

    .button_text {
        display: flex;
        padding: 0;
        margin: 0;
    }

    .primary-button {
        background-color: rgba(7, 59, 66, 1);
        color: #daf4d2;
        padding: 10px 24px;
        font-size: 14px;
        border: none;
        border-radius: 100px;
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid transparent;
    }

    .primary-button:hover {
        background-color: var(--lime-light);
        color: var(--cyan-dark);
        border: 1px solid var(--lime-light);
    }

    .secondary-but {
        background-color: transparent;
        color: #daf4d2;
        padding: 8px 16px;
        font-size: 14px;
        border: none;
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        opacity: 0.8;
    }

    .secondary-but:hover {
        opacity: 1;
        color: var(--lime-light);
    }

    .alert-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 850px) {
        .app-bar {
            width: 100%;
            height: 60px;
            margin-top: 0;
            border-radius: 0;
            left: 0;
            transform: none;
            box-sizing: border-box;
            padding: 0 16px;
        }

        .button_text {
            display: none;
        }

        .icon_id {
            display: flex;
        }

        .secondary-but {
            padding: 10px;
        }

        h2 {
            font-size: 16px !important;
        }
    }

    h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: -0.5px;
    }

    .home-button {
        background-color: transparent;
        color: var(--lime-light);
        border: none;
        cursor: pointer;
        padding: 0;
    }
</style>
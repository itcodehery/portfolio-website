<script lang="ts">
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";
    import Alert from "./Alert.svelte";

    function navigateTo(link: string) {
        goto(link);
    }

    let showAlert = false;
    let alertMessage = "";

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
            <button class="home-button" on:click={() => navigateTo("/")}
                ><h2
                    style="font-weight: lighter; letter-spacing: -0.2px; display: flex;"
                >
                    Hari Prasad
                </h2></button
            >
        </div>
        <nav class="app-bar__nav">
            <button class="secondary-but" on:click={() => navigateTo("/links")}
                ><div class="icon_id">
                    <Icon icon="material-symbols:link" width="24" />
                </div>
                <p class="button_text">Links</p></button
            >
            <div class="name_container">
                <button class="home-button" on:click={() => navigateTo("/")}
                    >Hari Prasad</button
                >
            </div>
            <button
                class="secondary-but"
                on:click={() => navigateTo("/portfolio")}
                ><div class="icon_id">
                    <Icon icon="material-symbols:design-services" width="24" />
                </div>
                <p class="button_text">Portfolio</p></button
            >
        </nav>
        <button
            class="primary-button"
            on:click={() =>
                showAlertMessage(
                    "Email: haririo321@gmail.com \nPhone: +91 90080 15121",
                )}>Contact</button
        >
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
        /* hide appbar on scroll */
        position: fixed;
        top: 5%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(4, 33, 37, 0.5);
        backdrop-filter: blur(7px);
        -webkit-backdrop-filter: blur(7px);
        padding: 20px;
        height: 50px;
        width: 98%;
        color: #daf4d2;
        font-family: "Circular Standard", sans-serif;
        font-weight: lighter;
        justify-content: center;
        align-items: center;
        align-self: center;
        z-index: 3;
    }

    .app-bar_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
    }

    .name_container {
        font-weight: lighter;
        letter-spacing: -0.2px;
        display: none;
    }

    .icon_id {
        display: none;
        padding: 0;
        margin: 0;
    }

    .button_text {
        display: flex;
        padding: 0;
        margin: 0;
    }

    .primary-button {
        /* convert bg color #073B42 to rgba */
        background-color: rgba(7, 59, 66, 1);
        color: #daf4d2;
        padding: 25px 50px;
        font-size: 14px;
        border: none;
        border-radius: 200px;
        font-family: "Circular Standard", sans-serif;
        font-weight: lighter;
        cursor: pointer;
        transition: ease-in 300ms;
    }

    .primary-button:hover {
        background-color: rgb(5, 42, 47, 0.3);
    }

    .primary-button:active {
        scale: 0.9;
    }

    .secondary-but {
        background-color: rgba(7, 59, 66, 0.1);
        color: #daf4d2;
        padding: 25px 50px;
        font-size: 14px;
        border: none;
        border-radius: 200px;
        font-family: "Circular Standard", sans-serif;
        font-weight: lighter;
        cursor: pointer;
        transition: ease-in 300ms;
    }

    .secondary-but:hover {
        background-color: rgba(7, 59, 66, 0.3);
    }

    .alert-container {
        position: fixed;
        top: 8;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: ease-in 300ms;
    }

    @media (max-width: 768px) {
        .app-bar {
            position: fixed;
            top: 0;
            left: 0;
            transform: none;
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 50px;
            padding: 10px;
        }

        .app-bar_container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .primary-button {
            display: none;
            padding: 4px 4px;
            margin: 4px;
        }

        .primary-button:active {
            scale: 0.95;
        }

        .secondary-but {
            padding: 20px 40px;
            margin: 4px;
        }

        .secondary-but:active {
            scale: 0.9;
        }

        .home-wrap {
            display: none;
        }

        .app-bar__nav {
            display: none;
        }

        .name_container {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        .icon_id {
            display: flex;
            padding: 0;
            margin: 0;
        }

        .button_text {
            display: none;
            padding: 0;
            margin: 0;
        }
    }

    h2 {
        padding-left: 10px;
        font-family: "Circular Standard", sans-serif;
    }

    .app-bar__nav {
        display: flex;
        gap: 1rem;
    }

    .home-button {
        background-color: transparent;
        color: var(--lime-light);
        border: none;
        border-radius: 200px;
        font-size: 14px;
        font-family: "Circular Standard", sans-serif;
        border: none;
        border-radius: 200px;
        cursor: pointer;
        transition: ease-in 300ms;
    }
</style>

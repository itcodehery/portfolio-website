<script lang="ts">
    import Icon from "@iconify/svelte";
    import { fade } from "svelte/transition";
    // make it so that I export a name and I have a const dictionary where each name is linked to an icon. The names are Coder, Designer and Musician.
    export let name: string;
    // assign a type of string to string to the below dictionary
    function openLink(url: string) {
        window.open(url, "_blank");
    }
</script>

{#if name == "Designer"}
    <button
        on:click={() => openLink("/")}
        transition:fade={{ delay: 1000, duration: 1000 }}
    >
        <p>{name}</p>
        <Icon
            icon="material-symbols:design-services-outline"
            style="color: #DAF4D2; scale: 1.4;"
        />
    </button>
{:else if name == "Coder"}
    <button
        on:click={() => openLink("https://github.com/itcodehery")}
        transition:fade={{ delay: 1500, duration: 1000 }}
    >
        <p>{name}</p>
        <Icon
            icon="material-symbols:code"
            style="color: #DAF4D2; scale: 1.4;"
        />
    </button>
{:else}
    <button
        on:click={() =>
            openLink(
                "https://www.youtube.com/channel/UCKsrfag-JNkGQ2YJmElAkQQ",
            )}
        transition:fade={{ delay: 2000, duration: 1000 }}
    >
        <p>{name}</p>
        <Icon
            icon="material-symbols:genres-outline"
            style="color: #DAF4D2; scale: 1.4;"
        />
    </button>
{/if}

<style>
    :root {
        --cyan-dark: #073b42;
        --lime-light: #daf4d2;
    }
    button {
        min-height: 10px;
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
        color: var(--lime-light);
    }
</style>

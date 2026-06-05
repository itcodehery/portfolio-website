<script lang="ts">
    import Icon from "@iconify/svelte";
    import { fade } from "svelte/transition";
    // make it so that I export a name and I have a const dictionary where each name is linked to an icon. The names are Coder, Designer and Musician.
    let { name }: { name: string } = $props();
    // assign a type of string to string to the below dictionary
    function openLink(url: string) {
        window.open(url, "_blank");
    }
</script>

{#if name == "Designer"}
    <button
        onclick={() => scrollTo(0, 800)}
        transition:fade={{ delay: 1200, duration: 1000 }}
    >
        <p>{name}</p>
        <Icon
            icon="material-symbols:design-services-outline"
            style="color: #DAF4D2; scale: 1.4;"
        />
    </button>
{:else if name == "Coder"}
    <button
        onclick={() => openLink("https://github.com/itcodehery")}
        transition:fade={{ delay: 1800, duration: 1000 }}
    >
        <p>{name}</p>
        <Icon
            icon="material-symbols:code"
            style="color: #DAF4D2; scale: 1.4;"
        />
    </button>
{:else}
    <button
        onclick={() =>
            openLink(
                "https://www.youtube.com/channel/UCKsrfag-JNkGQ2YJmElAkQQ",
            )}
        transition:fade={{ delay: 2400, duration: 1000 }}
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
        font-family: "DM Sans", sans-serif;
        background-color: var(--cyan-dark);
        color: var(--lime-light);
        padding: 2px 25px;
        border: 1px solid transparent;
        gap: 14px;
        align-items: center;
        align-self: center;
        text-align: center;
        border-radius: 40px;
        display: flex;
        flex-direction: row;
        transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
        cursor: pointer;
        position: relative;
    }

    button:hover {
        scale: 0.9;
        color: var(--lime-light);
        box-shadow: 0 0 15px rgba(218, 244, 210, 0.25);
        border: 1px solid rgba(218, 244, 210, 0.3);
        background-image: linear-gradient(var(--cyan-dark), var(--cyan-dark)),
            linear-gradient(90deg, rgba(218, 244, 210, 0.1), rgba(218, 244, 210, 0.4), rgba(218, 244, 210, 0.1));
        background-origin: border-box;
        background-clip: padding-box, border-box;
    }
</style>
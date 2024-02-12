<script lang="ts">
    import Icon from '@iconify/svelte';
    // make it so that I export a name and I have a const dictionary where each name is linked to an icon. The names are Coder, Designer and Musician.
    export let name: string;
    // assign a type of string to string to the below dictionary
</script>

<style>
    :root {
        --cyan-dark: #073B42;
        --lime-light: #DAF4D2;
    }
    button {
        min-height: 10px;
        min-width: 80px;
        font-family: 'Circular Standard', sans-serif;
        background-color: var(--cyan-dark);
        color: var(--lime-light);
        padding: 2px 25px;
        border: none;
        gap:14px;
        align-items: center;
        align-self: center;
        text-align: center;
        border-radius: 40px;
        display: flex;
        flex-direction: row;
        transition: ease-in 300ms;
    }

    button:hover {
        background-color: #031e22;
        color: var(--lime-light);
    }
</style>

{#if name == "Designer"}
<button>
    <p>{name}</p>
    <Icon icon="material-symbols:design-services-outline" style="color: #DAF4D2; scale: 1.4;"/>
</button>
{:else if name == "Coder"}
<button>
    <p>{name}</p>
    <Icon icon="material-symbols:code" style="color: #DAF4D2; scale: 1.4;"/>
</button>
{:else}
<button>
    <p>{name}</p>
    <Icon icon="material-symbols:genres-outline" style="color: #DAF4D2; scale: 1.4;"/>
</button>
{/if}

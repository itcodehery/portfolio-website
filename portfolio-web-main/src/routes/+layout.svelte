<script lang="ts">
    import AppBar from "../components/AppBar.svelte";
    import SoundLab from "../components/SoundLab.svelte";
    import LabFloatingButton from "../components/LabFloatingButton.svelte";
</script>

<header>
    <AppBar />
</header>

<slot />
<LabFloatingButton />
<SoundLab />

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: rgba(4, 33, 37, 1);
        color: #daf4d2;
        scroll-behavior: smooth;
        padding-bottom: 30px;
        overflow-x: hidden;
        max-width: 100vw;
    }

    /* Custom themed scrollbar */
    :global(::-webkit-scrollbar) {
        width: 6px;
    }

    :global(::-webkit-scrollbar-track) {
        background: #073b42;
    }

    :global(::-webkit-scrollbar-thumb) {
        background: rgba(218, 244, 210, 0.3);
        border-radius: 3px;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background: rgba(218, 244, 210, 0.5);
    }
</style>

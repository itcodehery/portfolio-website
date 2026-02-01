<script lang="ts">
    import AppBar from "../components/AppBar.svelte";
    import FooterContact from "../components/FooterContact.svelte";
</script>

<header>
    <AppBar />
</header>

<slot />

<footer>
    <FooterContact />
</footer>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: rgba(4, 33, 37, 1);
        color: #daf4d2;
    }
</style>

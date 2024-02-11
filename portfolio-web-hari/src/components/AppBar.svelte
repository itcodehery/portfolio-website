<script type=ts>
    import { goto } from "$app/navigation";


    function handleButtonClick(link: string) {
        goto(link);
    }
</script>

<style>

</style>

<header class="app-bar">
    <div class="app-bar__container">
        <div>
            <h2>Hari Prasad</h2>
        </div>
        <nav class="app-bar__nav">
            <button on:click={() => handleButtonClick("")}>Portfolio</button>
            <button on:click={() => handleButtonClick("")}>Linktree</button>
        </nav>
        <button on:click={() => handleButtonClick("")}>Contact</button>
    </div>
</header>
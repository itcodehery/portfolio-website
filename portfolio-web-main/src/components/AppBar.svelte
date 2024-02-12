<script lang="ts">
    function openLink (url:string) {
        window.open(url, '_blank');
    }

    function scrollToCategory(category:string) {
        const categoryElement = document.getElementById(category);
        if(categoryElement) {
            categoryElement.scrollIntoView({behavior: "smooth"});
        }
    }
</script>

<style>
    @import '../fontimport.css';

    .app-bar {
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
        color: #DAF4D2;
        font-family: 'Circular Standard', sans-serif;
        font-weight: lighter;
        justify-content: center;
        align-items: center;
        align-self: center;
    }

    .app-bar_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
    }

    h2 {
        padding-left: 10px;
    }

    .app-bar__nav {
        display: flex;
        gap: 1rem;
    }

    .primary-button {
        /* convert bg color #073B42 to rgba */
        background-color: rgba(7, 59, 66, 1);
        color: #DAF4D2;
        padding: 25px 50px;
        font-size: 14px;
        border: none;
        border-radius: 200px;
        font-family: 'Circular Standard', sans-serif;
        cursor: pointer;
        transition: ease-in 300ms;
    }

    .primary-button:hover {
        background-color: rgb(5, 42, 47);
    }

    .secondary-but {
        background-color: rgba(7, 59, 66, 0.1);
        color: #DAF4D2;
        padding: 25px 50px;
        border:none;
        border-radius: 200px;
        font-size: 14px;
        font-family: 'Circular Standard', sans-serif;
        border: none;
        border-radius: 200px;
        cursor: pointer;
        transition: ease-in 300ms;
    }

    .secondary-but:hover {
        background-color: rgba(7,59,66,0.3);
    }
</style>

<header class="app-bar">
    <div class="app-bar_container">
        <div>
            <h2 style="font-weight: lighter;">Hari Prasad</h2>
        </div>
        <nav class="app-bar__nav">
            <button class="secondary-but" on:click={() => scrollToCategory("portfolio")}>Portfolio</button>
            <button class="secondary-but" on:click={() => openLink("https://linktr.ee/itwritshery")}>Linktree</button>
        </nav>
        <button class="primary-button">Contact</button>
    </div>
</header>
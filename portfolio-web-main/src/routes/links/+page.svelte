<script>
    import { goto } from "$app/navigation";

    //create links for all the buttons in the code below
    const links = [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/hari-prasad-43285a24a/",
            category: "Career and Code",
        },
        {
            name: "GitHub",
            url: "https://github.com/itcodehery",
            category: "Career and Code",
        },
        {
            name: "Codecademy",
            url: "https://www.codecademy.com/profiles/itwritshery",
            category: "Career and Code",
        },
        {
            name: "Spotify Artist Profile",
            url: "https://open.spotify.com/artist/5uzY3x7q567a2Fmg7fKbWh?si=tNyS3kdmSmqSOnwsi34jxg&utm_source=copy-link",
            category: "Creative",
        },
        {
            name: "My YouTube Channel",
            url: "https://youtube.com/channel/UCKsrfag-JNkGQ2YJmElAkQQ",
            category: "Creative",
        },
        {
            name: "Blog Posts on Hobservations",
            url: "https://hobservationsda.blogspot.com/?m=1",
            category: "Creative",
        },
        {
            name: "My Taste in Music",
            url: "https://open.spotify.com/playlist/6Rq8atjLtB5oRtzE7eC8Gs?si=1iesUHXxT4yz81wR5Xytjg&utm_source=copy-link",
            category: "What's these?",
        },
        {
            name: "The Vox Technologia Collective",
            url: "https://vox-tech-collective.vercel.app/",
            category: "What's these?",
        },
    ];
</script>

<main>
    <div class="global-wrapper">
        <img src="/me.jpg" alt="me" width="100" height="100" />
        <h1>My Links</h1>
        <p>I do a lotta stuff.</p>
        <div class="category">
            <h3>Career and Code</h3>
            <!-- <p style="font-weight: 100; font-size:medium; text-align:center;">
                Each of these links have their own descriptions of me
            </p> -->
            {#each links.filter((link) => link.category === "Career and Code") as link}
                <button
                    class="main-button"
                    on:click={() => window.open(link.url)}>{link.name}</button
                >
            {/each}
        </div>
        <div class="category">
            <h3>Creative</h3>
            {#each links.filter((link) => link.category === "Creative") as link}
                <button
                    class="main-button"
                    on:click={() => window.open(link.url)}>{link.name}</button
                >
            {/each}
        </div>
        <div class="category">
            <h3>What're these?</h3>
            {#each links.filter((link) => link.category === "What's these?") as link}
                <button
                    class="main-button"
                    on:click={() => window.open(link.url)}>{link.name}</button
                >
            {/each}
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: "Circular Standard", sans-serif;
        color: #daf4d2;
        padding-top: 320px;
        padding-bottom: 280px;
        background-color: rgba(4, 33, 37, 1);
        background-image: url("/home-bg.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
    }

    .global-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    img {
        border-radius: 50%;
        margin: 10px;
    }

    p {
        padding-bottom: 20px;
    }

    .category {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10px;
        padding: 20px;
        border: 2px solid #daf4d210;
        border-radius: 10px;
        background-color: #052b30;
    }

    h1 {
        font-size: 2.8em;
        font-weight: lighter;
        letter-spacing: -1px;
        margin: 10px;
    }

    h3 {
        font-size: 1.5em;
        margin: 10px;
        font-weight: lighter;
    }

    p {
        font-size: 1.2em;
        margin: 10px;
    }

    .main-button {
        background-color: #daf4d2;
        color: #042125;
        border: none;
        padding: 20px 30px;
        font-family: "Circular Standard", sans-serif;
        font-size: 6px;
        min-width: 800px;
        margin: 10px;
        border-radius: 10px;
        font-size: 1.2em;
        cursor: pointer;
        transition: ease-in 300ms;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .main-button:hover {
        scale: 0.98;
    }

    .main-button:active {
        background-color: #cde5c6;
    }

    @media (max-width: 768px) {
        .main-button {
            min-width: 320px;
        }

        h1 {
            font-size: 2em;
        }

        h3 {
            font-size: 1.2em;
        }

        p {
            font-size: 1em;
        }

        .global-wrapper {
            padding: 10px;
        }

        img {
            width: 80px;
            height: 80px;
        }

        main {
            padding-top: 120px;
            padding-bottom: 120px;
        }

        .category {
            padding: 10px;
        }

        .main-button {
            padding: 10px 20px;
            font-size: 0.8em;
            margin: 4px;
            border-radius: 5px;
        }

        .main-button:hover {
            scale: 0.98;
        }

        .main-button:active {
            background-color: #cde5c6;
            scale: 0.9;
        }
    }
</style>

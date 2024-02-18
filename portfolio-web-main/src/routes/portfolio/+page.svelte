<script lang="ts">
    import "../../fontimport.css";
    let images = [
        {
            url: "/carousel/blogger.png",
            alt: "blogger",
            name: "Blogger Redesign",
            details:
                "A redesign of the Blogger website, following Google's Material Design 3 Language.",
        },
        {
            url: "/carousel/deepstash.png",
            alt: "deepstash",
            name: "Deepstash Redesign",
            details:
                "A redesign of the Deepstash app. The goal was to make the app more eye-catching and simple.",
        },
        {
            url: "/carousel/roadmap.png",
            alt: "roadmap",
            name: "Roadmap App Design",
            details:
                "A design of a roadmap app, with easy to access features and a modern look.",
        },
        {
            url: "/carousel/twitch.png",
            alt: "twitch",
            name: "Twitch Redesign",
            details:
                "A redesign of the Twitch website based on an inspiration more than practicality.",
        },
        {
            url: "/carousel/whatsapp.png",
            alt: "whatsapp",
            name: "Whatsapp Redesign",
            details:
                "A redesign of the Whatsapp app, with a more modern look and a better user experience.",
        },
        {
            url: "/carousel/youtube.png",
            alt: "youtube",
            name: "YouTube Redesign",
            details:
                "A redesign of the YouTube website, inspired by Apple's Cupertino Design System.",
        },
    ];

    function handleClick() {
        window.open(
            "https://www.figma.com/file/6lUhI6edjVVi2N4mEIq9wu/All-Concept-Finals?type=design&node-id=0%3A1&mode=design&t=JjXUthBvDO1YWEYY-1",
            "_blank",
        );
    }
</script>

<body>
    <div class="center">
        <h1>My Design Portfolio</h1>
        <button on:click={() => handleClick()}>View in Figma</button>
        <div class="gridview">
            {#each images as image}
                <div class="listItem">
                    <img src={image.url} alt={image.alt} width="300px" />
                    <div class="image-details">
                        <h3>{image.name}</h3>
                        <p>
                            {image.details}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</body>

<style>
    @import "./+styles.css";

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
    }

    body {
        background-color: rgba(4, 33, 37, 1);
    }
</style>

<script lang="ts">
    let designProjects = [
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

    // --- ADD YOUR CODING PROJECTS HERE ---
    let codeProjects = [
        {
            url: "/code-projects/portfolio_blipengine.png",
            alt: "Blip Engine",
            name: "Blip Engine",
            details: "An ML-Based Physics Engine that automatically recognizes uploaded objects and simulates them in a 3D World.",
            link: "https://github.com/praneethm05/blip-engine"
        },
        {
            url: "/code-projects/portfolio_forward_meridian.png",
            alt: "Forward Meridian",
            name: "Forward Meridian",
            details: "A sci-fi FPS built in Godot featuring Marathon-inspired art and futuristic South Indian worldbuilding.",
            link: "https://github.com/itcodehery/Forward-Meridian-Game"
        },
        {
            url: "/code-projects/portfolio_morsels.png",
            alt: "Morsels",
            name: "Morsels",
            details: "A logistics solution for food redistribution built with Flutter and Supabase at CodeSprint 2026.",
            link: "https://github.com/itcodehery/TeamPulse-CodeSprint26"
        },
        {
            url: "/code-projects/portfolio_sidebets.png",
            alt: "Sidebet Monad",
            name: "Sidebet Monad",
            details: "A Web3 and Telegram bot integration designed for placing stakes on trash talk.",
            link: "https://github.com/itcodehery/sidebet-monad"
        },
        {
            url: "/code-projects/portfolio_heliolisk.png",
            alt: "Heliolisk",
            name: "Heliolisk",
            details: "A Vim-like Modal Text Editor for your Terminal with a Modern TUI.",
            link: "https://github.com/itcodehery/Heliolisk"
        },
        {
            url: "/code-projects/portfolio_minty.png",
            alt: "TeachersPet",
            name: "Minty App",
            details: "A Flutter app for building custom question papers using drag-and-drop components.",
            link: "https://github.com/itcodehery/TeachersPet"
        },
        {
            url: "/code-projects/portfolio_dir2.jpg",
            alt: "dir2",
            name: "dir2 (File System)",
            details: "A Rust-based terminal for Windows that reimagines file interaction through SQL-like commands.",
            link: "https://github.com/itcodehery/Project_Directory_2"
        },
        {
            url: "/code-projects/portfolio_catport.png",
            alt: "Catport",
            name: "Catport",
            details: "A modern terminal-based file viewer with real-time live sharing and syntax highlighting.",
            link: "https://github.com/itcodehery/Project_Catport"
        }
    ];
    // -------------------------------------

    function openLink(url: string) {
        if (url) window.open(url, "_blank");
    }

    function handleClick() {
        window.open(
            "https://www.figma.com/file/6lUhI6edjVVi2N4mEIq9wu/All-Concept-Finals?type=design&node-id=0%3A1&mode=design&t=JjXUthBvDO1YWEYY-1",
            "_blank",
        );
    }
</script>

<main>
    <div class="center">
        <h1>My Code Portfolio</h1>
        <button on:click={() => window.open("https://github.com/itcodehery", "_blank")}>View All</button>
        <div class="gridview">
            {#each codeProjects as project, i}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="listItem item-{i + 1}" on:click={() => openLink(project.link)} role="button" tabindex="0">
                    <img src={project.url} alt={project.alt} />
                    <div class="overlay">
                        <div class="image-details">
                            <h3>{project.name}</h3>
                            <p>{project.details}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <div class="section-divider"></div>

        <h1>My Design Portfolio</h1>
        <button on:click={() => handleClick()}>View in Figma</button>
        <div class="gridview">
            {#each designProjects as image, i}
                <div class="listItem item-{i + 1}">
                    <img src={image.url} alt={image.alt} />
                    <div class="overlay">
                        <div class="image-details">
                            <h3>{image.name}</h3>
                            <p>{image.details}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        
        <div style="margin:0; padding: 0; height: 80px;"></div>
    </div>
</main>

<style>
    @import "./+styles.css";

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 150px;
    }

    .section-divider {
        height: 100px;
        width: 100%;
    }

    main {
        width: 100%;
        min-height: 100vh;
    }
</style>

<script lang="ts">
    import { goto } from "$app/navigation";
    import CodeCarousel from "./CodeCarousel.svelte";

    const projects = [
        {
            name: "Blip Engine",
            description: "An ML-Based Physics Engine that automatically recognizes uploaded objects and assigns physics properties to simulate them in a 3D World.",
            url: "https://github.com/praneethm05/blip-engine",
            image: "/code-projects/portfolio_blip.jpeg"
        },
        {
            name: "Forward Meridian",
            description: "A sci-fi FPS built in Godot featuring Marathon-inspired art and futuristic South Indian worldbuilding.",
            url: "https://github.com/itcodehery/Forward-Meridian",
            image: "/code-projects/portfolio_forward_meridian.png",
            playUrl: "https://drive.google.com/drive/folders/1ev6FK1xuq88BIPYJkV__uL-1AZV_Cbu0?usp=sharing"
        },
        {
            name: "Morsels",
            description: "A logistics solution for food redistribution built with Flutter and Supabase at CodeSprint 2026.",
            url: "https://github.com/itcodehery/morsels",
            image: "/code-projects/portfolio_morsels.jpg"
        },
        {
            name: "Sidebet Monad",
            description: "A Web3 and Telegram bot integration designed for placing stakes on trash talk.",
            url: "https://github.com/itcodehery/sidebet-monad",
            image: "/code-projects/portfolio_sidebet.jpg"
        },
        {
            name: "SiGUI",
            description: "A Rust TUI for managing Wi-Fi connections on Windows, published on Crates.io.",
            url: "https://github.com/itcodehery/Project_Wifi",
            image: "/code-projects/portfolio_sigui.jpg"
        },
        {
            name: "Heliolisk",
            description: "A Vim-like Modal Text Editor for your Terminal with a Modern TUI.",
            url: "https://github.com/itcodehery/Heliolisk",
            image: "/code-projects/portfolio_heliolisk.png"
        },
        {
            name: "Minty (Teacher's Pet)",
            description: "A Flutter app for building custom question papers using drag-and-drop components.",
            url: "https://github.com/itcodehery/TeachersPet",
            image: "/code-projects/portfolio_minty.png"
        },
        {
            name: "dir2 (File System Interface)",
            description: "A Rust-based terminal for Windows that reimagines file interaction through SQL-like commands.",
            url: "https://github.com/itcodehery/Project_Directory_2",
            image: "/code-projects/portfolio_dir2.jpg"
        },
        {
            name: "Caw",
            description: "A project aimed at bringing Rust's powerful memory safe Borrow Checker to the C programming language.",
            url: "https://github.com/itcodehery/Borcom-Tool-Project",
            image: "/code-projects/portfolio_caw.png"
        },
        {
            name: "Proctor",
            description: "A secure anti-cheating environment for conducting and proctoring university level Coding exams.",
            url: "https://github.com/itcodehery/Proctor-Alpha",
            image: "/code-projects/portfolio_proctor.png"
        },
        {
            name: "Catport",
            description: "A modern terminal-based file viewer with real-time live sharing and syntax highlighting.",
            url: "https://github.com/itcodehery/Project_Catport",
            image: "/code-projects/portfolio_catport.png"
        }
    ];
</script>

<section id="code-portfolio">
    <div class="global-wrap">
        <div class="text-container">
            <div class="marquee-wrapper">
                <div class="marquee-track">
                    <span>My Code Portfolio&nbsp;✦&nbsp;My Code Portfolio&nbsp;✦&nbsp;My Code Portfolio&nbsp;✦&nbsp;</span>
                    <span aria-hidden="true">My Code Portfolio&nbsp;✦&nbsp;My Code Portfolio&nbsp;✦&nbsp;My Code Portfolio&nbsp;✦&nbsp;</span>
                </div>
            </div>
            <button onclick={() => window.open("https://github.com/itcodehery", "_blank")}>View All</button>
        </div>
        <div class="global-wrapper">
            <CodeCarousel {projects} />
        </div>
    </div>
</section>

<style>
    section {
        font-family: "DM Sans", sans-serif;
        color: #daf4d2;
        display: flex;
        flex-direction: column;
        height: 560px;
        align-items: center;
        justify-content: center;
    }

    .text-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 8px;
        height: 32px;
        width: 100%;
        color: var(--cyan-dark) !important;
        padding: 16px;
        letter-spacing: -1px;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
    }

    /* Marquee wrapper and animation — reversed direction */
    .marquee-wrapper {
        flex: 1;
        overflow: hidden;
        position: relative;
        mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }

    .marquee-track {
        display: inline-flex;
        animation: marquee 20s linear infinite reverse;
        white-space: nowrap;
    }

    .marquee-track span {
        font-size: 38.4px;
        margin-top: 4px;
        margin-right: 16px;
        display: inline-block;
        flex-shrink: 0;
    }

    @keyframes marquee {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    button {
        min-height: 35.2px;
        min-width: 64px;
        font-family: "DM Sans", sans-serif;
        background-color: var(--cyan-dark);
        color: var(--lime-light);
        padding: 1.6px 20px;
        border: none;
        gap: 11.2px;
        align-items: center;
        align-self: center;
        text-align: center;
        border-radius: 32px;
        display: flex;
        flex-direction: row;
        transition: ease-in 300ms;
        cursor: pointer;
        flex-shrink: 0;
    }

    button:hover {
        transform: scale(0.95);
        border: 1px solid var(--lime-light);
        background-color: #042429;
    }

    button:active {
        transform: scale(0.9);
        border: 1px solid var(--lime-light);
        background-color: #042429;
    }

    .global-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    
    .global-wrapper {
        width: 100%;
    }

    @media (max-width: 614.4px) {
        section {
            height: auto;
            min-height: 480px;
            padding: 32px 0;
        }

        .text-container {
            height: 128px;
            flex-direction: column;
            justify-content: center;
            white-space: normal;
        }

        /* On mobile, no marquee — show static text */
        .marquee-track {
            animation: none;
        }

        .marquee-track span {
            font-size: 28.8px;
            margin-bottom: 16px;
        }

        /* Hide duplicated span on mobile */
        .marquee-track span:nth-child(2) {
            display: none;
        }
    }
</style>

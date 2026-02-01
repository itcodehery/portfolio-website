<script lang="ts">
    import { goto } from "$app/navigation";
    import CodeCarousel from "./CodeCarousel.svelte";

    const projects = [
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
            image: "/code-projects/portfolio_dir2.png"
        },
        {
            name: "Caw",
            description: "A project aimed at bringing Rust's powerful memory safe Borrow Checker to the C programming language.",
            url: "https://github.com/itcodehery/Borcom-Tool-Project",
            image: "/code-projects/portfolio_caw.png"
        },
        {
            name: "Proctor",
            description: "An Anti-Cheat coding environment for proctoring University level exams.",
            url: "https://github.com/itcodehery/Proctor-Alpha",
            image: "/code-projects/portfolio_proctor.png"
        }
    ];
</script>

<section id="code-portfolio">
    <div class="global-wrap">
        <div class="text-container">
            <span>My Code Portfolio</span>
            <button onclick={() => window.open("https://github.com/itcodehery", "_blank")}>View All</button>
        </div>
        <div class="global-wrapper">
            <CodeCarousel {projects} />
        </div>
    </div>
</section>

<style>
    section {
        /* Using a slightly different background to distinguish the sections */
        background-image: url("/who-bg.png");
        background-size: cover;
        background-color: rgba(4, 33, 37, 1);
        font-family: "DM Sans", sans-serif;
        color: #daf4d2;
        display: flex;
        flex-direction: column;
        height: 700px;
        align-items: center;
        justify-content: center;
    }

    .text-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 10px;
        height: 40px;
        width: 100%;
        color: var(--cyan-dark) !important;
        padding: 20px;
        letter-spacing: -1px;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
    }

    button {
        min-height: 44px;
        min-width: 80px;
        font-family: "DM Sans", sans-serif;
        background-color: var(--cyan-dark);
        color: var(--lime-light);
        padding: 2px 25px;
        border: none;
        gap: 14px;
        align-items: center;
        align-self: center;
        text-align: center;
        border-radius: 40px;
        display: flex;
        flex-direction: row;
        transition: ease-in 300ms;
        cursor: pointer;
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

    span {
        font-size: 48px;
        margin-top: 5px;
        margin-right: 20px;
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

    @media (max-width: 768px) {
        section {
            height: auto;
            min-height: 600px;
            padding: 40px 0;
        }

        .text-container {
            height: 160px;
            flex-direction: column;
            justify-content: center;
            white-space: normal;
        }

        span {
            font-size: 36px;
            margin-bottom: 20px;
        }
    }
</style>

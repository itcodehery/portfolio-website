<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import Icon from "@iconify/svelte";

    const milestones = [
        {
            year: "Present",
            title: "Designing for the Future",
            type: "work",
            icon: "material-symbols:work",
            description: "Working on creative interfaces, interactive portfolios, and experimental web design."
        },
        {
            year: "April 2026",
            title: "Forward Meridian",
            type: "project",
            icon: "material-symbols:rocket-launch",
            description: "Developed a massive project pushing the boundaries of web UI and interactive experiences.",
            link: "https://github.com/itcodehery/Forward-Meridian-Game"
        },
        {
            year: "Jan 31st 2026",
            title: "Morsels",
            type: "hackathon",
            icon: "material-symbols:trophy",
            description: "Built the Morsels project during an intense hackathon, focusing on innovative problem-solving.",
            link: "https://github.com/itcodehery/TeamPulse-CodeSprint26"
        },
        {
            year: "Late 2025",
            title: "Proctor",
            type: "project",
            icon: "material-symbols:security",
            description: "Developed an Anti-Cheat coding environment for proctoring University level exams.",
            link: "https://github.com/itcodehery/Proctor-Alpha"
        },
        {
            year: "November 2025",
            title: "Blip Engine",
            type: "project",
            icon: "material-symbols:memory",
            description: "Developed an ML-based Physics Engine integrating Flutter, C++ (OpenGL/GLFW), and Python. The engine automatically recognizes uploaded objects and assigns physics properties in a 3D simulated world.",
            link: "https://github.com/praneethm05/blip-engine"
        },
        {
            year: "Oct 2025",
            title: "SiGUI",
            type: "project",
            icon: "material-symbols:wifi",
            description: "Shipped a successful Rust TUI for managing Wi-Fi connections on Windows, published on Crates.io.",
            link: "https://github.com/itcodehery/Project_Wifi"
        },
        {
            year: "Aug 2025",
            title: "Sidebet Monad",
            type: "project",
            icon: "material-symbols:monetization-on",
            description: "Built a Web3 and Telegram bot integration designed for placing stakes on trash talk.",
            link: "https://github.com/itcodehery/sidebet-monad"
        },
        {
            year: "Early 2025",
            title: "Catport",
            type: "project",
            icon: "material-symbols:terminal",
            description: "Developed a modern collaborative terminal-based file viewer with real-time live sharing and syntax highlighting.",
            link: "https://github.com/itcodehery/Project_Catport"
        },
        {
            year: "Ongoing",
            title: "Community & Mentorship",
            type: "talk",
            icon: "material-symbols:campaign",
            description: "Regularly giving talks to juniors, sharing knowledge, and visiting places to connect with the tech community."
        }
    ];
</script>

<svelte:head>
    <title>Journey | Hari Prasad</title>
</svelte:head>

<div class="page-container" in:fade={{ duration: 600 }}>
    <header class="page-header" in:fly={{ y: 30, duration: 800, delay: 200 }}>
        <Icon icon="material-symbols:explore" width="48" style="color: var(--lime-light, #daf4d2);" />
        <h1>The Journey</h1>
        <p>A timeline of projects, hackathons, and community adventures.</p>
    </header>

    <div class="timeline-container">
        <div class="timeline-line"></div>
        
        {#each milestones as milestone, i}
            <div 
                class="timeline-item {i % 2 === 0 ? 'left' : 'right'}"
                in:fly={{ y: 50, duration: 800, delay: 400 + i * 150 }}
            >
                <svelte:element 
                    this={milestone.link ? 'a' : 'div'}
                    href={milestone.link}
                    target={milestone.link ? "_blank" : undefined}
                    rel={milestone.link ? "noopener noreferrer" : undefined}
                    class="timeline-content {milestone.link ? 'clickable' : ''}"
                >
                    <div class="icon-wrap">
                        <Icon icon={milestone.icon} width="24" />
                    </div>
                    <span class="year">{milestone.year}</span>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                </svelte:element>
            </div>
        {/each}
    </div>
</div>

<style>
    .page-container {
        padding: 96px 16px 80px;
        min-height: 100vh;
        max-width: 800px;
        margin: 0 auto;
        font-family: "DM Sans", sans-serif;
    }

    .page-header {
        text-align: center;
        margin-bottom: 64px;
    }

    h1 {
        font-size: 38.4px;
        font-weight: 600;
        margin: 12.8px 0;
        letter-spacing: -1px;
        background: linear-gradient(to right, #daf4d2, #88c07e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .page-header p {
        font-size: 14.4px;
        opacity: 0.7;
        margin: 0;
    }

    /* ─── Timeline Layout ─── */
    .timeline-container {
        position: relative;
        padding: 32px 0;
    }

    .timeline-line {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 1.6px;
        background: linear-gradient(to bottom, transparent, rgba(218, 244, 210, 0.2), transparent);
        transform: translateX(-50%);
    }

    .timeline-item {
        position: relative;
        width: 50%;
        padding: 0 32px;
        margin-bottom: 48px;
        box-sizing: border-box;
    }

    .timeline-item.left {
        left: 0;
        text-align: right;
    }

    .timeline-item.right {
        left: 50%;
        text-align: left;
    }

    /* Dot on the timeline */
    .timeline-item::after {
        content: '';
        position: absolute;
        top: 19.2px;
        width: 9.6px;
        height: 9.6px;
        background: #daf4d2;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(218, 244, 210, 0.5);
    }

    .timeline-item.left::after {
        right: -4.8px;
    }

    .timeline-item.right::after {
        left: -4.8px;
    }

    .timeline-content {
        position: relative;
        background: rgba(7, 59, 66, 0.4);
        border: 1px solid rgba(218, 244, 210, 0.1);
        padding: 24px;
        border-radius: 19.2px;
        backdrop-filter: blur(9.6px);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .timeline-content:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        border-color: rgba(218, 244, 210, 0.3);
    }

    .timeline-content.clickable {
        display: block;
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }

    .timeline-content.clickable:hover {
        border-color: rgba(218, 244, 210, 0.6);
        background: rgba(7, 59, 66, 0.6);
    }

    .icon-wrap {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38.4px;
        height: 38.4px;
        background: rgba(218, 244, 210, 0.1);
        border-radius: 50%;
        color: #daf4d2;
        margin-bottom: 12.8px;
    }

    .year {
        display: block;
        font-size: 11.2px;
        font-weight: 600;
        color: #88c07e;
        margin-bottom: 6.4px;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    h3 {
        font-size: 19.2px;
        margin: 0 0 9.6px 0;
        font-weight: 500;
    }

    p {
        font-size: 12px;
        line-height: 1.6;
        opacity: 0.8;
        margin: 0;
    }

    @media (max-width: 614.4px) {
        .timeline-line {
            left: 16px;
        }

        .timeline-item {
            width: 100%;
            left: 0 !important;
            padding: 0 0 0 48px;
            text-align: left !important;
        }

        .timeline-item::after {
            left: 11.2px !important;
        }
    }
</style>

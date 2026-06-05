<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import Icon from "@iconify/svelte";

    function navigateTo(link: string) {
        goto(link);
    }

    // Scroll-based opacity for the top bar
    let scrollOpacity = $state(0.5);

    $effect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const t = Math.min(scrollY / 300, 1);
            scrollOpacity = 0.5 + t * 0.4;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    });

    // Navigation Links
    const navLinks = [
        { path: '/', label: 'Home', icon: 'material-symbols:home-outline', mobileOnly: true },
        { path: '/links', label: 'Links', icon: 'material-symbols:link', mobileOnly: false },
        { path: '/portfolio', label: 'Portfolio', icon: 'material-symbols:design-services', mobileOnly: false },
        { path: '/journey', label: 'Journey', icon: 'material-symbols:explore', mobileOnly: false }
    ];

    // Sliding Pill Logic
    let hoveredTabEl = $state<HTMLElement | null>(null);
    let activeTabEl = $state<HTMLElement | null>(null);
    
    // We need to keep activeTabEl updated based on the current route
    $effect(() => {
        const currentPath = $page.url.pathname;
        const activeBtn = document.querySelector(`.nav-btn[data-path="${currentPath}"]`) as HTMLElement;
        if (activeBtn && !activeBtn.classList.contains('mobile-only')) {
            activeTabEl = activeBtn;
        } else {
            activeTabEl = null;
        }
    });

    let targetTabEl = $derived(hoveredTabEl || activeTabEl);
    let pillStyle = $derived(
        targetTabEl 
            ? `width: ${targetTabEl.clientWidth}px; left: ${targetTabEl.offsetLeft}px; opacity: 1;`
            : 'opacity: 0;'
    );

    function handleResumeClick() {
        window.open("https://drive.google.com/file/d/16QNmPdAUZmJUnCYWZvguKj26sleTFaxy/view?usp=sharing", "_blank");
    }
</script>

<header class="app-bar" style="background-color: rgba(4, 33, 37, {scrollOpacity});">
    <div class="app-bar_container">
        <div class="home-wrap">
            <button class="home-button" onclick={() => navigateTo("/")}>
                <h2>Hari Prasad</h2>
            </button>
        </div>

        <nav class="app-bar__nav desktop-nav" onmouseleave={() => hoveredTabEl = null}>
            <div class="sliding-pill" style={pillStyle}></div>
            
            {#each navLinks as link}
                <button 
                    class="nav-btn {link.mobileOnly ? 'mobile-only' : ''}"
                    class:active={$page.url.pathname === link.path}
                    data-path={link.path}
                    onmouseenter={(e) => { if(!link.mobileOnly) hoveredTabEl = e.currentTarget; }}
                    onclick={() => navigateTo(link.path)}
                    aria-label={link.label}
                >
                    <div class="icon_id">
                        <Icon icon={link.icon} width="22" />
                    </div>
                    <p class="button_text">{link.label}</p>
                </button>
            {/each}
        </nav>

        <div class="contact-wrap">
            <button class="primary-button" onclick={handleResumeClick}>
                Resume
                <Icon icon="material-symbols:download" width="18" />
            </button>
        </div>
    </div>
</header>

<!-- Mobile Dock -->
<nav class="app-bar__nav mobile-dock">
    {#each navLinks as link}
        <button 
            class="nav-btn"
            class:active={$page.url.pathname === link.path}
            onclick={() => navigateTo(link.path)}
            aria-label={link.label}
        >
            <div class="icon_id">
                <Icon icon={link.icon} width="24" />
            </div>
        </button>
    {/each}
</nav>

<style>
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }

    .app-bar {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        padding: 0 20px;
        height: 70px;
        width: 95%;
        max-width: 1200px;
        color: #daf4d2;
        font-family: "DM Sans", sans-serif;
        font-weight: 400;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba(218, 244, 210, 0.1);
        margin-top: 10px;
        border-radius: 100px;
        animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .app-bar_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .home-wrap {
        flex: 1;
        display: flex;
        justify-content: flex-start;
    }

    .home-button {
        background-color: transparent;
        color: var(--lime-light);
        border: none;
        cursor: pointer;
        padding: 0;
        transition: transform 0.2s ease;
    }
    .home-button:hover { transform: scale(1.05); }

    h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: -0.5px;
    }

    /* ─── Desktop Navigation ─── */
    .app-bar__nav {
        flex: 2;
        display: flex;
        position: relative;
        justify-content: center;
        gap: 0.5rem;
        padding: 4px;
        border-radius: 100px;
    }

    .sliding-pill {
        position: absolute;
        top: 4px;
        bottom: 4px;
        background: rgba(218, 244, 210, 0.1);
        border-radius: 100px;
        transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        pointer-events: none;
        z-index: 0;
    }

    .nav-btn {
        position: relative;
        z-index: 1;
        background-color: transparent;
        color: rgba(218, 244, 210, 0.7);
        padding: 8px 20px;
        font-size: 14px;
        border: none;
        border-radius: 100px;
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        cursor: pointer;
        transition: color 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .nav-btn:hover { color: #daf4d2; }
    .nav-btn.active { color: #daf4d2; font-weight: 600; }
    
    .mobile-only { display: none; }

    .mobile-dock { display: none; }

    /* ─── Contact/Resume Button ─── */
    .contact-wrap {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }

    .primary-button {
        background-color: rgba(7, 59, 66, 1);
        color: #daf4d2;
        padding: 10px 20px;
        font-size: 14px;
        border: 1px solid transparent;
        border-radius: 100px;
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .primary-button:hover {
        background-color: var(--lime-light, #daf4d2);
        color: var(--cyan-dark, #042125);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(218, 244, 210, 0.2);
    }

    /* ─── Mobile Overrides ─── */
    @media (max-width: 850px) {
        @keyframes slideDownMobile {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }

        .app-bar {
            width: 100%;
            height: 60px;
            margin-top: 0;
            border-radius: 0;
            left: 0;
            transform: none;
            box-sizing: border-box;
            padding: 0 16px;
            animation: slideDownMobile 0.5s ease-out forwards;
        }

        /* Convert to Bottom Navigation Dock */
        .app-bar__nav {
            position: fixed;
            bottom: 110px; /* Above FooterContact */
            left: 50%;
            transform: translateX(-50%);
            background: rgba(4, 33, 37, 0.9);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(218, 244, 210, 0.15);
            border-radius: 100px;
            padding: 8px;
            display: flex;
            gap: 4px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            width: auto;
            z-index: 1000;
            animation: slideUpDock 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideUpDock {
            from { transform: translate(-50%, 100px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }

        .desktop-nav { display: none !important; }
        .mobile-dock { 
            display: flex; 
            bottom: 30px; /* Adjusted since FooterContact is removed */
        }
        
        .button_text { display: none; }
        .icon_id { display: flex; }

        .nav-btn {
            padding: 12px;
            border-radius: 50%;
            background: transparent;
            transition: all 0.3s ease;
        }

        .nav-btn.active {
            background: rgba(218, 244, 210, 0.15);
            color: #daf4d2;
            transform: scale(1.1);
        }

        .primary-button {
            padding: 8px 16px;
            font-size: 13px;
        }
        
        h2 { font-size: 18px; }
    }
    
    @media (max-width: 400px) {
        .app-bar__nav { bottom: 100px; gap: 0px; }
        .nav-btn { padding: 10px; }
    }
</style>
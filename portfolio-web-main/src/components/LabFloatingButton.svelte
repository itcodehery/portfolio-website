<script lang="ts">
    import Icon from "@iconify/svelte";
    import { scale, fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    let isOpen = $state(false);

    function toggleMenu(e: MouseEvent) {
        e.stopPropagation();
        isOpen = !isOpen;
    }

    function closeMenu() {
        isOpen = false;
    }
    
    function preventClose(e: MouseEvent) {
        e.stopPropagation();
    }
</script>

<svelte:window onclick={closeMenu} />

<div class="lab-container">
    <button class="lab-floating-button" class:active={isOpen} onclick={toggleMenu} aria-label="Toggle Lab Menu">
        <Icon icon={isOpen ? "mdi:close" : "material-symbols:science"} width="24" />
    </button>

    {#if isOpen}
        <div 
            class="lab-menu" 
            onclick={preventClose}
            in:scale={{ duration: 250, start: 0.9, opacity: 0, easing: cubicOut }}
            out:fade={{ duration: 150 }}
        >
            <div class="menu-header">
                <h3>The Lab</h3>
                <span class="badge">Experiments</span>
            </div>
            
            <div class="menu-items">
                <button class="menu-item">
                    <div class="menu-icon"><Icon icon="material-symbols:music-note" width="20" /></div>
                    <div class="menu-content">
                        <h4>The Sound Lab</h4>
                        <p>Web Audio Synthesizer</p>
                    </div>
                    <span class="status-dot active"></span>
                </button>
                
                <button class="menu-item">
                    <div class="menu-icon"><Icon icon="material-symbols:deployed-code" width="20" /></div>
                    <div class="menu-content">
                        <h4>WebGL Physics</h4>
                        <p>Soft-body simulation</p>
                    </div>
                    <span class="status-dot active"></span>
                </button>
                
                <button class="menu-item disabled">
                    <div class="menu-icon"><Icon icon="material-symbols:animation" width="20" /></div>
                    <div class="menu-content">
                        <h4>Generative Art</h4>
                        <p>Procedural algorithms</p>
                    </div>
                    <span class="status-dot pending"></span>
                </button>
            </div>
        </div>
    {/if}
</div>

<style>
    .lab-container {
        position: fixed;
        bottom: 30px;
        left: 30px;
        z-index: 1000;
        transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .lab-floating-button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(4, 33, 37, 0.6);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: rgba(218, 244, 210, 0.7);
        border: 1px solid rgba(218, 244, 210, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    .lab-floating-button:hover, .lab-floating-button.active {
        transform: scale(1.1);
        background-color: rgba(7, 59, 66, 0.9);
        border-color: rgba(218, 244, 210, 0.4);
        color: #daf4d2;
        box-shadow: 0 8px 25px rgba(218, 244, 210, 0.15);
    }

    .lab-floating-button:not(.active):hover {
        transform: scale(1.1) rotate(5deg);
    }

    /* Context Menu Styles */
    .lab-menu {
        position: absolute;
        bottom: 70px;
        left: 0;
        width: 280px;
        background: rgba(5, 43, 48, 0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(218, 244, 210, 0.2);
        border-radius: 16px;
        padding: 8px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05);
        transform-origin: bottom left;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid rgba(218, 244, 210, 0.1);
        margin-bottom: 4px;
    }

    .menu-header h3 {
        margin: 0;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #daf4d2;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .badge {
        font-size: 10px;
        background: rgba(218, 244, 210, 0.1);
        padding: 2px 6px;
        border-radius: 100px;
        color: rgba(218, 244, 210, 0.7);
    }

    .menu-items {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 16px;
        background: transparent;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
        width: 100%;
    }

    .menu-item:hover:not(.disabled) {
        background: rgba(218, 244, 210, 0.08);
    }

    .menu-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        color: #daf4d2;
    }

    .menu-content {
        flex: 1;
    }

    .menu-content h4 {
        margin: 0 0 2px 0;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
    }

    .menu-content p {
        margin: 0;
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .status-dot.active {
        background: #88c07e;
        box-shadow: 0 0 8px rgba(136, 192, 126, 0.6);
    }

    .status-dot.pending {
        background: rgba(255, 255, 255, 0.2);
    }

    .menu-item.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    :global(body.modal-open) .lab-container {
        opacity: 0;
        pointer-events: none;
        transform: scale(0.8) translateY(20px);
    }

    @media (max-width: 850px) {
        .lab-container {
            bottom: 20px;
            left: 20px;
        }
        .lab-floating-button {
            width: 44px;
            height: 44px;
        }
    }
</style>

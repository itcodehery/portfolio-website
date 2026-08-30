<script lang="ts">
    import { isPerformanceMode } from "../lib/settings";
    import Icon from "@iconify/svelte";

    const contacts = [
        { icon: "mdi:github", label: "GitHub", url: "https://github.com/itcodehery" },
        { icon: "mdi:linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/hariprasad-bk/" },
        { icon: "mdi:email", label: "Email", url: "mailto:hariprasadbk@proton.me" }
    ];
</script>

<div class="finale-container" class:lite={$isPerformanceMode}>
    <div class="content">
        <div class="title-group">
            <h2 class="name">Hari Prasad</h2>
            <p class="subtitle">Building for the future.</p>
        </div>
        
        <div class="contact-links">
            {#each contacts as contact}
                <a href={contact.url} target="_blank" rel="noopener noreferrer" class="contact-btn">
                    <Icon icon={contact.icon} width="24" />
                    <span>{contact.label}</span>
                </a>
            {/each}
        </div>
    </div>
</div>

<style>
    .finale-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-family: "DM Sans", sans-serif;
        text-align: center;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
        background: rgba(4, 33, 37, 0.4);
        padding: 48px 64px;
        border-radius: 32px;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(218, 244, 210, 0.1);
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .title-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6.4px;
    }

    .name {
        font-size: 51.2px;
        font-weight: 700;
        margin: 0;
        letter-spacing: -1.6px;
        color: #daf4d2;
        text-shadow: 0 3.2px 16px rgba(218, 244, 210, 0.2);
    }

    .subtitle {
        font-size: 19.2px;
        font-weight: 400;
        margin: 0;
        color: rgba(218, 244, 210, 0.7);
        letter-spacing: 0.5px;
    }

    .contact-links {
        display: flex;
        gap: 16px;
        align-items: center;
        justify-content: center;
    }

    .contact-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 9.6px 19.2px;
        background: rgba(218, 244, 210, 0.05);
        border: 1px solid rgba(218, 244, 210, 0.2);
        border-radius: 40px;
        color: #daf4d2;
        text-decoration: none;
        font-size: 12.8px;
        font-weight: 500;
        transition: all 0.3s ease;
    }

    .contact-btn:hover {
        background: rgba(218, 244, 210, 0.2);
        transform: translateY(-2.4px);
        box-shadow: 0 8px 16px rgba(218, 244, 210, 0.1);
    }

    /* Firefox fallback because backdrop-filter combined with 3D contexts fails to render */
    @supports (-moz-appearance: none) {
        .content {
            background: rgba(4, 33, 37, 0.95);
            backdrop-filter: none;
        }
    }

    @media (max-width: 614.4px) {
        .content {
            padding: 32px 24px;
            border-radius: 24px;
        }

        .name {
            font-size: 33.6px;
        }

        .subtitle {
            font-size: 14.4px;
        }

        .contact-links {
            flex-direction: column;
            width: 100%;
        }

        .contact-btn {
            width: 100%;
            justify-content: center;
        }
    }

    /* LITE MODE FOOTER */
    .finale-container.lite {
        padding: 64px 32px 32px 32px;
        background: #021417; /* slightly darker than standard bg */
        width: 100vw;
        box-sizing: border-box;
        margin-left: calc(-50vw + 50%); /* ensure it spans full width even if parent has padding */
    }
    
    .finale-container.lite .content {
        background: transparent;
        border: none;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        padding: 0;
        width: 100%;
        max-width: 960px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    
    .finale-container.lite .title-group {
        align-items: flex-start;
        text-align: left;
    }
    
    @media (max-width: 768px) {
        .finale-container.lite .content {
            flex-direction: column;
            text-align: center;
            gap: 32px;
        }
        .finale-container.lite .title-group {
            align-items: center;
            text-align: center;
        }
    }
</style>

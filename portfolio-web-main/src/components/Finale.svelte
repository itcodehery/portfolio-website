<script lang="ts">
    import Icon from "@iconify/svelte";

    const contacts = [
        { icon: "mdi:github", label: "GitHub", url: "https://github.com/itcodehery" },
        { icon: "mdi:linkedin", label: "LinkedIn", url: "https://linkedin.com/in/hariprasad" },
        { icon: "mdi:email", label: "Email", url: "mailto:hello@hariprasad.com" }
    ];
</script>

<div class="finale-container">
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
        gap: 40px;
        background: rgba(4, 33, 37, 0.4);
        padding: 60px 80px;
        border-radius: 40px;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(218, 244, 210, 0.1);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .title-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .name {
        font-size: 64px;
        font-weight: 700;
        margin: 0;
        letter-spacing: -2px;
        color: #daf4d2;
        text-shadow: 0 4px 20px rgba(218, 244, 210, 0.2);
    }

    .subtitle {
        font-size: 24px;
        font-weight: 400;
        margin: 0;
        color: rgba(218, 244, 210, 0.7);
        letter-spacing: 0.5px;
    }

    .contact-links {
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: center;
    }

    .contact-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 24px;
        background: rgba(218, 244, 210, 0.05);
        border: 1px solid rgba(218, 244, 210, 0.2);
        border-radius: 50px;
        color: #daf4d2;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.3s ease;
    }

    .contact-btn:hover {
        background: rgba(218, 244, 210, 0.2);
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(218, 244, 210, 0.1);
    }

    /* Firefox fallback because backdrop-filter combined with 3D contexts fails to render */
    @supports (-moz-appearance: none) {
        .content {
            background: rgba(4, 33, 37, 0.95);
            backdrop-filter: none;
        }
    }

    @media (max-width: 768px) {
        .content {
            padding: 40px 30px;
            border-radius: 30px;
        }

        .name {
            font-size: 42px;
        }

        .subtitle {
            font-size: 18px;
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
</style>

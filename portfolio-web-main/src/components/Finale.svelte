<script>
</script>

<section>
    <div class="finale">
        <div class="cta-content">
            <h2>Hari Prasad</h2>
            <p class="tagline">Designing for the Future.</p>
        </div>
    </div>
</section>

<style>
    section {
        background-color: var(--lime-light);
        color: var(--cyan-dark);
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    /* Animated gradient border at the top */
    section::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, transparent, #daf4d2, #073b42, #daf4d2, transparent);
        background-size: 200% 100%;
        animation: gradientBorder 3s linear infinite;
    }

    @keyframes gradientBorder {
        0% {
            background-position: 0% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }

    .finale {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
        font-family: "DM Sans", sans-serif;
        padding: 20px;
        min-height: 120px;
        border-top: var(--cyan-dark) 10px;
    }

    .cta-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 4px;
    }

    h2 {
        font-size: 36px;
        margin: 0;
        font-weight: 600;
        letter-spacing: -1px;
    }

    .tagline {
        font-size: 16px;
        margin: 0;
        opacity: 0.7;
        font-weight: 400;
        letter-spacing: 0.5px;
    }

    @media (max-width: 768px) {
        .finale {
            display: flex;
            min-height: 60px;
        }

        h2 {
            font-size: 24px;
        }

        .tagline {
            font-size: 14px;
        }
    }
</style>

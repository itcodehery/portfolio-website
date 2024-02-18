<script>
</script>

<section>
    <div class="finale">
        <h2>Hari Prasad</h2>
        <p>Designing for the Future.</p>
    </div>
</section>

<style>
    .finale {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        font-family: "Circular Standard", sans-serif;
        padding: 20px;
        height: 98%;
    }

    @media (max-width: 768px) {
        .finale {
            display: flex;
            height: 60px;
        }

        h2 {
            display: none;
        }

        p {
            display: none;
        }
    }

    section {
        background-color: var(--lime-light);
        color: var(--cyan-dark);
        height: 100%;
    }
</style>

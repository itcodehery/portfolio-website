<script>
    import Icon from "@iconify/svelte";

    let { message } = $props();
</script>

<div class="alert" id="alert">
    <Icon icon="akar-icons:info" width="24" />
    <p>{message}</p>
</div>

<style>
    .alert {
        padding: 8px;
        align-self: center;
        align-items: center;
        align-content: center;
        justify-self: center;
        justify-items: center;
        justify-content: center;
        text-align: center;
        display: flex;
        flex-direction: row;
        background-color: rgba(7, 59, 66, 1);
        border: 1px solid #dddddd2e;
        border-radius: 3.2px;
        margin-top: 1.6rem;
        margin-bottom: 0.8rem;
        width: 40%;
        transition: ease-in-out 300ms;
    }

    .alert p {
        margin-left: 8px;
    }

    /* Add more styles for other types (e.g., success, warning, error) */
</style>

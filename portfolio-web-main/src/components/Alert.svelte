<script>
    import Icon from "@iconify/svelte";

    /**
     * @type {any}
     */
    export let message;
</script>

<div class="alert" id="alert">
    <Icon icon="akar-icons:info" width="24" />
    <p>{message}</p>
</div>

<style>
    .alert {
        padding: 10px;
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
        border-radius: 4px;
        margin-top: 2rem;
        margin-bottom: 1rem;
        width: 40%;
        transition: ease-in-out 300ms;
    }

    .alert p {
        margin-left: 10px;
    }

    /* Add more styles for other types (e.g., success, warning, error) */
</style>

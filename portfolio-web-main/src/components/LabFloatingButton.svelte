<script lang="ts">
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";
</script>

<button class="lab-floating-button" onclick={() => goto("/lab")} aria-label="Go to Lab">
    <Icon icon="material-symbols:science" width="24" />
</button>

<style>
    .lab-floating-button {
        position: fixed;
        bottom: 30px;
        left: 30px;
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
        z-index: 1000;
        transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    .lab-floating-button:hover {
        transform: scale(1.1) rotate(5deg);
        background-color: rgba(7, 59, 66, 0.9);
        border-color: rgba(218, 244, 210, 0.4);
        color: #daf4d2;
        box-shadow: 0 8px 25px rgba(218, 244, 210, 0.15);
    }

    @media (max-width: 850px) {
        .lab-floating-button {
            bottom: 20px;
            left: 20px;
            width: 44px;
            height: 44px;
        }
    }
</style>

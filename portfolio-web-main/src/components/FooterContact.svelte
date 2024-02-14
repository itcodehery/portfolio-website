<script lang="ts">
    import Icon from "@iconify/svelte";

    function openMail() {
        window.open("mailto:haririo321@gmail.com");
    }

    function copyToClipboard() {
        navigator.clipboard.writeText("+91 9008015121");
        alert("Phone number copied to clipboard!");
    }
</script>

<footer>
    <div class="footwrap">
        <button class="pill-wrap" on:click={() => openMail}>
            <div class="icon-section">
                <div class="circl-outer-wrap">
                    <div class="circl-inner-wrap">
                        <Icon
                            icon="material-symbols:mail"
                            style="color: #DAF4D2;"
                        />
                    </div>
                </div>
            </div>
            <div class="text-wrap">
                <p style="font-size: 12px;">Email</p>
                <p>haririo321@gmail.com</p>
            </div>
        </button>

        <button class="pill-wrap" on:click={() => copyToClipboard}>
            <div class="icon-section">
                <div class="circl-outer-wrap">
                    <div class="circl-inner-wrap">
                        <Icon
                            icon="material-symbols:call"
                            style="color: #DAF4D2;"
                        />
                    </div>
                </div>
            </div>
            <div class="text-wrap">
                <p style="font-size: 12px;">Call Me</p>
                <p>+91 9008015121</p>
            </div>
        </button>
    </div>
</footer>

<style>
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 80px;
        color: #daf4d2;
        font-family: "Circular Standard", sans-serif;
    }
    .footwrap {
        border: none;
        border-radius: 40px;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    .pill-wrap {
        border: none;
        border-radius: 100px;
        background-color: #072f34;
        font-family: "Circular Standard", sans-serif;
        color: #daf4d2;
        text-align: left;
        width: 100%;
        height: 70px;
        padding: 1px 20px;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        gap: 10px;
        cursor: pointer;
        transition: ease-in 300ms;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .pill-wrap:hover {
        background-color: #052428;
        scale: 0.9;
    }

    .pill-wrap:focus {
        background-color: #052428;
        scale: 0.9;
    }

    .icon-section {
        display: flex;
        align-items: center;
        align-self: center;
        align-content: center;
        justify-content: center;
        justify-self: center;
        justify-items: center;
    }

    .circl-outer-wrap {
        border: none;
        border-radius: 100px;
        height: 38px;
        width: 38px;
        background-color: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .circl-inner-wrap {
        border: none;
        border-radius: 100px;
        display: flex;
        height: 28px;
        width: 28px;
        background-color: rgba(255, 255, 255, 0.1);
        align-items: center;
        align-self: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .text-wrap {
        margin: 0px;
        padding: 0px;
        align-content: center;
        align-items: center;
        align-self: center;
        justify-items: center;
        justify-content: center;
    }

    p {
        margin: 0px;
        padding: 0px;
    }
</style>

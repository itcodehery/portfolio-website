<script lang="ts">
    import Icon from "@iconify/svelte";
</script>

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
        color: #DAF4D2;
        font-family: 'Circular Standard', sans-serif;
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
    }

    .pill-wrap {
        border: none;
        border-radius: 100px;
        background-color: #052428;
        width: 100%;
        height: 70px;
        padding: 1px 20px;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        gap: 10px;
    }

    .pill-wrap:hover {
        background-color: #052226;
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

    a {
        /* remove formatting */
        color:#DAF4D2;
    }
</style>

<footer>
    <div class="footwrap">
        

        <div class="pill-wrap">
            <div class="icon-section">
                <div class="circl-outer-wrap">
                    <div class="circl-inner-wrap">
                        <Icon icon="material-symbols:mail" style="color: #DAF4D2;"/>
                    </div>
                </div>
            </div>
            <div class="text-wrap">
                <p style="font-size: 12px;">Email</p>
                <p>haririo321@gmail.com</p>
            </div>
        </div>

        <div class="pill-wrap">
            <div class="icon-section">
                <div class="circl-outer-wrap">
                    <div class="circl-inner-wrap">
                        <Icon icon="material-symbols:call" style="color: #DAF4D2;"/>
                    </div>
                </div>
            </div>
            <div class="text-wrap">
                <p style="font-size: 12px;">Call Me</p>
                <p>+91 9008015121</p>
            </div>
        </div>

        <!-- <div class="pill-wrap">
            <div style="icon-section">
                <div class="circl-outer-wrap">
                    <div class="circl-inner-wrap">
                        <Icon icon="material-symbols:call" style="color: #DAF4D2;"/>
                    </div>
                </div>
            </div>
            <div class="text-wrap">
                <p style="font-size: 12px;">Call Me</p>
                <p>+91 90080 15121</p>
            </div>
        </div> -->
    </div>
</footer>
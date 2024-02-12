<script>
    import MeCard from "./MeCard.svelte";
</script>

<style>
    section {
        background-color: #DAF4D2;
        background-repeat: no-repeat;
        font-family: 'Circular Standard', sans-serif;
        color: rgba(4, 33, 37, 1);
        display: flex;
        flex-direction: row;
        height: 870px;
        align-items: center;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        align-self: center;
        align-content: center;
    }

    .rightwrapper {
        margin-top: 100px;
        align-items: center;
        align-content: center;
        align-self: center;
        text-align: center;
    }
    
    .leftwrapper {
        align-items: center;
        align-content: center;
        align-self: center;
        text-align: left;
        justify-content: center;
        justify-items: center;
        padding: 20px 120px;
    }

    .text-container {
        align-items: center;
        text-align: left;
        align-self: center;
        line-height: 56px;
    }

    h1 {
        font-size: 72px;
        font-weight: lighter;
        letter-spacing: -5px;
        margin: 0px;
        padding-bottom: 10px;
    }

    h4 {
        margin: 0px;
        font-size: 24px;
        padding-bottom: 10px;
        font-weight: lighter;
        letter-spacing: -2px;
    }

    .global-wrapper {
        display: flex;
        flex-direction: row;
    }
</style>

<section>
    <div class="global-wrapper">
        <div class="leftwrapper">
            <MeCard/>
        </div>
        <div class="rightwrapper">
            <div class="text-container">
                <h4>I am a</h4>
                <h1>Frontend</h1>
                <h1>Developer and</h1>
                <h1>Designer</h1>
            </div>
        </div>
    </div>
</section>
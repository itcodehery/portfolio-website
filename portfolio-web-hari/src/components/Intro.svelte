<script>
    import Tag from "./Tag.svelte";
</script>

<style>
    @import "../global-import.css";
    
    section {
        background-image: url("/home-bg.png");
        background-position: center;
        background-repeat: no-repeat;
        color: #DAF4D2;
        height: 800px;
    }

    .text-container {
        align-items: center;
        text-align: center;
        align-self: center;
    }

    h1 {
        font-size: 64px;
    }
</style>

<section>
    <div class="text-container">
        <h4>Hello!</h4>
        <h1>I'm Hari Prasad</h1>
    </div>
    <div class="tags-container">
        <Tag name="Designer"/>
        <Tag name="Coder"/>
        <Tag name="Musician"/>
    </div>
</section>
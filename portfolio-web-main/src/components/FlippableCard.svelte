<script>
    import { flip } from 'svelte/animate';

    let flipped = false;

    function toggleFlip() {
        flipped = !flipped;
    }
</script>

<div class="flip-card" on:click={toggleFlip}>
    <div class="flip-card-inner" class:flipped={flipped}>
        <div class="flip-card-front">
            <!-- Content from MeCard.svelte -->
            <div class="card-wrapper">
                <div class="profile-image"></div>
                <div class="text-wrap">
                    <h3>Hari Prasad</h3>
                    <p>Developer, Designer, Musician</p>
                    <br>
                    <p>Did I ever tell you the definition of insanity?</p>
                    <p>>>> Flip for more.</p>
                </div>
            </div>
        </div>
        <div class="flip-card-back">
            <!-- Back content -->
            <div class="card-wrapper back-content">
                <h3>About Me</h3>
                <p>I'm a passionate full-stack developer with a love for creating intuitive and beautiful user experiences. When I'm not coding, you can find me playing music or exploring new design concepts.</p>
                <p>My skills include:</p>
                <ul>
                    <li>Mobile App Development</li>
                    <li>UI/UX Design</li>
                    <li>Database Management</li>
                    <li>Web Development (Full Stack)</li>
                    <li>Systems Programming</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<style>
    .flip-card {
        background-color: transparent;
        width: 300px; /* Adjust as needed */
        height: 400px; /* Adjust as needed */
        perspective: 1000px; /* 3D effect */
        cursor: pointer;
        transform: rotateZ(-2deg);
    }

    .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .flip-card-inner.flipped {
        transform: rotateY(180deg);
    }

    .flip-card-front, .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }

    .flip-card-front {
        background-color: white;
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .flip-card-back {
        background-color: white;
        color: black;
        transform: rotateY(180deg);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        text-align: center;
    }

        .card-wrapper {
            background-color: white;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            border: none;
            border-radius: 10px;
            align-items: flex-start;
            justify-content: flex-start;
            padding-top: 10px; /* Add some top padding */
        }

    

        .flip-card-front .card-wrapper {
            align-items: flex-start;
            justify-content: flex-start;
        }

    

        .flip-card-back .card-wrapper {
            align-items: center;
            justify-content: center;
        }

    

        .profile-image {
            background-image: url("/me.jpg");
            background-position: center;
            background-size: cover;
            height: 260px;
            width: 260px;
            margin: 10px;
            border: none;
            border-radius: 10px;
            align-self: center; /* Center the image within the flex-start aligned card-wrapper */
        }

    

        h3 {
            font-family: "DM Sans", sans-serif;
            font-size: large;
            color: black;
            font-weight: 500;
            letter-spacing: -1px;
            text-align: left;
            margin: 0px;
        }

    

        p {
            font-family: "DM Sans", sans-serif;
           font-size: small;
            color: rgba(0, 0, 0, 0.5);
            text-align: left;
            letter-spacing: -0.2px;
            margin: 0px;
            padding: 0px;
        }

    

        .text-wrap {
            gap: 4px;
            margin-left: 6px;
            margin-bottom: 6px;
            width: 100%;
            padding-left: 12px;
            box-sizing: border-box;
            text-align: left; /* Ensure text is left-aligned within text-wrap */

        }

    

        .back-content h3 {

            margin-bottom: 10px;

            text-align: center; /* Ensure back content h3 is centered */

        }

    

        .back-content p {

            margin-bottom: 10px;

            text-align: center; /* Ensure back content p is centered */

        }

    

        .back-content ul {

            list-style: none;

            padding: 0;

            text-align: left;

        }

    

        .back-content li {

            margin-bottom: 5px;

            color: rgba(0, 0, 0, 0.7);

        }
</style>

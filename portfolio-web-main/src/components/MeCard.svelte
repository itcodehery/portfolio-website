<div class="card-wrapper">
    <div class="profile-image" />
    <div class="text-wrap">
        <h3>Hari Prasad</h3>
        <p>Designer, Coder, Musician, Student</p>
    </div>
</div>

<style>
    /* make it so that the card goes under the header when scrolling */
    .card-wrapper {
        background-color: white;
        height: 100%;
        width: 100%;
        display: flex;
        position: sticky;
        top: 0;
        z-index: 1;
        flex-direction: column;
        border: none;
        border-radius: 10px;
        align-items: center;
        align-self: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        rotate: 4deg;
        transition: ease-in 300ms;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .card-wrapper:hover {
        rotate: -4deg;
    }

    .profile-image {
        background-image: url("/me.jpg");
        background-position: center;
        background-size: contain;
        height: 260px;
        width: 260px;
        margin: 10px;
        border: none;
        border-radius: 10px;
    }

    h3 {
        font-family: "Circular Standard", sans-serif;
        font-size: large;
        color: black;
        font-weight: lighter;
        letter-spacing: -1px;
        text-align: left;
        margin: 0px;
    }

    p {
        font-family: "Circular Standard", sans-serif;
        font-size: small;
        color: rgba(0, 0, 0, 0.5);
        text-align: left;
        letter-spacing: -0.8px;
        margin: 0px;
        padding: 0px;
    }

    .text-wrap {
        gap: 4px;
        margin-left: 12px;
        margin-bottom: 12px;
        align-items: baseline;
        align-self: baseline;
    }
</style>

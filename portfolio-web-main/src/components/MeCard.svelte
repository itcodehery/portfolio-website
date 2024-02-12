<style>
    .card-wrapper {
        background-color: white;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        border: none;
        border-radius: 10px; 
        align-items: center;
        align-self: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        rotate: 4deg;
    }

    .profile-image {
        background-image: url('/me.jpg');
        background-position: center;
        background-size: contain;
        height: 260px;
        width: 260px;
        margin: 10px;
        border:none;
        border-radius: 10px;
    }

    h3 {
        font-family: 'Circular Standard', sans-serif;
        font-size: large;
        color: black;
        font-weight: lighter;
        letter-spacing: -1px;
        text-align: left;
        margin: 0px;
    }

    p {
        font-family: 'Circular Standard', sans-serif;
        font-size: small;
        color: rgba(0,0,0,0.5);
        text-align: left;
        margin: 0px;
        padding: 0px;
    }

    .text-wrap {
        gap:4px;
        margin-left: 12px;
        margin-bottom: 12px;
        align-items: baseline;
        align-self: baseline;
    }
</style>

<div class="card-wrapper">
    <div class="profile-image"/>
    <div class="text-wrap">
        <h3>Hari Prasad</h3>
        <p>Designer, Coder, Musician, Student</p>
    </div>
</div>
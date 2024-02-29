<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let isDetailsVisible = false;

  let images = [
    {
      url: "/carousel/blogger.png",
      alt: "blogger",
      name: "Blogger Redesign",
      details:
        "A redesign of the Blogger website. The goal was to make the website more modern and user-friendly.",
    },
    {
      url: "/carousel/deepstash.png",
      alt: "deepstash",
      name: "Deepstash Redesign",
      details:
        "A redesign of the Deepstash app. The goal was to make the app more eye-catching and simple.",
    },
    {
      url: "/carousel/roadmap.png",
      alt: "roadmap",
      name: "Roadmap App Design",
      details:
        "A design of a roadmap app. The goal was to make the app more user-friendly and easy to use.",
    },
    // {
    //   url: "/carousel/twitch.png",
    //   alt: "twitch",
    //   name: "Twitch Redesign",
    //   details:
    //     "A redesign of the Twitch website. The goal was to redesign on an inspiration more than practicality.",
    // },
    {
      url: "/carousel/whatsapp.png",
      alt: "whatsapp",
      name: "Whatsapp Redesign",
      details:
        "A redesign of the Whatsapp app. The goal was to simplify the app so it's easy to use.",
    },
    {
      url: "/carousel/youtube.png",
      alt: "youtube",
      name: "YouTube Redesign",
      details:
        "A redesign of the YouTube website. The goal was to make the website more modern and user-friendly.",
    },
  ];

  let currentIndex = 0;

  const nextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
  };

  const prevImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  };

  onMount(() => {
    const interval = setInterval(nextImage, 4000); // Automatically move to the next image every 3 seconds
    return () => clearInterval(interval);
  });
</script>

<section>
  <div class="carouselwrap">
    <div class="carouselinnerwrap">
      <button on:click={prevImage}>
        <Icon
          icon="material-symbols:chevron-left"
          style="color: #DAF4D2; scale: 2;"
        />
      </button>
      <div class="carousel">
        <!-- align the currentIndex image to the center always -->
        {#each images as image, index (image)}
          <img
            src={image.url}
            alt={image.alt}
            style={index === currentIndex ? "transform: scale(1.1);" : ""}
          />
          {#if isDetailsVisible}
            <div class="details">{image.details}</div>
          {/if}
        {/each}
      </div>

      <button on:click={nextImage}>
        <Icon
          icon="material-symbols:chevron-right"
          style="color: #DAF4D2; scale: 2;"
        />
      </button>
    </div>
    <div class="image-details">
      <Icon icon="material-symbols:info-outline" width="20px" />
      <p>
        {images[currentIndex].details}
      </p>
    </div>
  </div>
</section>

<style>
  @media (max-width: 768px) {
    section {
      display: none;
    }
  }
  .carouselwrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-items: center;
    justify-self: center;
    align-self: center;
    align-content: center;
    margin: 10px;
    height: 400px;
    width: 100%;
    scale: 0.95;
  }

  .carouselinnerwrap {
    display: flex;
    flex-direction: row;
  }

  .carousel {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 260px;
    overflow: hidden;
  }

  .carousel img {
    max-width: 97%;
    max-height: 97%;
    transition: transform 0.5s ease;
    margin: 20px;
    padding: 0;
    border: none;
    border-radius: 10px;
  }

  button {
    min-height: 40px;
    min-width: 40px;
    font-family: "Circular Standard", sans-serif;
    background-color: var(--cyan-dark);
    color: var(--lime-light);
    padding: 2px 25px;
    border: none;
    margin: 10px;
    gap: 14px;
    align-items: center;
    align-self: center;
    text-align: center;
    border-radius: 40px;
    display: flex;
    flex-direction: row;
    transition: ease-in 300ms;
    cursor: pointer;
  }

  /* modify the below style so that the carousel works properly */

  .details {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    font-size: 20px;
    text-align: center;
    transition: 0.5s ease;
    transform: translateY(100%);
  }

  .image-details {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    justify-self: center;
    align-self: center;
    align-content: center;
    gap: 10px;
    background-color: var(--cyan-dark);
    border: none;
    border-radius: 40px;
    margin: 20px;
    height: 40px;
    width: fit-content;
    padding: 4px 20px;
    overflow: hidden;
    white-space: no-wrap;
    transition: ease-in 300ms;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .image-details:hover {
    scale: 0.95;
  }
</style>

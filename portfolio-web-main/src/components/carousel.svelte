<script lang="ts">
  import Icon from "@iconify/svelte";

  // Hardcoded images data
  let images = [
    {
      url: "/carousel/blogger.png",
      alt: "blogger",
      name: "Blogger Redesign",
      details: "A redesign of the Blogger website, following Google's Material Design 3 Language.",
    },
    {
      url: "/carousel/deepstash.png",
      alt: "deepstash",
      name: "Deepstash Redesign",
      details: "A redesign of the Deepstash app to be more eye-catching and simple.",
    },
    {
      url: "/carousel/roadmap.png",
      alt: "roadmap",
      name: "Roadmap App Design",
      details: "A design of a roadmap app, with easy to access features and a modern look.",
    },
    {
      url: "/carousel/whatsapp.png",
      alt: "whatsapp",
      name: "Whatsapp Redesign",
      details: "A redesign of the Whatsapp app, with a more modern look and a better user experience.",
    },
    {
      url: "/carousel/youtube.png",
      alt: "youtube",
      name: "YouTube Redesign",
      details: "A redesign of the YouTube website, inspired by Apple's Cupertino Design System.",
    },
  ];

  let currentIndex = $state(0);
  let isHovering = $state(false);
  let interval: any;

  const goToIndex = (index: number) => {
    currentIndex = index;
  };

  const nextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
  };

  const prevImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  };

  // Lifecycle management for the interval
  $effect(() => {
    if (isHovering) {
      clearInterval(interval);
    } else {
      interval = setInterval(nextImage, 4000);
    }
    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  });
</script>

<div 
  class="carousel-container"
  onmouseenter={() => isHovering = true}
  onmouseleave={() => isHovering = false}
>
  <div class="carousel-main-wrapper">
    <button onclick={prevImage} aria-label="Previous Project" class="nav-button left">
      <Icon icon="material-symbols:chevron-left" style="color: #DAF4D2; scale: 2;" />
    </button>

    <div class="carousel">
      <div class="image-wrapper">
        {#each images as image, index}
          <div
            class="carousel-item"
            style:transform={`
              translateX(${(index - currentIndex) * 100}%) 
              translateX(${(index - currentIndex) * 20}%) 
              scale(${index === currentIndex ? 1 : 0.7})
              rotateY(${(index - currentIndex) * -45}deg)
            `}
            style:opacity={index === currentIndex ? 1 : 0.3}
            style:z-index={images.length - Math.abs(index - currentIndex)}
            onclick={() => goToIndex(index)}
            onkeydown={(e) => e.key === 'Enter' && goToIndex(index)}
            role="button"
            tabindex="0"
            aria-label={`View project ${image.name}`}
          >
            <img src={image.url} alt={image.alt} />
          </div>
        {/each}
      </div>
    </div>

    <button onclick={nextImage} aria-label="Next Project" class="nav-button right">
      <Icon icon="material-symbols:chevron-right" style="color: #DAF4D2; scale: 2;" />
    </button>
  </div>

  <div class="details-container">
    <Icon icon="material-symbols:info-outline" width="20px" />
    <p>{images[currentIndex].details}</p>
  </div>

  <div class="dots-container">
    {#each images as _, index}
      <button
        class="dot"
        class:active={index === currentIndex}
        onclick={() => goToIndex(index)}
        aria-label={`Go to project ${index + 1}`}
      ></button>
    {/each}
  </div>
</div>

<style>
  .carousel-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    width: 100%;
    padding: 2rem 0;
  }

  .carousel-main-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
  }

  .carousel {
    position: relative;
    width: 100%;
    height: 300px;
    perspective: 1000px;
    overflow: visible; /* Changed to visible for shadows */
  }

  .image-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .carousel-item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 50%;
    max-width: 400px;
    height: auto;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    border: 1px solid rgba(218, 244, 210, 0.1);
    background: radial-gradient(circle at bottom center, rgba(7, 59, 66, 1), rgba(4, 33, 37, 1));
  }

  .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 20px;
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }
  
  .carousel-item:hover img {
    opacity: 1;
  }

  .details-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: rgba(7, 59, 66, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(218, 244, 210, 0.1);
    border-radius: 100px;
    margin-top: 1rem;
    height: 48px;
    width: auto;
    max-width: 90%;
    padding: 0 24px;
    text-align: center;
    color: var(--lime-light);
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }

  .details-container p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "DM Sans", sans-serif;
    font-size: 0.95rem;
    letter-spacing: 0.3px;
    margin: 0;
  }

  .dots-container {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background-color: rgba(218, 244, 210, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .dot:hover {
    background-color: rgba(218, 244, 210, 0.5);
    transform: scale(1.2);
  }

  .dot.active {
    background-color: var(--lime-light);
    transform: scale(1.4);
    box-shadow: 0 0 10px rgba(218, 244, 210, 0.4);
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(7, 59, 66, 0.4);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(218, 244, 210, 0.1);
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
  }

  .nav-button:hover {
    background: rgba(7, 59, 66, 0.8);
    border-color: rgba(218, 244, 210, 0.3);
    transform: translateY(-50%) scale(1.1);
  }

  .nav-button.left {
    left: 10%;
  }

  .nav-button.right {
    right: 10%;
  }

  @media (max-width: 768px) {
    .carousel-container {
      padding: 1rem 0;
    }
    .carousel-item {
      width: 80%;
      max-width: none;
    }
    p {
      font-size: 0.9rem;
    }
    .nav-button.left {
      left: 2%;
    }

    .nav-button.right {
      right: 2%;
    }
  }
</style>
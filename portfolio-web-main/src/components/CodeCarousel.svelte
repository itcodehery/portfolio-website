<script lang="ts">
  import Icon from "@iconify/svelte";

  let { projects }: { projects: any[] } = $props();

  let currentIndex = $state(0);

  const goToIndex = (index: number) => {
    currentIndex = index;
  };

  const nextProject = () => {
    currentIndex = (currentIndex + 1) % projects.length;
  };

  const prevProject = () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  };

  function openLink(url: string) {
    window.open(url, "_blank");
  }
</script>

<div class="carousel-container">
  <div class="carousel-main-wrapper">
    <button onclick={prevProject} aria-label="Previous Project" class="nav-button left">
      <Icon icon="material-symbols:chevron-left" style="color: #DAF4D2; scale: 2;" />
    </button>

    <div class="carousel">
      <div class="project-card-wrapper">
        {#each projects as project, index}
          <div
            class="carousel-item"
            style:transform={`
              translateX(${(index - currentIndex) * 100}%) 
              translateX(${(index - currentIndex) * 20}%) 
              scale(${index === currentIndex ? 1 : 0.7})
              rotateY(${(index - currentIndex) * -45}deg)
            `}
            style:opacity={index === currentIndex ? 1 : 0.3}
            style:z-index={projects.length - Math.abs(index - currentIndex)}
            onclick={() => goToIndex(index)}
            role="button"
            tabindex="0"
            aria-label={`View project ${project.name}`}
          >
            <!-- Image Background -->
            <img src={project.image} alt={project.name} class="carousel-bg" />
            
            <!-- Content Overlay -->
            <div class="project-card-content" onclick={() => openLink(project.url)}>
              <div class="glass-overlay">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <button onclick={nextProject} aria-label="Next Project" class="nav-button right">
      <Icon icon="material-symbols:chevron-right" style="color: #DAF4D2; scale: 2;" />
    </button>
  </div>

  <div class="details-container">
    <Icon icon="material-symbols:info-outline" width="16px" />
    <p>{projects[currentIndex].description}</p>
  </div>

  <div class="dots-container">
    {#each projects as _, index}
      <button
        class="dot"
        class:active={index === currentIndex}
        onclick={() => goToIndex(index)}
        aria-label={`Go to project ${index + 1}`}
      />
    {/each}
  </div>
</div>

<style>
  .carousel-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
    width: 100%;
    padding: 1.6rem 0;
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
    height: 240px;
    perspective: 800px;
    overflow: visible;
  }

  .project-card-wrapper {
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
    max-width: 320px;
    height: auto;
    min-height: 176px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 12px 28px rgba(0,0,0,0.3);
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Hover effect for the card */
  .carousel-item:hover {
    border-color: rgba(218, 244, 210, 0.3);
    box-shadow: 0 16px 32px rgba(0,0,0,0.4);
  }

  .carousel-item .carousel-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    transition: transform 0.6s ease;
  }

  .carousel-item:hover .carousel-bg {
    transform: scale(1.05); /* Zoom effect on hover */
  }

  .project-card-content {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--lime-light);
    background: rgba(4, 33, 37, 0.7); /* Dark semi-transparent overlay */
    transition: background 0.3s ease;
    padding: 0;
  }
  
  .carousel-item:hover .project-card-content {
      background: rgba(4, 33, 37, 0.5); /* Lighten overlay on hover */
  }

  .glass-overlay {
      padding: 1.2rem;
      backdrop-filter: blur(1.6px);
  }

  h3 {
    font-size: 1.28rem;
    font-weight: 600;
    margin: 0 0 0.64rem 0;
    font-family: "DM Sans", sans-serif;
    letter-spacing: -0.5px;
    background: linear-gradient(to right, #DAF4D2, #88c07e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 0.76rem;
    font-weight: 400;
    line-height: 1.6;
    color: rgba(218, 244, 210, 0.8);
    font-family: "DM Sans", sans-serif;
    margin: 0;
  }

  .details-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9.6px;
    background: rgba(7, 59, 66, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(218, 244, 210, 0.1);
    border-radius: 80px;
    margin-top: 0.8rem;
    height: 38.4px;
    width: auto;
    max-width: 90%;
    padding: 0 19.2px;
    text-align: center;
    color: var(--lime-light);
    box-shadow: 0 3.2px 16px rgba(0,0,0,0.2);
  }

  .details-container p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.76rem;
    letter-spacing: 0.3px;
    color: var(--lime-light);
  }

  .dots-container {
    display: flex;
    justify-content: center;
    gap: 0.6rem;
    margin-top: 0.4rem;
  }

  .dot {
    width: 6.4px;
    height: 6.4px;
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
    box-shadow: 0 0 8px rgba(218, 244, 210, 0.4);
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(7, 59, 66, 0.4);
    backdrop-filter: blur(3.2px);
    border: 1px solid rgba(218, 244, 210, 0.1);
    border-radius: 50%;
    width: 38.4px;
    height: 38.4px;
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

  @media (max-width: 614.4px) {
    .carousel-container {
      padding: 0.8rem 0;
    }
    .carousel-item {
      width: 80%;
      max-width: none;
    }
    h3 {
      font-size: 1.12rem;
    }
    p {
      font-size: 0.72rem;
    }
    .nav-button.left {
      left: 2%;
    }

    .nav-button.right {
      right: 2%;
    }
  }
</style>

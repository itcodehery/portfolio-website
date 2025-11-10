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
            <div class="project-card-content" onclick={() => openLink(project.url)}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
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
    <Icon icon="material-symbols:info-outline" width="20px" />
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
    gap: 1.5rem;
    width: 100%;
    padding: 2rem 0;
  }

  .carousel-main-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative; /* For absolute positioning of buttons */
  }

  .carousel {
    position: relative;
    width: 100%;
    height: 300px; /* Adjust height for text content */
    perspective: 1000px;
    overflow: hidden;
  }

  .project-card-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
  }

  .carousel-item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 50%;
    max-width: 400px; /* Adjust max-width for text content */
    height: auto;
    min-height: 200px; /* Ensure enough height for content */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    transition: all 0.6s cubic-bezier(0.77, 0, 0.175, 1);
    cursor: pointer;
    background-color: rgba(7, 59, 66, 0.8); /* Card background */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .project-card-content {
    padding: 1.5rem;
    text-align: center;
    color: var(--lime-light);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0 0 0.5rem 0;
  }

  p {
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.5;
    color: #daf4d2a0;
  }

  .details-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: var(--cyan-dark);
    border-radius: 40px;
    margin-top: 1rem;
    height: 40px;
    width: 100%;
    max-width: 90%;
    padding: 4px 20px;
    text-align: center;
    color: var(--lime-light);
  }

  .details-container p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dots-container {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background-color: rgba(218, 244, 210, 0.3);
    cursor: pointer;
    transition: background-color 0.3s ease;
    padding: 0;
  }

  .dot:hover {
    background-color: rgba(218, 244, 210, 0.7);
  }

  .dot.active {
    background-color: rgba(218, 244, 210, 1);
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(7, 59, 66, 0.7); /* Darker background */
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10; /* Ensure buttons are above carousel items */
    transition: background-color 0.3s ease;
  }

  .nav-button:hover {
    background-color: rgba(7, 59, 66, 1);
  }

  .nav-button.left {
    left: 10%; /* Adjust positioning as needed */
  }

  .nav-button.right {
    right: 10%; /* Adjust positioning as needed */
  }

  @media (max-width: 768px) {
    .carousel-container {
      /* Adjust for mobile if needed, or keep hidden as per original design */
      padding: 1rem 0;
    }
    .carousel-item {
      width: 80%; /* Wider cards on mobile */
      max-width: none;
    }
    h3 {
      font-size: 1.2rem;
    }
    p {
      font-size: 0.8rem;
    }
    .nav-button.left {
      left: 2%; /* Adjust positioning for smaller screens */
    }

    .nav-button.right {
      right: 2%; /* Adjust positioning for smaller screens */
    }
  }
</style>

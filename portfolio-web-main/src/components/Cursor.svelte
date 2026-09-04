<script lang="ts">
    import { onMount } from "svelte";
    import { spring, tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    let mouseX = $state(0);
    let mouseY = $state(0);
    
    // Springs for organic lag
    let trailX = spring(0, { stiffness: 0.1, damping: 0.6 });
    let trailY = spring(0, { stiffness: 0.1, damping: 0.6 });
    
    // For rotation based on movement speed
    let rotation = $state(0);
    let lastX = 0;
    let lastY = 0;
    
    let isHovering = $state(false);
    let isClicking = $state(false);
    let isVisible = $state(false);
    
    // Ripple effect tweens
    let clickScale = tweened(1, { duration: 600, easing: cubicOut });
    let clickOpacity = tweened(0, { duration: 600, easing: cubicOut });

    onMount(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) isVisible = true;
            
            mouseX = e.clientX;
            mouseY = e.clientY;
            trailX.set(e.clientX);
            trailY.set(e.clientY);
            
            // Calculate movement delta for organic rotation
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            const speed = Math.sqrt(dx*dx + dy*dy);
            rotation += speed * 0.3; // Rotate based on distance moved
            
            lastX = e.clientX;
            lastY = e.clientY;
            
            const target = e.target as HTMLElement;
            // Check if hovering over clickable elements
            const clickable = target.closest('a, button, input, textarea, select, [role="button"], .setting-item, .project-card');
            isHovering = !!clickable;
        };

        const handleMouseDown = () => {
            isClicking = true;
            // Reset and trigger ripple effect
            clickScale.set(0.5, { duration: 0 });
            clickOpacity.set(0.8, { duration: 0 });
            
            setTimeout(() => {
                clickScale.set(2.5);
                clickOpacity.set(0);
            }, 10);
        };
        
        const handleMouseUp = () => {
            isClicking = false;
        };
        
        const handleMouseLeave = () => isVisible = false;

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    });
</script>

<svelte:head>
    <style>
        @media (pointer: fine) {
            body, a, button, input, select, textarea, .setting-item, .nav-btn, .project-card {
                cursor: none !important;
            }
        }
    </style>
</svelte:head>

{#if isVisible}
    <!-- Outer dashed tech ring -->
    <div 
        class="cursor-ring-outer" 
        style="transform: translate(calc({$trailX}px - 50%), calc({$trailY}px - 50%)) rotate({rotation}deg);"
        class:hovering={isHovering}
    ></div>
    
    <!-- Inner opposite rotating square -->
    <div 
        class="cursor-ring-inner" 
        style="transform: translate(calc({$trailX}px - 50%), calc({$trailY}px - 50%)) rotate({-rotation * 1.5}deg);"
        class:hovering={isHovering}
    ></div>

    <!-- Ripple on click -->
    <div 
        class="cursor-ripple"
        style="
            transform: translate(calc({mouseX}px - 50%), calc({mouseY}px - 50%)) scale({$clickScale});
            opacity: {$clickOpacity};
        "
    ></div>

    <!-- Core Dot -->
    <div 
        class="cursor-core" 
        style="transform: translate(calc({mouseX}px - 50%), calc({mouseY}px - 50%));"
        class:hovering={isHovering}
        class:clicking={isClicking}
    ></div>
{/if}

<style>
    .cursor-core {
        position: fixed;
        top: 0; left: 0;
        width: 4px; height: 4px;
        background-color: var(--lime-light, #daf4d2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999999;
        transition: width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    background-color 0.3s, box-shadow 0.3s;
        box-shadow: 0 0 8px var(--lime-light, #daf4d2);
    }

    .cursor-core.hovering {
        width: 10px; height: 10px;
        background-color: transparent;
        border: 2px solid var(--lime-light, #daf4d2);
        box-shadow: 0 0 12px var(--lime-light, #daf4d2);
    }

    .cursor-core.clicking {
        width: 12px; height: 12px;
        background-color: var(--lime-light, #daf4d2);
    }

    .cursor-ring-outer {
        position: fixed;
        top: 0; left: 0;
        width: 48px; height: 48px;
        border: 1px dashed rgba(218, 244, 210, 0.4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999998;
        transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    border-color 0.4s, border-radius 0.4s, box-shadow 0.4s;
    }

    .cursor-ring-outer.hovering {
        width: 36px; height: 36px;
        border: 2px solid rgba(218, 244, 210, 0.9);
        border-radius: 8px; /* Morphs from circle to a rounded square target lock */
        box-shadow: 0 0 16px rgba(218, 244, 210, 0.3);
    }

    .cursor-ring-inner {
        position: fixed;
        top: 0; left: 0;
        width: 24px; height: 24px;
        border: 1px solid rgba(218, 244, 210, 0.2);
        background: rgba(218, 244, 210, 0.03);
        pointer-events: none;
        z-index: 99999997;
        transition: opacity 0.3s, width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-radius 0.4s;
    }

    .cursor-ring-inner.hovering {
        width: 72px; height: 72px;
        border-radius: 50%;
        opacity: 0.2;
        border: 1px dashed rgba(218, 244, 210, 0.6);
        background: transparent;
    }

    .cursor-ripple {
        position: fixed;
        top: 0; left: 0;
        width: 40px; height: 40px;
        border: 2px solid var(--lime-light, #daf4d2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999999;
    }

    @media (max-width: 768px) {
        .cursor-core, .cursor-ring-outer, .cursor-ring-inner, .cursor-ripple {
            display: none !important;
        }
    }
</style>

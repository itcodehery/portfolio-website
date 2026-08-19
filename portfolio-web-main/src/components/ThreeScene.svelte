<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";

    let canvasEl: HTMLCanvasElement;
    
    export let scrollProgress = 0; // 0 to 1
    export let activeMode = 'default';

    onMount(() => {
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x042125, 0.02);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create some landscape elements
        // E.g., particles, or floating shapes using the color palette
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i+=3) {
            posArray[i] = (Math.random() - 0.5) * 100; // x
            posArray[i+1] = (Math.random() - 0.5) * 100; // y
            posArray[i+2] = (Math.random() - 0.5) * 400; // z (spread out long)
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xdaf4d2,
            transparent: true,
            opacity: 0.8
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        // Ground Terrain Geometry
        const terrainGeometry = new THREE.PlaneGeometry(250, 600, 80, 200);
        
        // Initial setup for pathMask can be pre-calculated, but for simplicity we will do it in the render loop
        terrainGeometry.computeVertexNormals();

        // Create a blurry dot texture for a dreamy look
        const dotCanvas = document.createElement('canvas');
        dotCanvas.width = 32;
        dotCanvas.height = 32;
        const dotCtx = dotCanvas.getContext('2d');
        if (dotCtx) {
            const gradient = dotCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            dotCtx.fillStyle = gradient;
            dotCtx.beginPath();
            dotCtx.arc(16, 16, 16, 0, Math.PI * 2);
            dotCtx.fill();
        }
        const dotTexture = new THREE.CanvasTexture(dotCanvas);

        // Chromatic Aberration Layers (Cyan/Red offset)
        const createLayer = (colorHex: number, offsetX: number, opacity: number) => {
            const mat = new THREE.PointsMaterial({
                color: colorHex,
                size: 0.15, // Much smaller dots
                map: dotTexture,
                transparent: true,
                opacity: opacity,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            const mesh = new THREE.Points(terrainGeometry, mat);
            mesh.rotation.x = -Math.PI / 2;
            mesh.position.y = -10;
            mesh.position.z = -200; 
            mesh.position.x = offsetX;
            scene.add(mesh);
            return { mesh, mat };
        };

        const layers = [
            createLayer(0xff0055, -0.05, 0.02), // Even more transparent Red fringe
            createLayer(0x00ffff, 0.05, 0.02),  // Even more transparent Cyan fringe
            createLayer(0xdaf4d2, 0, 0.1)       // Much more transparent Main theme color
        ];

        // Draw curved path line
        const pathPoints = [];
        for (let z = 10; z >= -450; z -= 2) {
            const x = Math.sin(z / 50) * 20;
            pathPoints.push(new THREE.Vector3(x, -9.8, z)); // slightly above ground
        }
        const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
        const pathMaterial = new THREE.LineBasicMaterial({ 
            color: 0xdaf4d2, 
            transparent: true, 
            opacity: 0.3 
        });
        const pathLine = new THREE.Line(pathGeometry, pathMaterial);
        scene.add(pathLine);

        camera.position.z = 0;

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        let animationFrameId: number;
        const clock = new THREE.Clock();

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            
            // Move camera based on scroll progress
            const targetZ = -(scrollProgress * 400);
            camera.position.z += (targetZ - camera.position.z) * 0.1; 
            
            // Curve camera X based on Z and add subtle mouse sway
            const baseTargetX = Math.sin(camera.position.z / 50) * 20;
            const targetX = baseTargetX + (mouseX * 4);
            camera.position.x += (targetX - camera.position.x) * 0.05;

            // Animate fog color based on activeMode
            // Midnight Purple: 0x130b1e, Ocean Blue: 0x061329, Dark green: 0x042125
            const targetFogColor = new THREE.Color(
                activeMode === 'code' ? 0x130b1e : 
                activeMode === 'design' ? 0x061329 : 0x042125
            );
            if (scene.fog && 'color' in scene.fog) {
                scene.fog.color.lerp(targetFogColor, 0.05);
            }

            // Add gentle bobbing and subtle mouse Y sway
            const baseTargetY = Math.sin(elapsedTime * 0.5) * 0.5;
            const targetY = baseTargetY + (mouseY * 2.5);
            camera.position.y += (targetY - camera.position.y) * 0.05;

            // Animate terrain like an ocean
            const positions = terrainGeometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const y = positions[i+1];
                const distFromCenter = Math.abs(x);
                const pathMask = Math.min(distFromCenter / 15, 1); 
                
                const noise = (Math.sin(x * 0.1 + elapsedTime * 0.8) * Math.cos(y * 0.1 + elapsedTime * 0.4) * 1
                            + Math.sin(x * 0.05 - elapsedTime * 0.5) * Math.cos(y * 0.05 + elapsedTime * 0.3) * 3) * pathMask;
                
                positions[i+2] = noise; 
            }
            terrainGeometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            particlesGeometry.dispose();
            material.dispose();
            terrainGeometry.dispose();
            layers.forEach(layer => layer.mat.dispose());
            dotTexture.dispose();
            pathGeometry.dispose();
            pathMaterial.dispose();
        };
    });
</script>

<canvas bind:this={canvasEl} class="webgl"></canvas>

<style>
    .webgl {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        outline: none;
    }
</style>

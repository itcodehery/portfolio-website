<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { labsSettings } from "../lib/settings";

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

        // Audio Data Texture for GPU
        const defaultAudioLength = 128;
        let audioDataArray = new Uint8Array(defaultAudioLength);
        let audioTexture = new THREE.DataTexture(audioDataArray, defaultAudioLength, 1, THREE.RedFormat);
        audioTexture.needsUpdate = true;

        const terrainVertexShader = `
            uniform float uTime;
            uniform sampler2D uAudioData;
            uniform int uHasAudio;
            uniform float uAudioDataLength;
            
            void main() {
                vec3 pos = position;
                float distFromCenter = abs(pos.x);
                float pathMask = min(distFromCenter / 15.0, 1.0);
                
                float audioBump = 0.0;
                if (uHasAudio == 1) {
                    float binIndex = mod(floor(abs(pos.y) * 0.5), uAudioDataLength);
                    float u = (binIndex + 0.5) / uAudioDataLength;
                    float audioVal = texture2D(uAudioData, vec2(u, 0.5)).r;
                    audioBump = audioVal * 1.5 * pathMask;
                }
                
                float noise = (sin(pos.x * 0.1 + uTime * 0.8) * cos(pos.y * 0.1 + uTime * 0.4) * 1.0
                             + sin(pos.x * 0.05 - uTime * 0.5) * cos(pos.y * 0.05 + uTime * 0.3) * 3.0) * pathMask;
                             
                pos.z = noise + audioBump;
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = 0.15 * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

        const terrainFragmentShader = `
            uniform vec3 uColor;
            uniform float uOpacity;
            uniform sampler2D uTexture;
            
            void main() {
                vec4 texColor = texture2D(uTexture, gl_PointCoord);
                gl_FragColor = vec4(uColor, uOpacity * texColor.a);
            }
        `;

        const uniformsBase = {
            uTime: { value: 0 },
            uAudioData: { value: audioTexture },
            uHasAudio: { value: 0 },
            uAudioDataLength: { value: defaultAudioLength },
            uTexture: { value: dotTexture }
        };

        const createLayer = (colorHex: number, offsetX: number, opacity: number) => {
            const mat = new THREE.ShaderMaterial({
                vertexShader: terrainVertexShader,
                fragmentShader: terrainFragmentShader,
                uniforms: {
                    ...uniformsBase,
                    uColor: { value: new THREE.Color(colorHex) },
                    uOpacity: { value: opacity }
                },
                transparent: true,
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
            createLayer(0xff0055, -0.05, 0.02), 
            createLayer(0x00ffff, 0.05, 0.02),  
            createLayer(0xdaf4d2, 0, 0.1)       
        ];

        const unsubSettings = labsSettings.subscribe(settings => {
            renderer.setPixelRatio(settings.renderResolution ? Math.min(window.devicePixelRatio, 2) : 1);
            layers[0].mesh.visible = settings.chromaticAberration;
            layers[1].mesh.visible = settings.chromaticAberration;
            particlesMesh.visible = settings.ambientParticles;
            
            if (settings.highPolyTerrain) {
                // To keep it simple, we don't hot-swap geometry to avoid memory leaks
                // It applies on next load
            }
        });

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
            const targetX = baseTargetX + ($labsSettings.reactivity ? mouseX * 4 : 0);
            camera.position.x += (targetX - camera.position.x) * 0.05;

            // Animate fog color based on activeMode
            const targetFogColor = new THREE.Color(
                activeMode === 'code' ? 0x000000 : 
                activeMode === 'design' ? 0x061329 : 
                activeMode === 'music' ? 0x0e051a : 0x042125
            );
            if (scene.fog && 'color' in scene.fog) {
                scene.fog.color.lerp(targetFogColor, 0.05);
            }

            // Add gentle bobbing and subtle mouse Y sway
            const baseTargetY = Math.sin(elapsedTime * 0.5) * 0.5;
            const targetY = baseTargetY + ($labsSettings.reactivity ? mouseY * 2.5 : 0);
            camera.position.y += (targetY - camera.position.y) * 0.05;

            // Audio Analysis Data
            const analyser = window.__soundAnalyser ? window.__soundAnalyser() : null;
            if (analyser && $labsSettings.reactivity) {
                if (audioDataArray.length !== analyser.frequencyBinCount) {
                    audioDataArray = new Uint8Array(analyser.frequencyBinCount);
                    audioTexture.dispose();
                    audioTexture = new THREE.DataTexture(audioDataArray, audioDataArray.length, 1, THREE.RedFormat);
                    layers.forEach(l => {
                        l.mat.uniforms.uAudioDataLength.value = audioDataArray.length;
                        l.mat.uniforms.uAudioData.value = audioTexture;
                    });
                }
                analyser.getByteFrequencyData(audioDataArray);
                audioTexture.needsUpdate = true;
                layers.forEach(l => l.mat.uniforms.uHasAudio.value = 1);
            } else {
                layers.forEach(l => l.mat.uniforms.uHasAudio.value = 0);
            }

            // Update shader uniforms
            layers.forEach(l => l.mat.uniforms.uTime.value = elapsedTime);

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
            unsubSettings();
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

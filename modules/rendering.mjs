// Necessary Imports
import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js'; // Import Three.js library
import { Noise } from 'https://cdn.skypack.dev/noisejs'; // Import noise generation library
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls for camera movement
import { addSkyObjects } from './skySphere.mjs'; // Import function to add sky objects
import { randomizeTerrain } from './terrainCustomization.mjs'; // Import function for terrain customization

// Create a plane geometry
const pgeom = new THREE.PlaneGeometry(7, 7, 199, 199);

// Initialize noise generator
const noise = new Noise();

// Create a Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set camera position and configure camera controls
camera.position.set(0, 2, 8);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Declare variables for sun, moon, and their positions
let sunLight, sunMesh, moonLight, moonMesh, sunAngle = 0, sunDistance;

// Function to initialize rendering and set sky objects
export function initializeRendering() {
    const skyObjects = addSkyObjects(scene);
    sunLight = skyObjects.sunLight;
    sunMesh = skyObjects.sunMesh;
    moonLight = skyObjects.moonLight;
    moonMesh = skyObjects.moonMesh;
    sunDistance = skyObjects.sunDistance;
}

// Flag to pause/unpause rendering
let isPaused = false;









window.addEventListener('keydown', handleKeyDown);

// Function to handle keydown events for camera movement
function handleKeyDown(event) {
    event.preventDefault();
    
    switch (event.key) {
        case 'ArrowUp':
            moveCamera('forward');
            break;
        case 'ArrowDown':
            moveCamera('backward');
            break;
        case 'ArrowLeft':
            moveCamera('left');
            break;
        case 'ArrowRight':
            moveCamera('right');
            break;
        case 's':
            isPaused = !isPaused; // Toggle isPaused when "S" is pressed
            break;
    }
}


// Functions for camera movement
function moveCamera(direction) {
    const forward = new THREE.Vector3(0, 0, -1);
    const backward = new THREE.Vector3(0, 0, 1);
    const left = new THREE.Vector3(-1, 0, 0);
    const right = new THREE.Vector3(1, 0, 0);

    let moveDirection;
    switch (direction) {
        case 'forward':
            moveDirection = forward;
            break;
        case 'backward':
            moveDirection = backward;
            break;
        case 'left':
            moveDirection = left;
            break;
        case 'right':
            moveDirection = right;
            break;
    }

    const rotation = camera.rotation.y;
    moveDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation);
    camera.position.addScaledVector(moveDirection, moveSpeed);
    controls.target.addScaledVector(moveDirection, moveSpeed);
}


// Function to render the scene
export function render() {
    if (!isPaused) {
        sunAngle += 0.0016;
        const sunX = Math.cos(sunAngle) * sunDistance;
        const sunZ = Math.sin(sunAngle) * sunDistance;
        const sunY = 2;
        sunMesh.position.set(sunX, sunY, sunZ);
        sunLight.position.set(sunX, sunY, sunZ);

        const moonX = -Math.cos(sunAngle) * sunDistance;
        const moonZ = -Math.sin(sunAngle) * sunDistance;
        const moonY = 2;
        moonMesh.position.set(moonX, moonY, moonZ);
        moonLight.position.set(moonX, moonY, moonZ);
    }

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// Export noise, scene, camera, renderer, and controls
export { noise, scene, camera, renderer, controls };
export let moveSpeed = 0.1; // Initialize camera movement speed

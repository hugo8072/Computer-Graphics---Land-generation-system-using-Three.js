// addOns.mjs
import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { scene } from './rendering.mjs'; // Import the 'scene' from 'rendering.mjs'
import { guiControls } from './uiControls.mjs'; // Import GUI controls for rain settings

// Function to add rain to the scene
export function addRain() {
    // Create a buffer geometry for raindrops
    const rainGeometry = new THREE.BufferGeometry();
    
    // Define raindrop material properties, such as color and size
    const rainMaterial = new THREE.PointsMaterial({ color: 0x0000ff, size: guiControls.rainIntensity });

    // Generate random raindrop positions
    const rainVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 10;  // Random x position within a range
        const y = Math.random() * 20;          // Random y position within a range
        const z = (Math.random() - 0.5) * 10;  // Random z position within a range
        rainVertices.push(x, y, z);             // Store the raindrop position
    }

    // Set the 'position' attribute of the rain geometry
    rainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(rainVertices, 3));

    // Create a Points object for rendering raindrops
    const rain = new THREE.Points(rainGeometry, rainMaterial);
    rain.name = 'rain';                           // Set a name for the rain object
    rain.userData.windIntensity = guiControls.windIntensity; // Store wind intensity data
    scene.add(rain);                               // Add rain to the scene

    // Function to update raindrop positions and animation
    const updateRain = () => {
        const positions = rain.geometry.attributes.position.array; // Get raindrop positions
        const windIntensity = rain.userData.windIntensity;         // Get wind intensity from user data
      
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] -= 0.1;                                // Move raindrop downwards
            if (positions[i + 1] < -1) {
                positions[i + 1] = 20;                               // Reset raindrop position if below the ground
            }
            positions[i] += (Math.random() - 0.5) * windIntensity;   // Apply random horizontal movement
            positions[i + 2] += (Math.random() - 0.5) * windIntensity; // Apply random horizontal movement
        }
      
        rain.geometry.attributes.position.needsUpdate = true; // Update raindrop positions
        requestAnimationFrame(updateRain); // Request the next frame for animation
    };

    // Start the raindrop animation
    updateRain();
}

// Function to remove rain from the scene
export function removeRain() {
    const rain = scene.getObjectByName('rain'); // Find the rain object in the scene by name
    if (rain) {
        scene.remove(rain); // Remove the rain object from the scene if it exists
    }
}

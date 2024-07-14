// terrainGeneration.mjs
import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { noise, scene } from './rendering.mjs'; // Import 'scene' from 'rendering.mjs'



// Create a plane geometry with specific dimensions and subdivisions
const pgeom = new THREE.PlaneGeometry(7, 7, 199, 199);

// Define the material properties for the terrain
const terrainMaterial = new THREE.MeshPhongMaterial({
    specular: 0x000000, // Dark color for specular highlight
    shininess: 500,     // Higher value for shininess
    side: THREE.DoubleSide, // Render both sides of the geometry
    flatShading: true,
 
});

terrainMaterial.shadowSide = THREE.DoubleSide; // Render shadows on both sides
const plane = new THREE.Mesh(pgeom, terrainMaterial);
scene.add(plane); // Add the terrain mesh to the scene

plane.rotation.x = -3.14 / 3.5; // Rotate the terrain
noise.seed(Math.random()); // Set a random seed for the noise function
plane.receiveShadow = true; // Enable receiving shadows for the terrain

export { pgeom, terrainMaterial, plane }; // Export relevant variables for external use

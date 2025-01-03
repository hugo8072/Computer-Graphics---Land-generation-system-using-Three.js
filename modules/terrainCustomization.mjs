import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js'
import { Noise } from 'https://cdn.skypack.dev/noisejs'

/**
 * Randomizes the terrain by modifying the z-coordinate of the vertices in the geometry using Perlin noise.
 *
 * @param {Noise} noise - The noise generator instance to be used for terrain randomness.
 * @param {THREE.PlaneGeometry} pgeom - The plane geometry representing the terrain to be modified.
 */
export function randomizeTerrain (noise, pgeom) {
  noise.seed(Math.random()) // Set a random seed for noise generation

  for (let i = 0; i < 200; i++) {
    for (let j = 0; j < 200; j++) {
      const ex = 0.5 // Exponent for controlling terrain complexity
      // Calculate the terrain height using Perlin noise at different scales and amplitudes
      pgeom.vertices[i + j * 200].z = (noise.simplex2(i / 100, j / 100) +
        (noise.simplex2((i + 200) / 50, j / 50) * Math.pow(ex, 1)) +
        (noise.simplex2((i + 400) / 25, j / 25) * Math.pow(ex, 2)) +
        (noise.simplex2((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 3)) +
        (noise.simplex2((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 4))) / 2
    }
  }

  pgeom.verticesNeedUpdate = true // Update the geometry to reflect the changes
}

/**
 * Updates the height map of the terrain with a new value, affecting the terrain's z-coordinates.
 *
 * @param {Noise} noise - The noise generator instance to be used for terrain randomness.
 * @param {THREE.PlaneGeometry} pgeom - The plane geometry representing the terrain to be modified.
 * @param {number} value - The scaling factor to apply to the terrain height.
 */
export function updateHeightMap (noise, pgeom, value) {
  for (let i = 0; i < 200; i++) {
    for (let j = 0; j < 200; j++) {
      const ex = 0.5 // Exponent for controlling terrain complexity
      // Calculate the terrain height using Perlin noise at different scales and amplitudes, scaled by the provided value
      pgeom.vertices[i + j * 200].z = (noise.simplex2(i / 100, j / 100) +
        (noise.simplex2((i + 200) / 50, j / 50) * Math.pow(ex, 1)) +
        (noise.simplex2((i + 400) / 25, j / 25) * Math.pow(ex, 1)) +
        (noise.simplex2((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 2)) +
        (noise.simplex2((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 8))) / 2 * value
    }
  }

  pgeom.verticesNeedUpdate = true // Update the geometry to reflect the changes
}

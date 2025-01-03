import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js'
import * as dat from 'https://cdn.skypack.dev/dat.gui'
import { noise, camera, renderer, scene, initializeRendering, render } from './modules/rendering.mjs'
import { pgeom, terrainMaterial, plane } from './modules/terrainGeneration.mjs'
import { randomizeTerrain, updateHeightMap } from './modules/terrainCustomization.mjs'
import { addSkyObjects } from './modules/skySphere.mjs'
import { controls, moveSpeed } from './modules/rendering.mjs'
import { gui, guiControls } from './modules/uiControls.mjs'

/**
 * Initialize the height map for terrain generation.
 */
updateHeightMap(noise, pgeom, 0.5)

/**
 * Event listener for keydown events to trigger terrain changes.
 */
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'a':
      randomizeTerrain(noise, pgeom) // Randomizes the terrain when 'a' is pressed
      break
    case 'r':
      guiControls.heightMap = 0.5 // Set heightMap value to 0.5
      gui.__controllers[1].setValue(guiControls.heightMap) // Update the GUI control
      updateHeightMap(noise, pgeom, guiControls.heightMap) // Update terrain height map
      break
  }
})

/**
 * Initialize the rendering process and start the animation loop.
 */
initializeRendering()
render()


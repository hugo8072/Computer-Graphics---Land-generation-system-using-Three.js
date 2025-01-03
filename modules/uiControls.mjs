import * as dat from 'https://cdn.skypack.dev/dat.gui'
import { terrainMaterial, pgeom } from './terrainGeneration.mjs'
import { updateHeightMap } from './terrainCustomization.mjs'
import { addSkyObjects } from './skySphere.mjs'
import { scene, noise } from './rendering.mjs'
import { addRain, removeRain } from './addOns.mjs'

const skyObjects = addSkyObjects(scene) // Call the addSkyObjects function to get sky objects
const sunLight = skyObjects.sunLight

/**
 * GUI controls for various settings such as terrain color, height map, sun intensity, and rain settings.
 *
 * @type {Object}
 */
export const guiControls = {
  terrainColor: terrainMaterial.color.getHex(),
  heightMap: 0.5,
  sunIntensity: 1,
  rain: false,
  rainIntensity: 0.1,
  windIntensity: 0.5
}

/**
 * Initialize GUI and add controls for terrain, height map, sun, and rain.
 *
 * @type {dat.GUI}
 */
export const gui = new dat.GUI()

// Add color control for terrain
gui.addColor(guiControls, 'terrainColor').name('Terrain Color').onChange(function (value) {
  terrainMaterial.color.setHex(value)
})

// Add height map control
gui.add(guiControls, 'heightMap', 0, 1).name('Height Map').onChange(function (value) {
  updateHeightMap(noise, pgeom, value)
})

// Add sun intensity control
gui.add(guiControls, 'sunIntensity').min(0).max(2).step(0.1).name('Sun Intensity').onChange(function (value) {
  sunLight.intensity = value
})

// Rain control section
const rainFolder = gui.addFolder('Rain')
rainFolder.add(guiControls, 'rain').onChange(function (value) {
  toggleRain(value)
})

rainFolder.add(guiControls, 'rainIntensity').min(0).max(1).step(0.1).name('Rain Intensity').onChange(function (value) {
  updateRainIntensity(value)
})

const windController = gui.add(guiControls, 'windIntensity').min(0).max(1).step(0.01).name('Wind Intensity')
windController.onChange(function (value) {
  updateWindDirection(value)
})

/**
 * Updates the wind direction intensity for the rain effect.
 *
 * @param {number} value - The wind intensity value.
 */
export function updateWindDirection (value) {
  const rain = scene.getObjectByName('rain')
  if (rain) {
    rain.userData.windIntensity = value
  }
}

/**
 * Updates the rain intensity based on the provided value.
 *
 * @param {number} value - The rain intensity value.
 */
export function updateRainIntensity (value) {
  const rain = scene.getObjectByName('rain')
  if (rain) {
    rain.material.size = value
  }
}

/**
 * Toggles the rain effect based on the provided value.
 *
 * @param {boolean} value - Whether to enable or disable rain.
 */
export function toggleRain (value) {
  if (value) {
    addRain()
  } else {
    removeRain()
  }
}

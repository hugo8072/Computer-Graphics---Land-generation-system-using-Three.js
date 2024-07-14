// uiControls.mjs
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import { terrainMaterial, pgeom } from './terrainGeneration.mjs';
import { updateHeightMap } from './terrainCustomization.mjs';
import { addSkyObjects } from './skySphere.mjs';
import { scene, noise } from './rendering.mjs';
import { addRain, removeRain } from './addOns.mjs';

const skyObjects = addSkyObjects(scene); // Call the addSkyObjects function to get sky objects
const sunLight = skyObjects.sunLight;

export const guiControls = {
  terrainColor: terrainMaterial.color.getHex(),
  heightMap: 0.5,
  sunIntensity: 1,
  rain: false,
  rainIntensity: 0.1,
  windIntensity: 0.5,
};

export const gui = new dat.GUI();

gui.addColor(guiControls, 'terrainColor').name('Terrain Color').onChange(function (value) {
    terrainMaterial.color.setHex(value);
    });
    
    gui.add(guiControls, 'heightMap', 0, 1).name('Height Map').onChange(function (value) {
    updateHeightMap(noise, pgeom, value);
    });
    
    gui.add(guiControls, 'sunIntensity').min(0).max(2).step(0.1).name('Sun Intensity').onChange(function (value) {
    sunLight.intensity = value;
    });
    
    // Rain control section
    const rainFolder = gui.addFolder('Rain');
    rainFolder.add(guiControls, 'rain').onChange(function (value) {
    toggleRain(value);
    });
    
    rainFolder.add(guiControls, 'rainIntensity').min(0).max(1).step(0.1).name('Rain Intensity').onChange(function (value) {
    updateRainIntensity(value);
    });
    
    const windController = gui.add(guiControls, 'windIntensity').min(0).max(1).step(0.01).name('Wind Intensity');
    windController.onChange(function (value) {
    updateWindDirection(value);
    });

// Functions for rain and wind control
export function updateWindDirection(value) {
  const rain = scene.getObjectByName('rain');
  if (rain) {
    rain.userData.windIntensity = value;
  }
}

export function updateRainIntensity(value) {
  const rain = scene.getObjectByName('rain');
  if (rain) {
    rain.material.size = value;
  }
}

export function toggleRain(value) {

  if (value) {
    addRain();
  } else {
    removeRain();
  }
}

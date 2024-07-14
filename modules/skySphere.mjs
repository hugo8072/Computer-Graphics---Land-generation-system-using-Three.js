import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

let skyObjects = null; // Variable to store sky objects

function addSkyObjects(scene) {
    if (skyObjects === null) {
        // Create and configure sunlight
        const sunLight = new THREE.PointLight(0xffcc77, 1.5);
        sunLight.position.set(50, 50, 50);
        sunLight.castShadow = true;
        const d = 10;
        sunLight.shadow.camera.left = -d;
        sunLight.shadow.camera.right = d;
        sunLight.shadow.camera.top = d;
        sunLight.shadow.camera.bottom = -d;
        sunLight.shadow.camera.near = 0.1;
        sunLight.shadow.camera.far = 50;
        sunLight.shadow.mapSize.width = 1024;
        sunLight.shadow.mapSize.height = 1024;
        scene.add(sunLight);

        // Create a surface that receives shadows
        const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: 0.5 }));
        planeMesh.rotation.x = -Math.PI / 2;
        planeMesh.position.y = -1;
        planeMesh.receiveShadow = true;
        scene.add(planeMesh);

        // Create a visual sphere for the sun
        const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sunMesh);

        // Create and configure moonlight
        const moonLight = new THREE.PointLight(0xffffff, 0.3);
        scene.add(moonLight);

        // Create a visual sphere for the moon
        const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, emissive: 0xffffff });
        const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonMesh.position.set(0, 3, 0);
        scene.add(moonMesh);

        // Variables for controlling sun movement
        let sunAngle = 0;
        const sunDistance = 5;

        // Store the objects in skyObjects
        skyObjects = { sunLight, sunMesh, moonLight, moonMesh, sunAngle, sunDistance };
    }

    return skyObjects; // Return the existing objects
}

// Export the addSkyObjects function directly
export { addSkyObjects };

import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';
//import ceilingTextures from './ceilingTextures.js'; // Import ceiling textures
import {
    colorTexture,
    //displacementTexture,
    aoTexture,
    emissionTexture,
    //heightTexture,
    // metalnessTexture,
    normalGLTexture,
    roughnessTexture,
  } from './ceilingTextures.js';

// Set up scene, camera, renderer
const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 1.6, 3);  // Start the camera above the floor

// Load the texture for the floor
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('textures/floor.jpg');



// floor 2

const colorTextureF = textureLoader.load("marble/color.jpg");
const displacementTextureF = textureLoader.load("marble/dis.jpg");
const normalGLTextureF = textureLoader.load("marble/normgl.jpg");
const roughnessTextureF = textureLoader.load("marble/rou.jpg");


// Create materials
const floorMaterial = new THREE.MeshStandardMaterial({
    map:  colorTextureF,
    displacementMap: displacementTextureF,   // Displacement map
    normalMap: normalGLTextureF,        // Normal map
    //normalMapType: THREE.NormalMap,    // Type of normal map
    roughnessMap: roughnessTextureF,    // Roughness map
    displacementScale: 0.1,            // Displacement intensity
    side: THREE.DoubleSide,
});

const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xe6ebd7,
    side: THREE.DoubleSide,
});

const ceilingMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,                // Base color map
    //displacementMap: displacementTexture,   // Displacement map
    aoMap: aoTexture,                      // Ambient occlusion map
    emissiveMap: emissionTexture,      // Emissive texture (for glow)
    emissive: 0xFFFFFF,                // Emissive color (white light)
    emissiveIntensity: 0.1,              // Intensity of the emissive light
    //metalnessMap: metalnessTexture,    // Metalness map
    roughness: 0.05,  // Make the surface smoother (lower roughness value for shiny glass)
    normalMap: normalGLTexture,        // Normal map
    //normalMapType: THREE.TangentSpaceNormalMap,    // Type of normal map
    roughnessMap: roughnessTexture,    // Roughness map
    //displacementScale: 0.1,            // Displacement intensity
    side: THREE.DoubleSide,           // Render both sides of the geometry
});



// Set the new dimensions for the rectangular room
const roomWidth = 15;
const roomDepth = 10;
const roomHeight = 4;

// Create the floor
const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Create the ceiling
const ceilingGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = roomHeight;
scene.add(ceiling);

// Create a wall group
const wallGroup = new THREE.Group();
scene.add(wallGroup);

// Create the walls
const wallGeometry1 = new THREE.PlaneGeometry(roomWidth, roomHeight);
const wallGeometry2 = new THREE.PlaneGeometry(roomDepth, roomHeight);

const wall1 = new THREE.Mesh(wallGeometry1, wallMaterial);
wall1.position.set(0, roomHeight / 2, -roomDepth / 2);
wallGroup.add(wall1);

const wall2 = new THREE.Mesh(wallGeometry2, wallMaterial);
wall2.rotation.y = Math.PI / 2;
wall2.position.set(-roomWidth / 2, roomHeight / 2, 0);
wallGroup.add(wall2);

const wall3 = new THREE.Mesh(wallGeometry2, wallMaterial);
wall3.rotation.y = Math.PI / 2;
wall3.position.set(roomWidth / 2, roomHeight / 2, 0);
wallGroup.add(wall3);

const wall4 = new THREE.Mesh(wallGeometry1, wallMaterial);
wall4.position.set(0, roomHeight / 2, roomDepth / 2);
wallGroup.add(wall4);

// Create and configure the video element
const video = document.createElement('video');
video.src = 'textures/tiger.mp4'; // Replace with your MP4 video source
video.crossOrigin = 'anonymous';
video.autoplay = true;
video.loop = true;
video.muted = true;
video.style.position = 'absolute';
video.style.top = '0';
video.style.left = '0';
video.style.width = '0px';
video.style.height = '0px';
video.style.opacity = '0'; // Hide but still ensure the video loads

// Append video to the body
document.body.appendChild(video);

// Create a video texture
const videoTexture = new THREE.VideoTexture(video);

// Create a material with the video texture
const videoMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.FrontSide,
    toneMapped: false
});

// Define dimensions for the screen
const screenGeometry = new THREE.BoxGeometry(5, 3, 0.05); // Width, height, and depth of the screen
const screenMesh = new THREE.Mesh(screenGeometry, videoMaterial);

// Position the screen in front of the far wall
screenMesh.position.set(0, 2, -roomDepth / 2 + 0.05); // Adjust as needed
screenMesh.rotation.y = Math.PI; // Rotate to face the camera or preferred direction

// Add the screen to the scene
scene.add(screenMesh);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040,15); // Ambient light to ensure the model isn't completely dark
scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(0xffffff, 2.7); // Directional light for better shadows and highlights
directionalLight.position.set(5, 15, 5).normalize();
scene.add(directionalLight);

// Load the texture for the artwork on the right wall
const rightArtTexture = textureLoader.load('textures/arttig.jpg'); // Replace with your image path

// Create the material for the right wall artwork
const rightArtMaterial = new THREE.MeshBasicMaterial({
    map: rightArtTexture,
    side: THREE.DoubleSide
});

// Define dimensions for the artwork (width, height)
const rightArtWidth = 1.5;
const rightArtHeight = 2.8;
const rightArtGeometry = new THREE.PlaneGeometry(rightArtWidth, rightArtHeight);

// Create the mesh and position it on the right wall
const rightArtMesh = new THREE.Mesh(rightArtGeometry, rightArtMaterial);
rightArtMesh.position.set(roomWidth / 2 - 0.05, roomHeight / 2, 0); // Centered horizontally and vertically on the right wall
rightArtMesh.rotation.y = -Math.PI / 2; // Rotate to face the center of the room

// Add the artwork to the scene
scene.add(rightArtMesh);

// Load the texture for the artwork on the left wall
const leftArtTexture = textureLoader.load('textures/tigsnake.jpg'); // Replace with your image path

// Create the material for the left wall artwork
const leftArtMaterial = new THREE.MeshBasicMaterial({
    map: leftArtTexture,
    side: THREE.DoubleSide
});

// Define dimensions for the artwork (width, height)
const leftArtWidth = 3;
const leftArtHeight = 2;
const leftArtGeometry = new THREE.PlaneGeometry(leftArtWidth, leftArtHeight);

// Create the mesh and position it on the left wall
const leftArtMesh = new THREE.Mesh(leftArtGeometry, leftArtMaterial);
leftArtMesh.position.set(-(roomWidth / 2 - 0.05), roomHeight / 2, 0); // Centered horizontally and vertically on the left wall
leftArtMesh.rotation.y = Math.PI / 2; // Rotate to face the center of the room

// Add the artwork to the scene
scene.add(leftArtMesh);




// Initialize GLTFLoader
const loader = new GLTFLoader();
let model;

// Load the main model
function loadModel() {
    return new Promise((resolve, reject) => {
        loader.load('tiger.glb', (gltf) => {
            model = gltf.scene;

            // Traverse the model to ensure that materials and textures are properly configured
            model.traverse((child) => {
                if (child.isMesh) {
                    if (child.material.map) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: child.material.map,
                            // Add additional material properties if needed
                        });
                    } else {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0xffffff,
                        });
                    }
                }
            });

            model.position.set(0, 1, 0);  // Adjust the position as needed
            model.scale.set(0.7, 0.7, 0.7); // Scale the model to fit the room
            scene.add(model);
            resolve();
        }, undefined, reject);
    });
}

// Load the bench model
function loadBenchModel() {
    return new Promise((resolve, reject) => {
        loader.load('bench.glb', (gltf) => {
            const benchModel = gltf.scene.clone();
            const benchModel2 = gltf.scene.clone();

            // Adjust the position, rotation, and scale of the bench
            benchModel.position.set(roomWidth / 2 - 2, 0, 0);  // Position the bench on the right side, centered along the depth (Z) axis
            benchModel.rotation.y = -Math.PI / 2; // Rotate the bench by 90 degrees (clockwise)
            benchModel.scale.set(1, 1, 1); // Scale the bench model to make it larger

            // Adjust the position, rotation, and scale of the bench
            benchModel2.position.set(-(roomWidth / 2 - 2), 0, 0);  // Position the bench on the right side, centered along the depth (Z) axis
            benchModel2.rotation.y = -Math.PI / 2; // Rotate the bench by 90 degrees (clockwise)
            benchModel2.scale.set(1, 1, 1); // Scale the bench model to make it larger

            scene.add(benchModel);
            scene.add(benchModel2);
            resolve();
        }, undefined, reject);
    });
}

function loadPlantModel() {
    return new Promise((resolve, reject) => {
        loader.load('plant.glb', (gltf) => {
            const plantModel1 = gltf.scene;



            // Adjust the position, rotation
            plantModel1.position.set(-(roomWidth / 2 - 1.5), 0, -3.5);  // Position 
            plantModel1.rotation.y = -Math.PI / 2; // Rotate
            plantModel1.scale.set(0.03, 0.04, 0.03); // Scale 

            // Add the model to the scene

            scene.add(plantModel1);

            resolve();
        }, undefined, reject);
    });
}



// Load the door model
function loadDoorModel() {
    return new Promise((resolve, reject) => {
        loader.load('door.glb', (gltf) => {
            const doorModel = gltf.scene;

            // Adjust the position, rotation, and scale of the door
            doorModel.position.set(0, roomHeight / 2, roomDepth / 2 - 0.05); // Position the door on the back wall
            doorModel.rotation.y = Math.PI; // Rotate the door to face the room
            doorModel.scale.set(0.5, 0.54, 0.5); // Scale the door model to make it fit the wall

            // Add the door model to the scene
            scene.add(doorModel);
            resolve();
        }, undefined, reject);
    });
}




// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Movement controls
const moveSpeed = 0.1;
const rotationSpeed = 0.005;

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    'w': false,
    'a': false,
    's': false,
    'd': false
};

let mouseDown = false;
let lastMouseX = 0;

// Handle key presses
window.addEventListener('keydown', (event) => {
    if (event.key in keys) {
        keys[event.key] = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key in keys) {
        keys[event.key] = false;
    }
});

// Handle mouse movement for horizontal rotation
window.addEventListener('mousedown', (event) => {
    mouseDown = true;
    lastMouseX = event.clientX;
});

window.addEventListener('mouseup', () => {
    mouseDown = false;
});

window.addEventListener('mousemove', (event) => {
    if (mouseDown) {
        const deltaX = event.clientX - lastMouseX;
        lastMouseX = event.clientX;

        // Update camera rotation around Y-axis (horizontal rotation)
        camera.rotation.y -= deltaX * rotationSpeed;
    }
});

// Collision detection for walls
function checkCollision(newPosition) {
    const halfSize = 0.5;
    const minX = -roomWidth / 2 + halfSize;
    const maxX = roomWidth / 2 - halfSize;
    const minZ = -roomDepth / 2 + halfSize;
    const maxZ = roomDepth / 2 - halfSize;

    if (newPosition.x < minX || newPosition.x > maxX || newPosition.z < minZ || newPosition.z > maxZ) {
        return true;
    }
    return false;
}

// Update camera position
function updateCameraPosition() {
    let newPosition = camera.position.clone();

    // Movement handling for Arrow keys and WASD
    if (keys.ArrowUp || keys.w) {
        newPosition.z -= moveSpeed * Math.cos(camera.rotation.y);
        newPosition.x -= moveSpeed * Math.sin(camera.rotation.y);
    }
    if (keys.ArrowDown || keys.s) {
        newPosition.z += moveSpeed * Math.cos(camera.rotation.y);
        newPosition.x += moveSpeed * Math.sin(camera.rotation.y);
    }
    if (keys.ArrowLeft || keys.a) {
        newPosition.x -= moveSpeed * Math.cos(camera.rotation.y);
        newPosition.z += moveSpeed * Math.sin(camera.rotation.y);
    }
    if (keys.ArrowRight || keys.d) {
        newPosition.x += moveSpeed * Math.cos(camera.rotation.y);
        newPosition.z -= moveSpeed * Math.sin(camera.rotation.y);
    }

    if (!checkCollision(newPosition)) {
        camera.position.copy(newPosition);
    }
}

// Update video texture function
function updateTexture(videoDomElement, texture) {
    if (videoDomElement.readyState >= videoDomElement.HAVE_CURRENT_DATA) {
        texture.needsUpdate = true;
    }
}

function addCeilingLight() {
    // Ensure the model has been loaded before adding lights
    if (!model) {
        console.warn('Model not loaded yet. Lighting adjustments will be applied once the model is available.');
        return;
    }

    // Calculate the model's bounding box to center the light around it
    const boundingBox = new THREE.Box3().setFromObject(model);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    
    // Define the position for the spotlight on the ceiling
    const lightPosition = {
        x: center.x,
        y: roomHeight, // Ensure this is above the model's bounding box
        z: center.z
    };

    // Create the spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 15, roomWidth * 2, 0.3); // Adjust intensity and cone angle as needed
    spotLight.position.set(lightPosition.x, lightPosition.y, lightPosition.z);

    // To face downward, adjust the light's target
    spotLight.target.position.set(center.x, center.y, center.z); // Point towards the center of the model

    // Adjust the penumbra for softer edges
    spotLight.penumbra = 0.2;

    // Add a helper to visualize the spotlight's cone
    //const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    //scene.add(spotLightHelper);

    // Add the light and its target to the scene
    scene.add(spotLight);
    scene.add(spotLight.target); // Ensure the target is part of the scene
}





// Render loop
function render() {
    updateCameraPosition();

    // Update the video texture
    updateTexture(video, videoTexture);

    // Spin the model
    if (model) {
        model.rotation.y += 0.01; // Rotate the model for demonstration
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// Load models and start rendering
Promise.all([loadModel(), loadBenchModel(), loadPlantModel(), loadDoorModel()]).then(() => {
    addCeilingLight();
    render();
});

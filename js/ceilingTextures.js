import * as THREE from 'three';

// Create a texture loader
const textureLoader = new THREE.TextureLoader();

const colorTexture = textureLoader.load("glass/colour.jpg");
const displacementTexture = textureLoader.load("glass/dis.jpg");
const aoTexture = textureLoader.load("glass/ao.jpg");
const emissionTexture = textureLoader.load("glass/glass.jpg");
//const metalnessTexture = textureLoader.load("glass/met.jpg");
const normalGLTexture = textureLoader.load("glass/normal.jpg");
const roughnessTexture = textureLoader.load("glass/rou.jpg");
const heightTexture = textureLoader.load("glass/height.jpg");

// Set texture parameters
colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping;
aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;
emissionTexture.wrapS = emissionTexture.wrapT = THREE.RepeatWrapping;
//metalnessTexture.wrapS = metalnessTexture.wrapT = THREE.RepeatWrapping;
normalGLTexture.wrapS = normalGLTexture.wrapT = THREE.RepeatWrapping;
roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;
heightTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;

export {
    colorTexture,
    displacementTexture,
    aoTexture,
    emissionTexture,
    //metalnessTexture,
    heightTexture,
    normalGLTexture,
    roughnessTexture,
  };



import * as THREE from 'three';

// Create a texture loader
const textureLoader = new THREE.TextureLoader();

const colorTexture = textureLoader.load("textures/color.jpg");
const displacementTexture = textureLoader.load("textures/dis.jpg");
const aoTexture = textureLoader.load("textures/ao.jpg");
const emissionTexture = textureLoader.load("textures/emi.jpg");
const metalnessTexture = textureLoader.load("textures/met.jpg");
const normalGLTexture = textureLoader.load("textures/normgl.jpg");
const roughnessTexture = textureLoader.load("textures/rou.jpg");

// Set texture parameters
colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping;
aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;
emissionTexture.wrapS = emissionTexture.wrapT = THREE.RepeatWrapping;
metalnessTexture.wrapS = metalnessTexture.wrapT = THREE.RepeatWrapping;
normalGLTexture.wrapS = normalGLTexture.wrapT = THREE.RepeatWrapping;
roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;

export {
    colorTexture,
    displacementTexture,
    aoTexture,
    emissionTexture,
    metalnessTexture,
    normalGLTexture,
    roughnessTexture,
  };



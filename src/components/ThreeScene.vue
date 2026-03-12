<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let torus: THREE.Group;
let particles: THREE.Points;

const init = () => {
  console.log('Three.js Initialization started');
  if (!canvasRef.value) {
    console.error('Canvas element not found');
    return;
  }

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true, // 重要: 背景を透明にする
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // 透明度を0に設定

  // Wheel Group
  const wheelGroup = new THREE.Group();
  scene.add(wheelGroup);

  // Rim
  const rimGeometry = new THREE.TorusGeometry(10, 0.4, 16, 100);
  const rimMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff3e00, 
    metalness: 0.9, 
    roughness: 0.1,
    emissive: 0xff3e00,
    emissiveIntensity: 0.5
  });
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  wheelGroup.add(rim);

  // Spokes
  const spokeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 1, roughness: 0.1 });
  for (let i = 0; i < 24; i++) {
    const spokeGeometry = new THREE.CylinderGeometry(0.03, 0.03, 20);
    const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);
    const angle = (i / 24) * Math.PI * 2;
    spoke.rotation.z = angle;
    wheelGroup.add(spoke);
  }

  // Hub
  const hubGeometry = new THREE.CylinderGeometry(0.8, 0.8, 1.5, 32);
  const hubMaterial = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 1, roughness: 0.1 });
  const hub = new THREE.Mesh(hubGeometry, hubMaterial);
  hub.rotation.x = Math.PI / 2;
  wheelGroup.add(hub);

  torus = wheelGroup;

  // Lights
  const pointLight = new THREE.PointLight(0xffffff, 100);
  pointLight.position.set(10, 10, 10);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  const blueLight = new THREE.PointLight(0x0066ff, 50);
  blueLight.position.set(-10, -10, 10);
  scene.add(pointLight, ambientLight, blueLight);

  // Particles
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 3000;
  const posArray = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const starMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.5 });
  particles = new THREE.Points(starGeometry, starMaterial);
  scene.add(particles);

  camera.position.z = 30;

  console.log('Three.js Scene initialized');
  animate();
};

const animate = () => {
  requestAnimationFrame(animate);

  if (torus) {
    torus.rotation.x += 0.005;
    torus.rotation.y += 0.003;
    torus.rotation.z += 0.01;
  }

  if (particles) {
    particles.rotation.y += 0.0005;
  }

  renderer.render(scene, camera);
};

const updateCamera = (scrollY: number) => {
  if (camera) {
    camera.position.z = 30 - scrollY * 0.02;
    camera.rotation.y = scrollY * 0.0005;
  }
  if (torus) {
    torus.position.y = -scrollY * 0.005;
  }
};

const onWindowResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

onMounted(() => {
  init();
  window.addEventListener('resize', onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  if (renderer) renderer.dispose();
});

defineExpose({
  updateCamera
});
</script>

<template>
  <canvas ref="canvasRef" class="three-canvas"></canvas>
</template>

<style scoped>
.three-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0; /* 背景として機能しつつ、bodyの背景色より前に出す */
  pointer-events: none;
  display: block;
}
</style>

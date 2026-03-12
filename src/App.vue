<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Header from './components/Header.vue';
import ThreeScene from './components/ThreeScene.vue';

const threeSceneRef = ref<any>(null);

const handleScroll = () => {
  if (threeSceneRef.value) {
    threeSceneRef.value.updateCamera(window.scrollY);
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <ThreeScene ref="threeSceneRef" />
  <Header />
  <router-view />
</template>

<style>
:root {
  background-color: #000;
  color-scheme: dark;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: #000;
}

html {
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
}

/* Page transitions could be added here */
</style>

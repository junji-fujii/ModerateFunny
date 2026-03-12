<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav :class="['nav-bar', { 'nav-scrolled': isScrolled }]">
    <router-link to="/" class="logo">Moderate Funny</router-link>
    <div class="nav-links">
      <router-link to="/about">チーム内容</router-link>
      <router-link to="/news">お知らせ</router-link>
      <router-link to="/activity">活動記録</router-link>
      <router-link to="/recruit" class="cta-btn">メンバー募集</router-link>
    </div>
  </nav>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 30px 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.nav-scrolled {
  padding: 15px 10%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: 2px;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 40px;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  opacity: 1;
}

.nav-links a.router-link-active:not(.logo) {
  color: #ff3e00;
}

.cta-btn {
  background: #ff3e00;
  padding: 10px 25px !important;
  border-radius: 50px;
  opacity: 1 !important;
  transition: transform 0.3s ease !important;
  color: #fff !important;
}

.cta-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(255, 62, 0, 0.4);
}

@media (max-width: 768px) {
  .nav-links {
    gap: 20px;
  }
  .nav-links a:not(.cta-btn) {
    display: none;
  }
}
</style>

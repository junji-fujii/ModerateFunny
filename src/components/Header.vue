<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav :class="['nav-bar', { 'nav-scrolled': isScrolled, 'nav-open': isMenuOpen }]">
    <router-link to="/" class="logo" @click="closeMenu">Moderate Funny</router-link>
    
    <div class="hamburger" :class="{ 'active': isMenuOpen }" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="nav-links" :class="{ 'active': isMenuOpen }">
      <router-link to="/about" @click="closeMenu">チーム内容</router-link>
      <router-link to="/news" @click="closeMenu">お知らせ</router-link>
      <router-link to="/activity" @click="closeMenu">活動記録</router-link>
      <router-link to="/recruit" class="cta-btn" @click="closeMenu">メンバー募集</router-link>
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
  position: relative;
  z-index: 1001;
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

/* Hamburger Styles */
.hamburger {
  display: none;
  cursor: pointer;
  z-index: 1001;
  width: 30px;
  height: 20px;
  position: relative;
}

.hamburger span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}

.hamburger span:nth-child(1) { top: 0px; }
.hamburger span:nth-child(2) { top: 9px; }
.hamburger span:nth-child(3) { top: 18px; }

.hamburger.active span:nth-child(1) {
  top: 9px;
  transform: rotate(135deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.hamburger.active span:nth-child(3) {
  top: 9px;
  transform: rotate(-135deg);
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-bar {
    padding: 20px 5%;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    transition: 0.3s ease-in-out;
    z-index: 1000;
  }

  .nav-links.active {
    right: 0;
  }

  .nav-links a {
    font-size: 1.2rem;
  }

  .cta-btn {
    width: auto;
    text-align: center;
  }
}
</style>

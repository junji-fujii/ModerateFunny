<script setup lang="ts">
import { ref, onMounted } from 'vue';

const newsItems = ref<any[]>([]);

onMounted(async () => {
  try {
    const res = await fetch('https://raw.githubusercontent.com/junji-fujii/ModerateFunny/main/public/data/news.json');
    newsItems.value = await res.json();
  } catch (error) {
    console.error('Error fetching news:', error);
  }
});
</script>

<template>
  <div class="page-container">
    <section class="content-section">
      <h2 class="section-title">お知らせ</h2>
      <div class="card glass">
        <div class="news-list">
          <router-link 
            v-for="item in newsItems" 
            :key="item.id" 
            :to="'/news/' + item.id"
            class="news-item"
          >
            <div class="news-thumb-container" v-if="item.image">
              <img :src="item.image" :alt="item.title" class="news-thumb" />
            </div>
            <div class="news-main-info">
              <div class="news-meta-row">
                <span class="news-date">{{ item.date }}</span>
                <span class="news-cat">{{ item.category }}</span>
              </div>
              <span class="news-title">{{ item.title }}</span>
            </div>
            <span class="news-arrow">→</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-container { padding-top: 100px; min-height: 100vh; }
.content-section { max-width: 1000px; margin: 0 auto; padding: 40px 20px; }
.section-title { font-size: 3rem; color: #ff3e00; margin-bottom: 40px; }
.card { padding: 40px; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); }
.glass { background: rgba(0, 0, 0, 0.4); }
.news-list { display: flex; flex-direction: column; gap: 10px; }

.news-item { 
  display: grid; 
  grid-template-columns: 120px 1fr 30px; 
  gap: 25px; 
  padding: 20px; 
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
  align-items: center; 
  text-decoration: none;
  color: #fff;
  transition: 0.3s;
  border-radius: 15px;
}

.news-item:hover {
  background: rgba(255, 62, 0, 0.1);
  transform: translateX(10px);
}

.news-thumb-container {
  width: 120px;
  height: 80px;
  overflow: hidden;
  border-radius: 8px;
}

.news-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-main-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.news-meta-row {
  display: flex;
  gap: 15px;
  align-items: center;
}

.news-date { opacity: 0.5; font-family: monospace; font-size: 0.9rem; }
.news-cat { background: #ff3e00; text-align: center; font-size: 0.7rem; padding: 2px 8px; border-radius: 4px; }
.news-title { font-weight: 500; font-size: 1.1rem; }
.news-arrow { opacity: 0; transition: 0.3s; text-align: right; font-size: 1.2rem; }
.news-item:hover .news-arrow { opacity: 1; }

@media (max-width: 768px) { 
  .news-item { grid-template-columns: 100px 1fr; gap: 15px; } 
  .news-arrow { display: none; }
  .news-thumb-container { width: 100px; height: 70px; }
}
</style>

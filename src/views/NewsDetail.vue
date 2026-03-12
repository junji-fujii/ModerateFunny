<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const newsId = Number(route.params.id);
const allNews = ref<any[]>([]);

onMounted(async () => {
  try {
    const res = await fetch('/data/news.json');
    allNews.value = await res.json();
  } catch (error) {
    console.error('Error fetching news detail:', error);
  }
});

const newsItem = computed(() => allNews.value.find(item => item.id === newsId));

const goBack = () => {
  router.push('/news');
};
</script>

<template>
  <div class="page-container">
    <section class="content-section" v-if="newsItem">
      <div class="meta">
        <button @click="goBack" class="back-btn">← Back to News</button>
        <span class="news-date">{{ newsItem.date }}</span>
      </div>
      <h2 class="news-title">{{ newsItem.title }}</h2>
      <div class="card glass">
        <div class="news-image-container" v-if="newsItem.image">
          <img :src="newsItem.image" :alt="newsItem.title" class="news-image" />
        </div>
        <span class="news-cat">{{ newsItem.category }}</span>
        <div class="news-content">
          <p>{{ newsItem.content }}</p>
        </div>
      </div>
    </section>
    <section class="content-section" v-else-if="allNews.length > 0">
      <p>ニュースが見つかりませんでした。</p>
      <button @click="goBack" class="back-btn">← News一覧へ</button>
    </section>
  </div>
</template>

<style scoped>
.page-container { padding-top: 100px; min-height: 100vh; }
.content-section { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
.meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.back-btn { background: transparent; border: 1px solid rgba(255, 255, 255, 0.3); color: #fff; padding: 5px 15px; border-radius: 20px; cursor: pointer; transition: 0.3s; }
.back-btn:hover { background: rgba(255, 255, 255, 0.1); border-color: #fff; }
.news-date { opacity: 0.5; font-family: monospace; }
.news-title { font-size: 2.5rem; margin-bottom: 30px; line-height: 1.2; }
.card { padding: 40px; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); }
.glass { background: rgba(0, 0, 0, 0.4); }

.news-image-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 15px;
  margin-bottom: 30px;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-cat { display: inline-block; background: #ff3e00; font-size: 0.8rem; padding: 4px 12px; border-radius: 4px; margin-bottom: 20px; }
.news-content { line-height: 2; font-size: 1.1rem; color: rgba(255, 255, 255, 0.9); }

@media (max-width: 768px) { 
  .news-title { font-size: 1.8rem; } 
  .news-image-container { height: 250px; }
}
</style>

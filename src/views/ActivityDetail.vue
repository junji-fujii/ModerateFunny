<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const activityId = Number(route.params.id);
const allActivities = ref<any[]>([]);

onMounted(async () => {
  try {
    const res = await fetch('https://raw.githubusercontent.com/junji-fujii/ModerateFunny/main/public/data/activities.json');
    allActivities.value = await res.json();
  } catch (error) {
    console.error('Error fetching activity detail:', error);
  }
});

const activity = computed(() => allActivities.value.find(item => item.id === activityId));

const goBack = () => {
  router.push('/activity');
};
</script>

<template>
  <div class="page-container">
    <section class="content-section" v-if="activity">
      <div class="meta">
        <button @click="goBack" class="back-btn">← Back to Activities</button>
        <div class="activity-meta-info">
          <span>📅 {{ activity.date }}</span>
          <span>🚲 {{ activity.distance }}</span>
        </div>
      </div>
      <h2 class="activity-title">{{ activity.title }}</h2>
      <div class="card glass">
        <div class="activity-image-container" v-if="activity.image">
          <img :src="activity.image" :alt="activity.title" class="activity-image" />
        </div>
        <div class="activity-content">
          <p>{{ activity.content }}</p>
        </div>
      </div>
    </section>
    <section class="content-section" v-else-if="allActivities.length > 0">
      <p>活動記録が見つかりませんでした。</p>
      <button @click="goBack" class="back-btn">← 一覧へ</button>
    </section>
  </div>
</template>

<style scoped>
.page-container { padding-top: 100px; min-height: 100vh; }
.content-section { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
.meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.back-btn { background: transparent; border: 1px solid rgba(255, 255, 255, 0.3); color: #fff; padding: 5px 15px; border-radius: 20px; cursor: pointer; transition: 0.3s; }
.back-btn:hover { background: rgba(255, 255, 255, 0.1); border-color: #fff; }
.activity-meta-info { display: flex; gap: 20px; font-size: 0.9rem; opacity: 0.6; }
.activity-title { font-size: 2.5rem; margin-bottom: 30px; line-height: 1.2; color: #ff3e00; }
.card { padding: 40px; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); }
.glass { background: rgba(0, 0, 0, 0.4); }

.activity-image-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 15px;
  margin-bottom: 30px;
}

.activity-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.activity-content { line-height: 2; font-size: 1.1rem; color: rgba(255, 255, 255, 0.9); }

@media (max-width: 768px) { 
  .activity-title { font-size: 1.8rem; } 
  .activity-image-container { height: 250px; }
  .meta { flex-direction: column; align-items: flex-start; gap: 15px; }
}
</style>

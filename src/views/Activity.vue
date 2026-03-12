<script setup lang="ts">
import { ref, onMounted } from 'vue';

const activities = ref<any[]>([]);

onMounted(async () => {
  try {
    const res = await fetch('https://raw.githubusercontent.com/junji-fujii/ModerateFunny/main/public/data/activities.json');
    const data = await res.json();
    activities.value = data.sort((a: any, b: any) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching activities:', error);
  }
});
</script>

<template>
  <div class="page-container">
    <section class="content-section">
      <h2 class="section-title">活動記録</h2>
      <div class="activity-grid">
        <router-link 
          v-for="activity in activities" 
          :key="activity.id" 
          :to="'/activity/' + activity.id"
          class="activity-card-link"
        >
          <div class="card glass">
            <div class="activity-thumb-container" v-if="activity.image">
              <img :src="activity.image" :alt="activity.title" class="activity-thumb" />
            </div>
            <div class="activity-info">
              <h3>{{ activity.title }}</h3>
              <p class="activity-meta">
                <span>📅 {{ activity.date }}</span>
                <span>🚲 {{ activity.distance }}</span>
              </p>
              <p class="description">{{ activity.description }}</p>
              <span class="read-more">Read More →</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-container { padding-top: 100px; min-height: 100vh; }
.content-section { max-width: 1000px; margin: 0 auto; padding: 40px 20px; }
.section-title { font-size: 3rem; color: #ff3e00; margin-bottom: 40px; }
.activity-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }

.activity-card-link {
  text-decoration: none;
  color: #fff;
  transition: transform 0.3s ease;
}

.card { 
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(20px); 
  border-radius: 20px; 
  border: 1px solid rgba(255, 255, 255, 0.1); 
  overflow: hidden;
  transition: all 0.3s ease;
}

.activity-card-link:hover .card { 
  transform: translateY(-10px); 
  background: rgba(255, 62, 0, 0.1); 
  border-color: #ff3e00;
}

.activity-thumb-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.activity-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.activity-card-link:hover .activity-thumb {
  transform: scale(1.1);
}

.activity-info {
  padding: 25px;
}

.glass { background: rgba(0, 0, 0, 0.4); }
h3 { margin-bottom: 10px; color: #fff; }
.activity-meta { display: flex; gap: 20px; font-size: 0.8rem; opacity: 0.6; margin-bottom: 15px; }
.description { line-height: 1.6; opacity: 0.8; font-size: 0.95rem; margin-bottom: 20px; }

.read-more {
  display: inline-block;
  color: #ff3e00;
  font-weight: 800;
  font-size: 0.9rem;
  text-transform: uppercase;
}
</style>

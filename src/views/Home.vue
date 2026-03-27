<script setup lang="ts">
import { ref, onMounted } from 'vue';

const latestNews = ref<any[]>([]);
const displaySchedules = ref<any[]>([]);

onMounted(async () => {
  try {
    const [newsRes, scheduleRes] = await Promise.all([
      fetch('https://raw.githubusercontent.com/junji-fujii/ModerateFunny/main/public/data/news.json'),
      fetch('https://raw.githubusercontent.com/junji-fujii/ModerateFunny/main/public/data/schedules.json')
    ]);
    
    const newsData = await newsRes.json();
    const scheduleData = await scheduleRes.json();
    
    latestNews.value = newsData.slice(0, 3);
    displaySchedules.value = scheduleData.slice(0, 3);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <main class="content">
    <section class="hero">
      <div class="hero-content">
        <h1 class="title">Moderate Funny</h1>
        <p class="subtitle">Road Bike Racing Team</p>
        <div class="cta-group">
          <router-link to="/about" class="explore-btn">Explore Team</router-link>
        </div>
      </div>
    </section>

    <!-- Schedule Section -->
    <section class="schedule-section">
      <div class="card glass">
        <div class="section-header">
          <h2 class="sub-title">Schedule</h2>
          <span class="next-ride-badge" v-if="displaySchedules.length > 0">
            Next Ride: {{ displaySchedules[0]?.date }}
          </span>
        </div>
        <div class="schedule-table">
          <div v-for="ride in displaySchedules" :key="ride.id" class="schedule-row">
            <div class="ride-date">{{ ride.date }}</div>
            <div class="ride-title">{{ ride.title }}</div>
            <div class="ride-info">
              <span class="info-item">⏰ {{ ride.time }}</span>
              <span class="info-item">📍 {{ ride.place }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="latest-news">
      <div class="card glass">
        <div class="section-header">
          <h2 class="sub-title">Latest News</h2>
          <router-link to="/news" class="view-all">View All →</router-link>
        </div>
        <div class="news-list">
          <router-link 
            v-for="item in latestNews" 
            :key="item.id" 
            :to="'/news/' + item.id"
            class="news-row"
          >
            <span class="news-date">{{ item.date }}</span>
            <span class="news-cat">{{ item.category }}</span>
            <span class="news-label">{{ item.title }}</span>
            <span class="news-arrow">→</span>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.content {
  position: relative;
  z-index: 1;
  color: #fff;
  font-family: 'Inter', sans-serif;
}

.hero {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-size: clamp(4rem, 15vw, 10rem);
  font-weight: 900;
  margin: 0;
  letter-spacing: -2px;
  background: linear-gradient(180deg, #fff 0%, #ff3e00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
  opacity: 0.7;
  letter-spacing: 10px;
  text-transform: uppercase;
  margin-top: 20px;
}

.cta-group {
  margin-top: 50px;
}

.explore-btn {
  display: inline-block;
  padding: 15px 40px;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  background: #fff;
  color: #000;
  border-color: #fff;
}

/* Schedule Section Styles */
.schedule-section {
  padding: 60px 10%;
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 768px) {
  .schedule-section {
    padding: 30px 5%;
  }
}

.next-ride-badge {
  background: rgba(255, 62, 0, 0.2);
  color: #ff3e00;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: bold;
  border: 1px solid #ff3e00;
}
@media screen and (max-width: 768px) {
  .next-ride-badge {
    display: inline-block;
  }
}

.schedule-table {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.schedule-row {
  display: grid;
  grid-template-columns: 120px 1fr 1fr;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
}

.schedule-row:last-child {
  border-bottom: none;
}

.ride-date {
  font-weight: 800;
  color: #ff3e00;
}

.ride-title {
  font-weight: 600;
  font-size: 1.1rem;
}

.ride-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.9rem;
  opacity: 0.8;
}

.latest-news {
  padding: 60px 10% 100px 10%;
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 768px) {
  .latest-news {
    padding: 30px 5% 100px 5%;
  }
}

.sub-title {
  font-size: 2rem;
  color: #ff3e00;
  margin: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 62, 0, 0.3);
}
@media screen and (max-width: 768px) {
  .section-header {
    display: block;
    margin-bottom: 15px;
  }
}

.view-all {
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.6;
  transition: opacity 0.3s;
}
@media screen and (max-width: 768px) {
  .view-all {
    display: inline-block;
  }
}

.view-all:hover {
  opacity: 1;
}

.card {
  width: 100%;
  max-width: 1000px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
@media screen and (max-width: 768px) {
  .card {
    padding: 20px;
  }
}

.glass {
  background: rgba(0, 0, 0, 0.4);
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-row {
  display: grid;
  grid-template-columns: 120px 100px 1fr 30px;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s ease;
}

.news-row:hover {
  padding-left: 10px;
  background: rgba(255, 62, 0, 0.1);
}

.news-row:last-child {
  border-bottom: none;
}

.news-date {
  opacity: 0.5;
  font-family: monospace;
}

.news-cat {
  background: #ff3e00;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 4px;
  text-align: center;
}

.news-label {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-arrow {
  opacity: 0;
  transition: 0.3s;
}

.news-row:hover .news-arrow {
  opacity: 1;
}

@media (max-width: 768px) {
  .schedule-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .news-row {
    grid-template-columns: 1fr;
    gap: 5px;
  }
  .news-arrow { display: none; }
}
</style>

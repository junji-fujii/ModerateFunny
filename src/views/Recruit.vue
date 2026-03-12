<script setup lang="ts">
// No complex form logic needed, just a simple link
const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfanQ7ifOUZYK0IzMuyi4Jn5-beNXc4I7PC_Lm4enQqZlKSiQ/viewform";
</script>

<template>
  <div class="page-container">
    <section class="content-section">
      <h2 class="section-title">メンバー募集</h2>

      <div class="card glass highlight main-info">
        <p class="intro-text">Moderate Funnyでは、共に高め合える新しい仲間を募集しています。</p>
        
        <div class="recruit-info">
          <div class="info-block">
            <h3>求める人物像</h3>
            <ul>
              <li>自転車が大好きで、情熱を持っている方</li>
              <li>チームのルールを守り、安全に走行できる方</li>
              <li>レースに興味がある、または既に参戦している方（初心者も歓迎！）</li>
            </ul>
          </div>

          <div class="info-block">
            <h3>活動内容</h3>
            <ul>
              <li>週末の定期練習会（土曜日もしくは日曜日）</li>
              <li>ホビーレースへの参戦</li>
            </ul>
          </div>
        </div>

        <div class="action-area">
          <p class="guide-text">入部希望や体験ライドへの参加は、下記のGoogleフォームよりお申し込みください。</p>
          <a :href="googleFormUrl" target="_blank" rel="noopener noreferrer" class="recruit-btn">
            Googleフォームで申し込む
          </a>
          <p class="note">※外部サイト（Googleフォーム）へ遷移します</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-container { padding-top: 100px; min-height: 100vh; }
.content-section { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
.section-title { font-size: 3rem; color: #ff3e00; margin-bottom: 40px; text-align: center; font-weight: 900; }

.card { padding: 40px; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border-radius: 30px; border: 1px solid rgba(255, 255, 255, 0.1); }
.glass { background: rgba(0, 0, 0, 0.4); }
.highlight { border-color: #ff3e00; box-shadow: 0 0 30px rgba(255, 62, 0, 0.1); }

.intro-text { font-size: 1.3rem; margin-bottom: 40px; text-align: center; color: #fff; }
.recruit-info { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
.info-block h3 { color: #ff3e00; margin-bottom: 20px; font-size: 1.4rem; font-weight: 800; }
ul { padding-left: 20px; opacity: 0.9; }
li { margin-bottom: 12px; line-height: 1.6; }

.action-area { text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 40px; }
.guide-text { margin-bottom: 25px; font-size: 1.1rem; opacity: 0.9; }

.recruit-btn {
  display: inline-block;
  background: #ff3e00;
  color: #fff;
  border: none;
  padding: 18px 50px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s;
  cursor: pointer;
}

.recruit-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(255, 62, 0, 0.5);
}

.note {
  margin-top: 15px;
  font-size: 0.8rem;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .recruit-info { grid-template-columns: 1fr; }
  .section-title { font-size: 2.2rem; }
  .card { padding: 25px; }
}
</style>

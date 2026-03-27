<template>
  <div class="page-container">
    <section class="content-section">
      <h2 class="section-title">チーム内容</h2>
      <div class="card glass">
        <p>Moderate Funnyは、2026年に結成されたロードバイクレーシングチームです。神奈川、東京都を中心に活動しており、20代から50代まで幅広い層のメンバーが在籍しています。</p>
        <p>「楽しく、速く」をモットーに、レースへの参戦から、週末のカフェライドまで、それぞれのスタイルで自転車を楽しんでいます。</p>
        <div class="team-values">
          <div class="value-item">
            <h3>Mission</h3>
            <p>サイクリングを通じて心身の健康とコミュニティの発展に貢献する。</p>
          </div>
          <div class="value-item">
            <h3>Vision</h3>
            <p>誰もが安全に、かつ真剣に走れる環境を創造する。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-container {
  padding-top: 100px;
  min-height: 100vh;
}
.content-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}
.section-title {
  font-size: 3rem;
  color: #ff3e00;
  margin-bottom: 40px;
}
.card {
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
@media screen and (max-width: 768px) {
  .card {
    padding: 20px;
  }
}
.glass { background: rgba(0, 0, 0, 0.4); }
p { font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; }
.team-values { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 40px; }
@media screen and (max-width: 768px) {
  .team-values {
    display: block;
  }
}
@media screen and (max-width: 768px) {
  .value-item:not(:first-child) {
    margin-top: 1em;
  }
}
.value-item h3 { color: #ff3e00; margin-bottom: 15px; }
</style>

<template>
  <div class="dashboard-container">
    <header class="header">
      <div class="title">意图算力网络编排系统</div>
      <div class="stats">
        <span>总算力: <b class="num">12.5</b> PFLOPS</span>
        <span>在线节点: <b class="num">850</b>/1000</span>
      </div>
      <div class="weather">CPU: 78% | 宽带: 500 Gbps</div>
    </header>

    <main class="main-grid">
      <aside class="left-panel">
        <TaskProgress class="panel-item h-40" />
        <HistoryExperiments class="panel-item h-60" />
      </aside>

      <section class="center-panel">
        <MapContainer class="map-area" />
        <InteractionArea class="chat-area" />
      </section>

      <aside class="right-panel">
        <AnalysisBoard class="panel-item h-70" />
        <ActionButtons class="panel-item h-30" />
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
// 引入所有业务组件
import TaskProgress from './components/LeftPanel/TaskProgress.vue';
import HistoryExperiments from './components/LeftPanel/HistoryExperiments.vue';
import MapContainer from './components/CenterPanel/MapContainer.vue';
import InteractionArea from './components/BottomPanel/InteractionArea.vue';
import AnalysisBoard from './components/RightPanel/AnalysisBoard.vue';
import ActionButtons from './components/RightPanel/ActionButtons.vue';
</script>

<style scoped>
.dashboard-container {
  width: 100vw;
  height: 100vh;
  /* 这里的背景图如果不存在，会自动回退到深色背景 */
  background: linear-gradient(rgba(11, 17, 32, 0.9), rgba(11, 17, 32, 0.9)), url('@/assets/images/bg_grid.png');
  background-size: cover;
  background-color: #0b1120;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: white;
}

.header {
  height: 60px;
  background: rgba(13, 27, 42, 0.9);
  border-bottom: 2px solid #2196f3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 0 15px rgba(33, 150, 243, 0.4);
  z-index: 10;
}

.title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 0 10px #00d8ff;
}

.stats .num {
  color: #00d8ff;
  font-family: 'DIN Alternate', sans-serif;
  font-size: 20px;
  margin: 0 5px;
}

.main-grid {
  flex: 1;
  padding: 10px;
  display: grid;
  grid-template-columns: 350px 1fr 350px; /* 左-中-右 布局 */
  gap: 10px;
  overflow: hidden;
}

.left-panel, .right-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0; /* 防止Flex子项溢出 */
}

.center-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

/* 布局比例类 */
.panel-item { width: 100%; }
.h-30 { flex: 3; }
.h-40 { flex: 4; }
.h-60 { flex: 6; }
.h-70 { flex: 7; }

/* 中间区域特殊比例 */
.map-area {
  flex: 2; /* 地图占 2/3 */
  border: 1px solid rgba(33, 150, 243, 0.3);
  position: relative;
}
.chat-area {
  flex: 1; /* 对话占 1/3 */
  min-height: 200px;
}
</style>







<!-- <template>
  <div class="dashboard-container">
    <header class="header">
      <div class="title">✅ 系统启动成功</div>
      <div class="sub">如果看到这个蓝色界面，说明环境修好了！</div>
    </header>

    <main class="main-grid">
      <aside class="panel left-panel">
        <div class="placeholder-box">
          <h3>左侧区域</h3>
          <p>等待加载...</p>
        </div>
      </aside>

      <section class="panel center-panel">
        <div class="placeholder-box map-box">
          <h3>中间地图</h3>
          <p>等待加载...</p>
        </div>
        <div class="placeholder-box chat-box">
          <h3>底部对话</h3>
          <p>等待加载...</p>
        </div>
      </section>

      <aside class="panel right-panel">
        <div class="placeholder-box">
          <h3>右侧区域</h3>
          <p>等待加载...</p>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
// 暂时不引入任何子组件，确保零报错
console.log('🚀 [Dashboard] Skeleton loaded')
</script>

<style scoped>
/* 确保背景有颜色 */
.dashboard-container {
  width: 100vw;
  height: 100vh;
  background-color: #0b1120; /* 深蓝背景 */
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 60px;
  background: rgba(13, 27, 42, 0.9);
  border-bottom: 2px solid #00d8ff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
}
.title { font-size: 24px; font-weight: bold; color: #00d8ff; }

.main-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 350px 1fr 350px; /* 经典布局 */
  gap: 10px;
  padding: 10px;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.placeholder-box {
  border: 1px dashed rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.map-box { flex: 2; border-color: #2196f3; }
.chat-box { flex: 1; border-color: #4caf50; }
</style> -->
{
<template>
  <div class="dashboard-container">
    <div class="global-frame">
      <div class="corner top-left"></div>
      <div class="corner top-right"></div>
      <div class="corner bottom-left"></div>
      <div class="corner bottom-right"></div>
      <div class="side-line left"></div>
      <div class="side-line right"></div>
    </div>

    <HeaderPanel />

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
// ✅ 修复点2：取消注释，引入 HeaderPanel 组件
import HeaderPanel from './components/TopPanel/HeaderPanel.vue';

// 引入其他业务组件
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
  /* 深蓝科技背景 + 网格纹理 */
  background: radial-gradient(circle at center, #1b2735 0%, #090a0f 100%);
  background-size: cover;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: white;
  padding: 10px; /* 给全局边框留出空隙 */
  position: relative;
}

/* --- 全局科技边框装饰 --- */
.global-frame {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; /* 确保不阻挡鼠标点击 */
  z-index: 0; /* 放在最底层 */
}

/* 四角折线通用样式 */
.corner {
  position: absolute;
  width: 30px; height: 30px;
  border: 3px solid #00d8ff;
  box-shadow: 0 0 10px #00d8ff;
  opacity: 0.8;
}
.top-left { top: 10px; left: 10px; border-right: 0; border-bottom: 0; }
.top-right { top: 10px; right: 10px; border-left: 0; border-bottom: 0; }
.bottom-left { bottom: 10px; left: 10px; border-right: 0; border-top: 0; }
.bottom-right { bottom: 10px; right: 10px; border-left: 0; border-top: 0; }

/* 两侧装饰线条 */
.side-line {
  position: absolute; top: 20%; height: 60%; width: 2px;
  background: linear-gradient(to bottom, transparent, rgba(0,216,255,0.3), transparent);
}
.side-line.left { left: 5px; }
.side-line.right { right: 5px; }

/* --- 布局调整 --- */
.main-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 350px 1fr 350px;
  gap: 15px;
  overflow: hidden;
  z-index: 1; /* 确保内容在装饰层之上 */
  margin-top: 5px;
}

.left-panel, .right-panel, .center-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

/* 比例类 */
.panel-item { width: 100%; }
.h-30 { flex: 3; }
.h-40 { flex: 4; }
.h-60 { flex: 6; }
.h-70 { flex: 7; }

/* 中间区域比例 */
.map-area {
  flex: 2; /* 地图占更大比例 */
  border: 1px solid rgba(0, 216, 255, 0.2);
  box-shadow: inset 0 0 20px rgba(0, 216, 255, 0.05);
}
.chat-area {
  flex: 1;
  min-height: 200px;
}
</style>
}
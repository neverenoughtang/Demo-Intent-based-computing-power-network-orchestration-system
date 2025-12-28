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
        <TaskProgress class="panel-item h-40 tech-panel-glow" />
        <HistoryExperiments class="panel-item h-60 tech-panel-glow" />
      </aside>

      <section class="center-panel">
        <MapContainer class="map-area tech-panel-glow" />
        <InteractionArea class="chat-area tech-panel-glow" />
      </section>

      <aside class="right-panel">
        <ResourceMonitor class="panel-item flex-1 tech-panel-glow" />
        <NetworkHealth class="panel-item flex-1 tech-panel-glow" />
        <StrategyExecution class="panel-item flex-1 tech-panel-glow" />
        <ActionButtons class="panel-item flex-1 tech-panel-glow" />
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
// ✅ 修复引用：确保 HeaderPanel 处于激活状态
import HeaderPanel from './components/TopPanel/HeaderPanel.vue';

// 左侧 & 中间组件
import TaskProgress from './components/LeftPanel/TaskProgress.vue';
import HistoryExperiments from './components/LeftPanel/HistoryExperiments.vue';
import MapContainer from './components/CenterPanel/MapContainer.vue';
import InteractionArea from './components/BottomPanel/InteractionArea.vue';

// ✅ 右侧组件：引入新拆分的4个文件
// 注意：请确保这4个文件在 components/RightPanel/ 目录下真实存在
import ResourceMonitor from './components/RightPanel/ResourceMonitor.vue';
import NetworkHealth from './components/RightPanel/NetworkHealth.vue';     // 新增
import StrategyExecution from './components/RightPanel/StrategyExecution.vue'; // 新增
import ActionButtons from './components/RightPanel/ActionButtons.vue';
</script>

<style scoped>
.dashboard-container {
  width: 100vw; height: 100vh;
  background: radial-gradient(circle at center, #1b2735 0%, #090a0f 100%);
  display: flex; flex-direction: column; overflow: hidden;
  color: white; padding: 10px; position: relative;
  font-size: 18px; /* 全局字体增大 */
}

/* 装饰层保持不变 */
.global-frame { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
.corner { position: absolute; width: 30px; height: 30px; border: 3px solid #00d8ff; box-shadow: 0 0 10px #00d8ff; opacity: 0.8; }
.top-left { top: 10px; left: 10px; border-right: 0; border-bottom: 0; }
.top-right { top: 10px; right: 10px; border-left: 0; border-bottom: 0; }
.bottom-left { bottom: 10px; left: 10px; border-right: 0; border-top: 0; }
.bottom-right { bottom: 10px; right: 10px; border-left: 0; border-top: 0; }
.side-line { position: absolute; top: 20%; height: 60%; width: 2px; background: linear-gradient(to bottom, transparent, rgba(0,216,255,0.3), transparent); }
.side-line.left { left: 5px; } .side-line.right { right: 5px; }

/* 布局调整 */
.main-grid {
  flex: 1; display: grid; grid-template-columns: 350px 1fr 350px;
  gap: 15px; overflow: hidden; z-index: 1; margin-top: 5px;
}

.left-panel, .right-panel, .center-panel {
  display: flex; flex-direction: column; gap: 10px; 
  height: 100%; overflow: hidden;
}

/* 面板通用样式 */
.panel-item { width: 100%; min-height: 0; display: flex; flex-direction: column; }

/* 比例控制 */
.h-40 { flex: 4; } 
.h-60 { flex: 6; }
/* ✅ 右侧使用 flex-1 均分高度 */
.flex-1 { flex: 1; }

.map-area { flex: 2; }
.chat-area { flex: 1; min-height: 250px; background: #0d141f; }

/* 统一发光边框 */
.tech-panel-glow {
  background: rgba(10, 16, 26, 0.6);
  border: 1px solid rgba(0, 216, 255, 0.4);
  box-shadow: inset 0 0 20px rgba(0, 216, 255, 0.1), 0 0 15px rgba(0, 216, 255, 0.1);
  border-radius: 4px; position: relative; backdrop-filter: blur(2px);
}
</style>
<template>
  <div class="header-wrapper">
    <div class="header-box left-box">
      <div class="box-content">
        <span class="main-title">意图算力网络编排系统</span>
      </div>
      <div class="deco-line"></div>
    </div>

    <div class="header-box center-box">
      <div class="box-content">
        <div class="stat-item">
          <span class="label">总算力:</span>
          <span class="value">12.5</span>
          <span class="unit">PFLOPS</span>
        </div>
        <div class="divider"></div>
        <div class="stat-item">
          <span class="label">在线节点:</span>
          <span class="value highlight">850</span>
          <span class="unit">/1000</span>
        </div>
      </div>
      <div class="bottom-glow"></div>
    </div>

    <div class="header-box right-box">
      <div class="box-content">
        <span class="label">当前场景：</span>
        <div class="scenario-badge" :class="store.currentScenario">
          <el-icon class="icon-margin"><Flag /></el-icon>
          {{ store.currentScenario === 'military' ? '军用 (Military)' : '民用 (Civilian)' }}
        </div>
      </div>
      <div class="deco-line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSimulationStore } from '@/store/useSimulationStore';
import { Flag } from '@element-plus/icons-vue';

const store = useSimulationStore();
</script>

<style scoped>
/* 顶栏容器：Flex布局，两端对齐 */
.header-wrapper {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 顶对齐，配合高度差异 */
  padding: 5px 10px 0;
  gap: 15px;
  margin-bottom: 10px;
  z-index: 20; /* 保证在最上层 */
}

/* --- 通用盒子基础样式 --- */
.header-box {
  height: 100%;
  background: rgba(13, 27, 42, 0.85); /* 半透明深蓝底 */
  border: 1px solid rgba(0, 216, 255, 0.3); /* 科技蓝边框 */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: inset 0 0 20px rgba(0, 216, 255, 0.05); /* 内发光 */
  backdrop-filter: blur(5px); /* 毛玻璃效果 */
}

/* 底部装饰细线 */
.deco-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00d8ff, transparent);
}

/* --- [左侧] 梯形设计 --- */
.left-box {
  flex: 3;
  /* 左下直角，右上切角 */
  clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
  border-right: none;
  background: linear-gradient(90deg, rgba(0,216,255,0.15) 0%, rgba(13,27,42,0.8) 50%);
  justify-content: flex-start; /* 内容左对齐 */
}
.main-title {
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 4px;
  color: #fff;
  text-shadow: 0 0 10px #00d8ff; /* 霓虹发光文字 */
  font-style: italic;
  padding-left: 30px;
  font-family: 'Microsoft YaHei', sans-serif;
}

/* --- [中间] 倒梯形设计 --- */
.center-box {
  flex: 4;
  height: 60px; /* 比左右稍矮 */
  /* 倒梯形切割 */
  clip-path: polygon(5% 0, 95% 0, 100% 100%, 0 100%);
  background: rgba(0, 0, 0, 0.6);
  border-top: 3px solid #00d8ff; /* 顶部加强条 */
}
.box-content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.stat-item {
  display: flex;
  align-items: baseline;
}
.stat-item .label { color: #aaa; margin-right: 8px; font-size: 14px; }
.stat-item .value { 
  font-family: 'DIN Alternate', sans-serif; /* 数字字体 */
  font-size: 32px; 
  font-weight: bold;
  color: #fff; 
  text-shadow: 0 0 10px rgba(255,255,255,0.3);
}
.stat-item .value.highlight { color: #00d8ff; text-shadow: 0 0 10px #00d8ff; }
.stat-item .unit { font-size: 12px; color: #888; margin-left: 4px; }
.divider { width: 1px; height: 24px; background: rgba(255,255,255,0.2); margin: 0 30px; }

/* 中间底部的高亮条 */
.bottom-glow {
  position: absolute; bottom: 0; width: 50%; height: 4px;
  background: #00d8ff;
  box-shadow: 0 0 15px #00d8ff;
  border-radius: 2px 2px 0 0;
}

/* --- [右侧] 梯形设计 --- */
.right-box {
  flex: 2;
  /* 左上切角，右下直角 */
  clip-path: polygon(5% 0, 100% 0, 100% 100%, 0% 100%);
  background: linear-gradient(-90deg, rgba(0,216,255,0.15) 0%, rgba(13,27,42,0.8) 50%);
  justify-content: flex-end; /* 内容右对齐 */
  padding-right: 30px;
}
.right-box .label { font-size: 14px; color: #aaa; margin-right: 10px; }

/* 场景标签样式 */
.scenario-badge {
  display: flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}
.icon-margin { margin-right: 6px; }

/* 军用模式样式 */
.scenario-badge.military {
  color: #ff4d4f; 
  border-color: #ff4d4f;
  background: rgba(255, 77, 79, 0.15);
  box-shadow: 0 0 15px rgba(255, 77, 79, 0.4);
  text-shadow: 0 0 5px #ff4d4f;
}
/* 民用模式样式 */
.scenario-badge.civilian {
  color: #00d8ff; 
  border-color: #00d8ff;
  background: rgba(0, 216, 255, 0.15);
  box-shadow: 0 0 15px rgba(0, 216, 255, 0.4);
  text-shadow: 0 0 5px #00d8ff;
}
</style>
<template>
  <div class="strategy-panel">
    <div class="panel-title">
      <span class="decoration">▍</span> 策略执行
    </div>
    
    <div class="strategy-list">
      <div class="strategy-row">
        <span class="label">熔断防护</span>
        <el-progress :percentage="92" :stroke-width="8" color="#00d8ff" striped striped-flow>
          <template #default="{ percentage }"><span class="prog-text">{{ percentage }}%</span></template>
        </el-progress>
      </div>

      <div class="strategy-row">
        <span class="label">流量清洗</span>
        <el-progress :percentage="65" :stroke-width="8" color="#7c4dff" striped striped-flow>
          <template #default="{ percentage }"><span class="prog-text">{{ percentage }}%</span></template>
        </el-progress>
      </div>

      <div class="strategy-row">
        <span class="label">自动扩容</span>
        <el-progress :percentage="40" :stroke-width="8" color="#00e676" striped>
          <template #default="{ percentage }"><span class="prog-text">{{ percentage }}%</span></template>
        </el-progress>
      </div>

      <div class="strategy-row">
        <span class="label">降级预案</span>
        <el-progress :percentage="25" :stroke-width="8" color="#ffab00">
          <template #default="{ percentage }"><span class="prog-text">{{ percentage }}%</span></template>
        </el-progress>
      </div>
    </div>
  </div>
</template>

<style scoped>
.strategy-panel { display: flex; flex-direction: column; padding: 10px; height: 100%; }
.panel-title { font-size: 16px; font-weight: bold; color: #00d8ff; margin-bottom: 15px; display: flex; align-items: center; }
.decoration { margin-right: 8px; color: #00d8ff; }

.strategy-list { flex: 1; display: flex; flex-direction: column; justify-content: space-around; }
.strategy-row { display: flex; align-items: center; gap: 10px; font-size: 13px; }
.label { width: 60px; color: rgba(255,255,255,0.8); text-align: right; }
.el-progress { flex: 1; }
/* 数字字体优化 */
.prog-text { font-size: 12px; color: #fff; margin-left: 5px; font-family: 'DIN Alternate', sans-serif; }

/* 深度选择器：修改进度条底槽的颜色，让它不那么白 */
:deep(.el-progress-bar__outer) { background-color: rgba(255,255,255,0.1) !important; }
</style>
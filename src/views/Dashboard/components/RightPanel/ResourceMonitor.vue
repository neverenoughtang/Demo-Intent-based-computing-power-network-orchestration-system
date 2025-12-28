<template>
  <div class="resource-monitor">
    <div class="panel-title">
      <span class="decoration">▍</span> 资源负载监控
    </div>
    
    <div class="monitor-content">
      <div class="monitor-item">
        <div class="gauge-container">
          <svg class="spinner" viewBox="0 0 100 100">
            <circle class="path-bg" cx="50" cy="50" r="45"></circle>
            <circle class="path-active" cx="50" cy="50" r="45"></circle>
          </svg>
          <div class="center-data">
            <span class="value cyan">87</span>
            <span class="unit">%</span>
          </div>
        </div>
        <div class="label"><span class="dot cyan"></span>算力 (GPU)</div>
      </div>

      <div class="monitor-item">
        <div class="gauge-container">
          <svg class="spinner reverse" viewBox="0 0 100 100">
            <circle class="path-bg" cx="50" cy="50" r="45"></circle>
            <circle class="path-active orange" cx="50" cy="50" r="45"></circle>
          </svg>
          <div class="center-data">
            <span class="value orange">42</span>
            <span class="unit">%</span>
          </div>
        </div>
        <div class="label"><span class="dot orange"></span>存储 (NAS)</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource-monitor {
  display: flex; flex-direction: column; padding: 15px; height: 100%;
  background: radial-gradient(circle at center, rgba(0,216,255,0.05) 0%, transparent 70%);
}

.panel-title {
  font-size: 1em; font-weight: bold; color: #00d8ff; margin-bottom: 10px;
  display: flex; align-items: center; text-shadow: 0 0 5px rgba(0,216,255,0.5);
}
.decoration { margin-right: 8px; color: #00d8ff; }

.monitor-content {
  flex: 1; display: flex; justify-content: space-around; align-items: center;
}

.monitor-item {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}

/* 仪表盘容器 */
.gauge-container {
  width: 100px; height: 100px; position: relative;
  display: flex; justify-content: center; align-items: center;
}

.center-data {
  position: absolute; display: flex; flex-direction: column; align-items: center;
  z-index: 2;
}
.value { font-size: 24px; font-weight: bold; font-family: 'Impact', sans-serif; letter-spacing: 1px; }
.unit { font-size: 12px; opacity: 0.7; }
.cyan { color: #00d8ff; text-shadow: 0 0 8px rgba(0,216,255,0.6); }
.orange { color: #ffaa00; text-shadow: 0 0 8px rgba(255,170,0,0.6); }

.label {
  font-size: 0.85em; color: rgba(255,255,255,0.8); display: flex; align-items: center; gap: 5px;
}
.dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
.dot.cyan { background: #00d8ff; box-shadow: 0 0 5px #00d8ff; }
.dot.orange { background: #ffaa00; box-shadow: 0 0 5px #ffaa00; }

/* SVG 动画 */
.spinner { width: 100%; height: 100%; animation: rotate 3s linear infinite; }
.spinner.reverse { animation: rotate-rev 4s linear infinite; }

.path-bg {
  fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 4;
}
.path-active {
  fill: none; stroke: #00d8ff; stroke-width: 4; stroke-linecap: round;
  stroke-dasharray: 200; stroke-dashoffset: 80; /* 这里的偏移制造缺口效果 */
  filter: drop-shadow(0 0 2px #00d8ff);
}
.path-active.orange { stroke: #ffaa00; filter: drop-shadow(0 0 2px #ffaa00); }

@keyframes rotate { 100% { transform: rotate(360deg); } }
@keyframes rotate-rev { 100% { transform: rotate(-360deg); } }
</style>
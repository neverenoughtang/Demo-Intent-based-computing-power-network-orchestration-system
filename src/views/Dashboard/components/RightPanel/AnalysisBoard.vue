<template>
  <TechCard title="智能分析">
    <div class="charts-container">
      
      <div class="chart-box h-40">
        <div class="sub-title glow-text">资源负载监控</div>
        <div class="gauges-row">
          <BaseChart :options="cpuGaugeOption" />
          <BaseChart :options="storageGaugeOption" />
        </div>
      </div>

      <div class="chart-box h-35">
        <div class="sub-title glow-text">网络健康度 (丢包/延时)</div>
        <BaseChart :options="radarOption" />
      </div>

      <div class="chart-box h-25">
        <div class="sub-title glow-text">自愈策略执行</div>
        <div class="strategy-list">
          
          <div class="strategy-row">
            <span class="label">熔断防护</span>
            <el-progress :percentage="92" :stroke-width="10" color="#00d8ff" striped striped-flow>
              <template #default="{ percentage }"><span class="prog-text">{{ percentage }}%</span></template>
            </el-progress>
          </div>

          <div class="strategy-row">
            <span class="label">流量清洗</span>
            <el-progress :percentage="65" :stroke-width="10" color="#7c4dff" striped striped-flow>
              <template #default="{ percentage }"><span class="prog-text">{{ percentage }}%</span></template>
            </el-progress>
          </div>

          <div class="strategy-row">
            <span class="label">自动扩容</span>
            <el-progress :percentage="40" :stroke-width="10" color="#00e676" striped>
              <template #default="{ percentage }"><span class="prog-text">{{ percentage }}%</span></template>
            </el-progress>
          </div>

          <div class="strategy-row">
            <span class="label">降级预案</span>
            <el-progress :percentage="25" :stroke-width="10" color="#ffab00">
              <template #default="{ percentage }"><span class="prog-text">{{ percentage }}%</span></template>
            </el-progress>
          </div>

        </div>
      </div>

    </div>
  </TechCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TechCard from '@/components/common/TechCard.vue';
import BaseChart from '@/components/chart/BaseChart.vue';

// --- 图表配置保持不变，仅调整文字颜色 ---
const cpuGaugeOption = computed(() => ({
  series: [{
    type: 'gauge', center: ['50%', '65%'], radius: '90%', startAngle: 180, endAngle: 0,
    min: 0, max: 100, splitNumber: 4,
    itemStyle: { color: '#00d8ff', shadowBlur: 10, shadowColor: '#00d8ff' },
    progress: { show: true, width: 10 },
    pointer: { show: false },
    axisLine: { lineStyle: { width: 10, color: [[1, 'rgba(255,255,255,0.1)']] } },
    axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false },
    detail: { fontSize: 20, offsetCenter: [0, '0%'], valueAnimation: true, formatter: '{value}%', color: '#fff', fontWeight: 'bold' },
    data: [{ value: 78, name: '算力' }],
    title: { offsetCenter: [0, '40%'], fontSize: 12, color: '#00d8ff' }
  }]
}));

const storageGaugeOption = computed(() => ({
  series: [{
    type: 'gauge', center: ['50%', '65%'], radius: '90%', startAngle: 180, endAngle: 0,
    min: 0, max: 100,
    itemStyle: { color: '#2196f3', shadowBlur: 10, shadowColor: '#2196f3' },
    progress: { show: true, width: 10 },
    pointer: { show: false },
    axisLine: { lineStyle: { width: 10, color: [[1, 'rgba(255,255,255,0.1)']] } },
    axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false },
    detail: { fontSize: 20, offsetCenter: [0, '0%'], valueAnimation: true, formatter: '{value}%', color: '#fff', fontWeight: 'bold' },
    data: [{ value: 42, name: '存储' }],
    title: { offsetCenter: [0, '40%'], fontSize: 12, color: '#2196f3' }
  }]
}));

const radarOption = computed(() => ({
  radar: {
    indicator: [
      { name: '延时', max: 100 }, { name: '丢包', max: 100 }, { name: '抖动', max: 100 },
      { name: '带宽', max: 100 }, { name: '拥塞', max: 100 }
    ],
    radius: '65%', splitNumber: 3,
    axisName: { color: '#00d8ff', fontSize: 12, fontWeight: 'bold' }, // 字体加亮
    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
    splitArea: { show: false }
  },
  series: [{
    type: 'radar',
    data: [{
      value: [80, 20, 30, 90, 10],
      name: '当前状态',
      areaStyle: { color: 'rgba(0, 216, 255, 0.4)' },
      lineStyle: { color: '#00d8ff', width: 2 },
      itemStyle: { color: '#00d8ff' }
    }]
  }]
}));
</script>

<style scoped>
.charts-container {
  display: flex; flex-direction: column; height: 100%; gap: 15px; padding: 10px;
}

/* 标题样式升级：更大、更亮、发光 */
.sub-title {
  color: #fff;
  font-size: 16px; /* 字体变大 */
  font-weight: bold;
  margin-bottom: 8px;
  padding-left: 8px;
  border-left: 4px solid var(--tech-primary);
  text-shadow: 0 0 8px rgba(0, 216, 255, 0.6); /* 发光效果 */
  letter-spacing: 1px;
}

.chart-box { display: flex; flex-direction: column; min-height: 0; }
.h-40 { flex: 4; }
.h-35 { flex: 3.5; }
.h-25 { flex: 2.5; }

.gauges-row { display: flex; flex: 1; }

/* 策略列表样式优化 */
.strategy-list {
  display: flex; flex-direction: column; justify-content: space-evenly; flex: 1;
}
.strategy-row {
  display: flex; align-items: center; justify-content: space-between; font-size: 13px;
}
.strategy-row .label {
  width: 70px; color: #e0e0e0; font-weight: 500;
}
.strategy-row .el-progress { flex: 1; }
.prog-text { font-size: 12px; color: #fff; margin-left: 5px; font-family: 'DIN Alternate', sans-serif; }

/* 强制修改进度条底槽颜色 */
:deep(.el-progress-bar__outer) { background-color: rgba(255,255,255,0.08) !important; }
</style>
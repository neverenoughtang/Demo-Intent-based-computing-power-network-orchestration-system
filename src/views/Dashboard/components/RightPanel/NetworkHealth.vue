<template>
  <div class="network-panel">
    <div class="panel-title">
      <span class="decoration">▍</span> 网络健康度分析
    </div>
    <div class="chart-container">
      <BaseChart :options="radarOption" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseChart from '@/components/chart/BaseChart.vue'; // 引入图表基座

// 定义雷达图的配置
const radarOption = computed(() => ({
  radar: {
    // 5个维度指标
    indicator: [
      { name: '延时', max: 100 }, 
      { name: '丢包', max: 100 }, 
      { name: '抖动', max: 100 },
      { name: '带宽', max: 100 }, 
      { name: '拥塞', max: 100 }
    ],
    radius: '65%', // 控制图表大小
    splitNumber: 3,
    axisName: { color: '#00d8ff', fontSize: 12, fontWeight: 'bold' }, // 字体高亮颜色
    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }, // 网格线淡淡的白色
    splitArea: { show: false }
  },
  series: [{
    type: 'radar',
    data: [{
      value: [80, 20, 30, 90, 10], // 这里是模拟数据
      name: '当前状态',
      // 填充区域颜色：半透明蓝
      areaStyle: { color: 'rgba(0, 216, 255, 0.4)' },
      // 线条颜色：亮蓝
      lineStyle: { color: '#00d8ff', width: 2 },
      itemStyle: { color: '#00d8ff' }
    }]
  }]
}));
</script>

<style scoped>
.network-panel { display: flex; flex-direction: column; padding: 10px; height: 100%; }
.panel-title { font-size: 16px; font-weight: bold; color: #00d8ff; margin-bottom: 5px; display: flex; align-items: center; }
.decoration { margin-right: 8px; color: #00d8ff; }
.chart-container { flex: 1; min-height: 0; } /* 确保图表能自适应高度 */
</style>
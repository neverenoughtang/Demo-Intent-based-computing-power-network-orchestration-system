<template>
  <div ref="chartRef" class="base-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{
  options: any; // 接收外部传入的图表配置
}>();

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;
  //Edi初始化实例，使用深色模式
  chartInstance = echarts.init(chartRef.value, 'dark', {
    renderer: 'canvas',
    useDirtyRect: true // 性能优化
  });
  setOptions();
};

// 设置配置项
const setOptions = () => {
  if (!chartInstance || !props.options) return;
  chartInstance.setOption({
    backgroundColor: 'transparent', // 背景透明，融入大屏
    ...props.options
  });
};

// 监听窗口大小变化，自动缩放图表
const handleResize = () => chartInstance?.resize();

onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chartInstance?.dispose();
});

// 监听数据变化，实时更新
watch(() => props.options, setOptions, { deep: true });
</script>

<style scoped>
.base-chart {
  width: 100%;
  height: 100%;
  min-height: 150px;
}
</style>
<template>
  <TechCard title="功能控制">
    <div class="btn-grid">
      <div class="btn-item main" @click="startSim">
        <span class="icon">▶</span>
        启动仿真
      </div>
      <div class="btn-item" @click="pauseSim">
        <span class="icon">❚❚</span>
        暂停演练
      </div>
      <div class="btn-item">
        <span class="icon">⬇</span>
        导出报告
      </div>
      <div class="btn-item">
        <span class="icon">⚙</span>
        系统设置
      </div>
    </div>
  </TechCard>
</template>

<script setup lang="ts">
import TechCard from '@/components/common/TechCard.vue';
import { ElMessage } from 'element-plus';

const startSim = () => ElMessage.success('仿真引擎已启动');
const pauseSim = () => ElMessage.warning('演练已暂停');
</script>

<style scoped>
.btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  height: 100%;
}
.btn-item {
  background: rgba(33, 150, 243, 0.1);
  border: 1px solid var(--tech-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--tech-text-main);
  font-weight: bold;
}
.btn-item:hover {
  background: rgba(33, 150, 243, 0.3);
  box-shadow: 0 0 15px rgba(33, 150, 243, 0.4);
}
.btn-item.main {
  background: rgba(0, 216, 255, 0.2);
  border-color: var(--tech-primary);
  color: var(--tech-primary);
}
.icon { font-size: 20px; margin-bottom: 5px; }
</style>
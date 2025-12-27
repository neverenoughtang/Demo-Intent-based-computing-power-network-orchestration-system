<template>
  <TechCard title="本次实验进度列表">
    <div class="task-list">
      <div v-for="task in store.tasks" :key="task.id" class="task-item">
        <span class="agent-name">{{ task.agentName }}</span>
        <span class="agent-action">{{ task.action }}</span>
        
        <div class="status-icon">
          <el-icon v-if="task.status === 'success'" color="#00ffc8"><CircleCheckFilled /></el-icon>
          <el-icon v-else-if="task.status === 'fail'" color="#ff4d4f"><CircleCloseFilled /></el-icon>
          <el-icon v-else-if="task.status === 'running'" class="is-loading" color="#00d8ff"><Loading /></el-icon>
          <span v-else class="pending-dot"></span>
        </div>
      </div>
    </div>
  </TechCard>
</template>

<script setup lang="ts">
import TechCard from '@/components/common/TechCard.vue';
import { useSimulationStore } from '@/store/useSimulationStore';
import { CircleCheckFilled, CircleCloseFilled, Loading } from '@element-plus/icons-vue';

const store = useSimulationStore();
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.02);
  margin-bottom: 5px;
}
.agent-name { color: var(--tech-primary); font-weight: bold; }
.pending-dot { width: 8px; height: 8px; background: #666; border-radius: 50%; }
</style>
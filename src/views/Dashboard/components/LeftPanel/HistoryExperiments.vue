<template>
  <TechCard title="历史实验列表">
    <ul class="history-list">
      <li v-for="item in store.historyList" :key="item.id" class="history-item">
        <span class="date">{{ item.date }}</span>
        <span class="name">{{ item.name }}</span>
        <span class="tag" :class="item.result">{{ item.result === 'pass' ? '成功' : '失败' }}</span>
      </li>
    </ul>
  </TechCard>
</template>

<script setup lang="ts">
import TechCard from '@/components/common/TechCard.vue';
import { useSimulationStore } from '@/store/useSimulationStore';

const store = useSimulationStore();
</script>

<style scoped>
.history-list { list-style: none; padding: 0; margin: 0; }
.history-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.history-item:hover { background: rgba(0, 216, 255, 0.1); }
.date { color: #888; font-family: var(--tech-font-family); }
.tag { padding: 2px 6px; border-radius: 2px; font-size: 16px; }
.tag.pass { border: 1px solid var(--tech-success); color: var(--tech-success); }
.tag.fail { border: 1px solid var(--tech-danger); color: var(--tech-danger); }
</style>
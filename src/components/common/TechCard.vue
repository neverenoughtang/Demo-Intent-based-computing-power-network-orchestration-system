<template>
  <div class="tech-card">
    <div class="card-header" v-if="title">
      <span class="decoration-line"></span>
      {{ title }}
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="corner top-left"></div>
    <div class="corner top-right"></div>
    <div class="corner bottom-left"></div>
    <div class="corner bottom-right"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>();
</script>

<style scoped>
.tech-card {
  position: relative;
  background: var(--tech-bg-panel);
  border: 1px solid rgba(0, 216, 255, 0.1);
  box-shadow: inset 0 0 20px rgba(0, 216, 255, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.card-header {
  height: 36px;
  line-height: 36px;
  padding-left: 15px;
  color: var(--tech-primary);
  font-weight: bold;
  font-size: 14px;
  border-bottom: 1px solid rgba(0, 216, 255, 0.2);
  background: linear-gradient(90deg, rgba(0,216,255,0.1) 0%, transparent 100%);
  display: flex;
  align-items: center;
}

.decoration-line {
  width: 4px;
  height: 14px;
  background: var(--tech-primary);
  margin-right: 8px;
}

.card-body {
  flex: 1;
  padding: 10px;
  overflow: auto;
  position: relative;
}

/* 四角装饰样式 */
.corner {
  position: absolute;
  width: 8px;
  height: 8px;
  border: 2px solid var(--tech-primary);
  transition: all 0.3s;
}
.top-left { top: 0; left: 0; border-right: none; border-bottom: none; }
.top-right { top: 0; right: 0; border-left: none; border-bottom: none; }
.bottom-left { bottom: 0; left: 0; border-right: none; border-top: none; }
.bottom-right { bottom: 0; right: 0; border-left: none; border-top: none; }
</style>
<template>
  <Dashboard />
</template>

<script setup lang="ts">
import Dashboard from '@/views/Dashboard/index.vue'
</script>

<style>
/* 移除默认的 padding/margin，确保大屏全屏显示 */
body, html, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
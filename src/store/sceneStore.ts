import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSceneStore = defineStore('scene', () => {
  // 定义模式状态：'military' 或 'civilian'
  const sceneMode = ref<'military' | 'civilian'>('civilian');

  // 切换模式的动作
  function toggleSceneMode(mode: 'military' | 'civilian') {
    sceneMode.value = mode;
    console.log(`[SceneStore] 模式已切换为: ${mode}`);
    // 在这里可以添加触发地图切换或其他全局事件的逻辑
  }

  return {
    sceneMode,
    toggleSceneMode
  };
});
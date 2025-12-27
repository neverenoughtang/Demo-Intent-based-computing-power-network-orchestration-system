<template>
  <TechCard class="map-wrapper" title="核心仿真视图">
    <div class="map-container">
      
      <svg class="topology-layer">
        <line 
          v-for="link in layoutLinks" 
          :key="link.name"
          :x1="link.x1" :y1="link.y1" 
          :x2="link.x2" :y2="link.y2" 
          class="topo-line"
        />
      </svg>

      <div 
        v-for="node in layoutNodes" 
        :key="node.name"
        class="topo-node"
        :class="node.type"
        :style="{ left: node.left + 'px', top: node.top + 'px' }"
      >
        <div class="ripple"></div>
        
        <div class="icon-wrapper">
          <div v-if="node.type === 'router'" class="router-icon">
            <el-icon><Cpu /></el-icon>
          </div>
          <div v-else class="drone-icon">✈️</div>
        </div>

        <div class="node-info">
          <span class="name">{{ node.name }}</span>
          <span class="ip" v-if="node.ip">{{ node.ip }}</span>
        </div>
      </div>

    </div>
  </TechCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'; // ✅ 移除了未使用的 ref, onMounted
import TechCard from '@/components/common/TechCard.vue';
import { useSimulationStore } from '@/store/useSimulationStore';
import { Cpu } from '@element-plus/icons-vue';

const store = useSimulationStore();

// 定义画布的虚拟尺寸
const VIRTUAL_W = 1100;
const VIRTUAL_H = 850;

// --- 1. 计算节点位置 ---
const layoutNodes = computed(() => {
  return store.topoNodes.map(node => {
    return {
      ...node,
      left: (node.x / VIRTUAL_W) * 1000 + 50, 
      top: (node.y / VIRTUAL_H) * 600 + 50,
      // ✅ 修复类型报错：现在 TopoNode 里有 interfaces 定义了，访问是安全的
      ip: node.interfaces && node.interfaces.length > 0 ? node.interfaces[0].ip : ''
    };
  });
});

// 定义连线对象的类型，帮助 TS 推断
interface LayoutLink {
  name: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// --- 2. 计算连线坐标 ---
const layoutLinks = computed<LayoutLink[]>(() => {
  const nodeMap = new Map(layoutNodes.value.map(n => [n.name, n]));
  
  const links = store.topoLinks.map(link => {
    const srcNode = nodeMap.get(link.source);
    const trgNode = nodeMap.get(link.target);
    
    if (srcNode && trgNode) {
      return {
        name: link.name,
        x1: srcNode.left,
        y1: srcNode.top,
        x2: trgNode.left,
        y2: trgNode.top
      };
    }
    return null;
  });

  // ✅ 关键修复：使用类型谓词 (Type Predicate) 过滤 null
  // 这样 TS 就知道返回的是 LayoutLink[] 而不是 (LayoutLink | null)[]
  return links.filter((link): link is LayoutLink => link !== null);
});

</script>

<style scoped>
.map-wrapper { 
  position: relative; 
  background: rgba(0,0,0,0.3) !important; 
}

.map-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-image: 
    linear-gradient(rgba(0, 216, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 216, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

.topology-layer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.topo-line {
  stroke: rgba(0, 216, 255, 0.4);
  stroke-width: 1.5;
  stroke-dasharray: 5,5; 
  animation: dash 1s linear infinite; 
}
@keyframes dash {
  from { stroke-dashoffset: 10; }
  to { stroke-dashoffset: 0; }
}

.topo-node {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
}

.topo-node.router .router-icon {
  width: 40px; height: 40px;
  background: #000;
  border: 2px solid #ff4d4f; 
  border-radius: 50%;
  color: #ff4d4f;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 15px rgba(255, 77, 79, 0.5);
  font-size: 20px;
}

.topo-node.host .drone-icon {
  font-size: 24px;
  filter: drop-shadow(0 0 5px #00d8ff); 
  transition: transform 0.3s;
}
.topo-node.host:hover .drone-icon {
  transform: scale(1.2);
}

.node-info {
  margin-top: 5px;
  text-align: center;
  pointer-events: none;
}
.name {
  display: block;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
  text-shadow: 0 0 2px black;
}
.ip {
  display: block;
  font-size: 10px;
  color: #aaa;
  transform: scale(0.9);
}

.ripple {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 100%; height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ripple 3s infinite;
  opacity: 0;
  pointer-events: none;
}
@keyframes ripple {
  0% { width: 0; height: 0; opacity: 1; }
  100% { width: 80px; height: 80px; opacity: 0; }
}
</style>
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { TopoNode, TopoLink, SubTask, HistoryExp } from '@/types/simulation';

export const useSimulationStore = defineStore('simulation', () => {
  // --- 1. 左侧数据 (保持不变) ---
  const tasks = ref<SubTask[]>([
    { id: '1', agentName: 'Agent-01', action: '意图解析', status: 'success' },
    { id: '2', agentName: 'Agent-02', action: '路径规划', status: 'fail' },
    { id: '3', agentName: 'Agent-03', action: '资源分配', status: 'running' },
    { id: '4', agentName: 'Agent-04', action: '执行打击', status: 'pending' },
  ]);

  const historyList = ref<HistoryExp[]>([
    { id: 'h1', date: '2023-10-27', name: '联合演习-A', result: 'pass' },
    { id: 'h2', date: '2023-10-26', name: '边界巡逻测试', result: 'pass' },
    { id: 'h3', date: '2023-10-25', name: '高负荷压力测试', result: 'fail' },
  ]);

  // --- 2. 核心拓扑数据 (来源于你提供的 JSON) ---
  // 这里直接硬编码你给的 JSON，实际项目中可以通过 API 获取
  const rawTopology = {
    hosts: {
      "D1h1": { type: "host", subtype: "ubuntu", x: 400, y: 375, interfaces: [{ ip: "192.168.1.10" }] },
      "D1h2": { type: "host", subtype: "ubuntu", x: 550, y: 375, interfaces: [{ ip: "192.168.2.10" }] },
      "D1h3": { type: "host", subtype: "vit-base", x: 500, y: 500, interfaces: [{ ip: "192.168.3.10" }] },
      "D2h1": { type: "host", subtype: "ubuntu", x: 950, y: 450, interfaces: [{ ip: "192.168.4.10" }] },
      "D2h2": { type: "host", subtype: "ubuntu", x: 950, y: 350, interfaces: [{ ip: "192.168.5.10" }] },
      "D2h3": { type: "host", subtype: "vit-base", x: 833, y: 229, interfaces: [{ ip: "192.168.6.10" }] },
      "D3h1": { type: "host", subtype: "ubuntu", x: 300, y: 500, interfaces: [{ ip: "192.168.7.10" }] },
      "D3h2": { type: "host", subtype: "ubuntu", x: 50, y: 750, interfaces: [{ ip: "192.168.8.10" }] },
      "D3h3": { type: "host", subtype: "vit-base", x: 271, y: 695, interfaces: [{ ip: "192.168.9.10" }] },
      "D4h1": { type: "host", subtype: "ubuntu", x: 400, y: 0, interfaces: [{ ip: "192.168.10.10" }] },
      "D4h2": { type: "host", subtype: "ubuntu", x: 150, y: 250, interfaces: [{ ip: "192.168.11.10" }] },
      "D4h3": { type: "host", subtype: "vit-base", x: 212, y: 364, interfaces: [{ ip: "192.168.12.10" }] }
    },
    routers: {
      "D1r1": { type: "router", subtype: "quagga", x: 475, y: 300, interfaces: [{ ip: "10.0.0.1" }] },
      "D2r1": { type: "router", subtype: "quagga", x: 830, y: 429, interfaces: [{ ip: "10.0.0.2" }] },
      "D3r1": { type: "router", subtype: "quagga", x: 150, y: 600, interfaces: [{ ip: "10.0.0.3" }] },
      "D4r1": { type: "router", subtype: "quagga", x: 250, y: 100, interfaces: [{ ip: "10.0.0.4" }] }
    },
    links: {
      "D1l1": { source: "D1r1", target: "D1h1" }, "D1l2": { source: "D1r1", target: "D1h2" }, "D1l3": { source: "D1h3", target: "D1r1" },
      "D2l1": { source: "D2r1", target: "D2h1" }, "D2l2": { source: "D2r1", target: "D2h2" }, "D2l3": { source: "D2h3", target: "D2r1" },
      "D3l1": { source: "D3r1", target: "D3h1" }, "D3l2": { source: "D3r1", target: "D3h2" }, "D3l3": { source: "D3h3", target: "D3r1" },
      "D4l1": { source: "D4r1", target: "D4h1" }, "D4l2": { source: "D4r1", target: "D4h2" }, "D4l3": { source: "D4h3", target: "D4r1" },
      "El1": { source: "D1r1", target: "D2r1" }, "El2": { source: "D1r1", target: "D3r1" }, "El3": { source: "D1r1", target: "D4r1" }
    }
  };

  // --- Computed: 将对象转换为数组，方便前端遍历渲染 ---
  const topoNodes = computed<TopoNode[]>(() => {
    const hosts = Object.entries(rawTopology.hosts).map(([key, val]) => ({
      name: key,
      ...val
    }));
    const routers = Object.entries(rawTopology.routers).map(([key, val]) => ({
      name: key,
      ...val
    }));
    return [...hosts, ...routers] as TopoNode[];
  });

  const topoLinks = computed<TopoLink[]>(() => {
    return Object.entries(rawTopology.links).map(([key, val]) => ({
      name: key,
      ...val
    }));
  });

  return { tasks, historyList, topoNodes, topoLinks };
});
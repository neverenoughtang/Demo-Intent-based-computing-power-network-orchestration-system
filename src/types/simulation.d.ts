// types/simulation.d.ts

export interface Position {
  lat: number;
  lng: number;
}

// 新增：网口接口定义 (解决 interfaces 报错)
export interface TopoInterface {
  ip: string;
  name?: string;
  netmask?: string;
}

// 节点类型
export interface TopoNode {
  name: string;
  type: 'host' | 'router' | 'switch';
  subtype?: string;
  x: number;
  y: number;
  ip?: string;
  gateway?: string;
  interfaces?: TopoInterface[]; // ✅ 关键修复：添加这个属性
}

// 连线接口
export interface TopoLink {
  name: string;
  source: string; 
  target: string;
  sourceIP?: string;
  targetIP?: string;
}

export interface SubTask {
  id: string;
  agentName: string; 
  action: string; 
  status: 'success' | 'fail' | 'running' | 'pending';
}

export interface HistoryExp {
  id: string;
  date: string;
  name: string;
  result: 'pass' | 'fail';
}
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ChatMessage } from '@/types/chat';

// 简介：管理对话历史
export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([
    { id: '1', role: 'system', content: '系统初始化完成，等待指令...', time: '10:00:05' },
    { id: '2', role: 'ai', content: '已连接算力网络，在线节点 850/1000', time: '10:00:06' },
  ]);

  const addMessage = (msg: Omit<ChatMessage, 'id' | 'time'>) => {
    const now = new Date();
    messages.value.push({
      id: Date.now().toString(),
      time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
      ...msg
    });
  };

  return { messages, addMessage };
});
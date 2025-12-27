// 简介：聊天交互类型定义
export interface ChatMessage {
  id: string;
  role: 'user' | 'system' | 'ai';
  content: string;
  time: string;
  type?: 'text' | 'voice' | 'file'; // 消息类型扩展
}
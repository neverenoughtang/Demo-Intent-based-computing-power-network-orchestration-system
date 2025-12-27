<template>
  <TechCard title="意图输入区">
    <div class="chat-container">
      <div class="messages-list">
        <div v-for="msg in chatStore.messages" :key="msg.id" class="msg-row">
          <span class="time">[{{ msg.time }}]</span>
          <span class="role" :class="msg.role">{{ msg.role === 'ai' ? 'AI' : '系统' }}:</span>
          <span class="content">{{ msg.content }}</span>
        </div>
      </div>

      <div class="input-toolbar">
        <div class="tools-left">
          <el-button type="primary" circle plain><el-icon><Microphone /></el-icon></el-button>
          <el-button type="success" circle plain><el-icon><Paperclip /></el-icon></el-button>
        </div>
        
        <el-input 
          v-model="inputText" 
          placeholder="请输入作战意图，例如：'调度3架无人机前往(34.5, 112.3)灭火'..." 
          class="tech-input"
          @keyup.enter="handleSend"
        />
        
        <el-button type="primary" class="send-btn" @click="handleSend">
          发送 <el-icon class="el-icon--right"><Promotion /></el-icon>
        </el-button>
      </div>
    </div>
  </TechCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TechCard from '@/components/common/TechCard.vue';
import { useChatStore } from '@/store/useChatStore';
import { Microphone, Paperclip, Promotion } from '@element-plus/icons-vue';

const chatStore = useChatStore();
const inputText = ref('');

const handleSend = () => {
  if (!inputText.value.trim()) return;
  chatStore.addMessage({ role: 'user', content: inputText.value });
  
  // 模拟 AI 回复 (真实场景接后端)
  setTimeout(() => {
    chatStore.addMessage({ role: 'ai', content: `正在解析意图: "${inputText.value}"... 资源匹配中` });
  }, 800);
  
  inputText.value = '';
};
</script>

<style scoped>
.chat-container { display: flex; flex-direction: column; height: 100%; }
.messages-list { 
  flex: 1; 
  overflow-y: auto; 
  padding: 10px; 
  background: rgba(0,0,0,0.2); 
  border: 1px solid rgba(255,255,255,0.05);
  margin-bottom: 10px;
}
.msg-row { margin-bottom: 6px; font-size: 14px; }
.time { color: #666; margin-right: 8px; font-family: var(--tech-font-family); }
.role.ai { color: var(--tech-success); font-weight: bold; margin-right: 5px; }
.role.system { color: var(--tech-secondary); font-weight: bold; margin-right: 5px; }

.input-toolbar { display: flex; gap: 10px; height: 40px; }
.tech-input { flex: 1; }
:deep(.el-input__wrapper) {
  background-color: rgba(255,255,255,0.05);
  box-shadow: none;
  border: 1px solid var(--tech-border);
}
:deep(.el-input__inner) { color: white; }
</style>
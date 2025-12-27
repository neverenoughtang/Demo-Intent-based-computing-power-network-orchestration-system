<template>
  <TechCard title="意图输入区">
    <div class="chat-container">
      <div class="scenario-switch">
        <div 
          class="switch-btn military" 
          :class="{ active: simulationStore.currentScenario === 'military' }"
          @click="simulationStore.setScenario('military')"
        >
          <el-icon><Aim /></el-icon> 军用场景
        </div>
        <div 
          class="switch-btn civilian" 
          :class="{ active: simulationStore.currentScenario === 'civilian' }"
          @click="simulationStore.setScenario('civilian')"
        >
          <el-icon><Van /></el-icon> 民用场景
        </div>
      </div>

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
          placeholder="请输入作战意图..." 
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
import { useSimulationStore } from '@/store/useSimulationStore';
import { Microphone, Paperclip, Promotion, Aim, Van } from '@element-plus/icons-vue';

const chatStore = useChatStore();
const simulationStore = useSimulationStore();
const inputText = ref('');

const handleSend = () => {
  if (!inputText.value.trim()) return;
  chatStore.addMessage({ role: 'user', content: inputText.value });
  setTimeout(() => {
    chatStore.addMessage({ role: 'ai', content: `[${simulationStore.currentScenario === 'military'?'军用':'民用'}] 意图解析中...` });
  }, 800);
  inputText.value = '';
};
</script>

<style scoped>
.chat-container { display: flex; flex-direction: column; height: 100%; position: relative; }

/* 场景切换按钮样式 */
.scenario-switch {
  display: flex;
  gap: 10px;
  position: absolute;
  top: -45px; /* 移到 Card Title 右侧或上方 */
  right: 10px;
  z-index: 10;
}
.switch-btn {
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.2);
  color: #888;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; gap: 5px;
  transition: all 0.3s;
  clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%); /* 斜角 */
}
.switch-btn:hover { background: rgba(255,255,255,0.1); }

/* 激活状态 */
.switch-btn.military.active {
  background: rgba(255, 77, 79, 0.2);
  border-color: #ff4d4f;
  color: #ff4d4f;
  box-shadow: 0 0 10px rgba(255, 77, 79, 0.3);
}
.switch-btn.civilian.active {
  background: rgba(0, 216, 255, 0.2);
  border-color: #00d8ff;
  color: #00d8ff;
  box-shadow: 0 0 10px rgba(0, 216, 255, 0.3);
}

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
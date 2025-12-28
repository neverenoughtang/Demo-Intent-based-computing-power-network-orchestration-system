<template>
  <div class="interaction-panel">
    <div class="chat-history">
      <div class="chat-message system">
        <span class="time">[系统]</span> 链接建立成功... 当前场景：{{ sceneModeText }}
      </div>
      <div class="chat-message ai">
        <span class="label">🤖 AI:</span> 这种布局看起来很不错，请下达指令。
      </div>
    </div>

    <div class="input-toolbar">
      <div class="left-tools">
        <el-tooltip content="上传文件" placement="top">
          <el-button circle class="icon-btn"><el-icon><FolderAdd /></el-icon></el-button>
        </el-tooltip>
        <el-tooltip content="语音输入" placement="top">
          <el-button circle class="icon-btn"><el-icon><Microphone /></el-icon></el-button>
        </el-tooltip>
      </div>

      <div class="input-wrapper">
        <el-input
          v-model="inputText"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 5 }"
          placeholder="在此输入指令..."
          class="tech-textarea"
          resize="none"
          @keydown.enter.prevent="handleEnter"
        />
      </div>

      <div class="right-tools">
        
        <el-tooltip content="场景切换" placement="top">
          <el-popover
            :width="120"
            trigger="click"
            v-model:visible="popoverVisible"
            popper-class="simple-popover"
          >
            <template #reference>
              <el-button class="scene-btn">
                {{ sceneModeText }}
              </el-button>
            </template>
            
            <div class="scene-list">
              <div 
                class="scene-item" 
                :class="{ active: sceneStore.sceneMode === 'civilian' }"
                @click="switchMode('civilian')"
              >
                民用
              </div>
              <div 
                class="scene-item" 
                :class="{ active: sceneStore.sceneMode === 'military' }"
                @click="switchMode('military')"
              >
                军用
              </div>
            </div>
          </el-popover>
        </el-tooltip>

        <el-button type="primary" class="send-btn" @click="sendMessage">
          发送 <el-icon class="el-icon--right"><Position /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FolderAdd, Microphone, Position } from '@element-plus/icons-vue';
import { useSceneStore } from '@/store/sceneStore';

// Store
const sceneStore = useSceneStore();
const sceneModeText = computed(() => sceneStore.sceneMode === 'military' ? '军用' : '民用');

// State
const inputText = ref('');
const popoverVisible = ref(false);

// Methods
const handleEnter = (e: KeyboardEvent) => {
  if (!e.shiftKey) sendMessage();
};

const sendMessage = () => {
  if (!inputText.value.trim()) return;
  console.log('发送指令:', inputText.value);
  inputText.value = '';
};

// ✅ 立即切换并关闭
const switchMode = (mode: 'military' | 'civilian') => {
  sceneStore.toggleSceneMode(mode);
  popoverVisible.value = false;
};
</script>

<style scoped>
/* 保持原有布局样式 */
.interaction-panel { display: flex; flex-direction: column; height: 100%; padding: 15px; position: relative; }
.chat-history { flex: 1; overflow-y: auto; margin-bottom: 15px; border: 1px solid rgba(0, 216, 255, 0.1); background: rgba(0, 0, 0, 0.2); padding: 10px; border-radius: 4px; }
.chat-message { margin-bottom: 10px; line-height: 1.4; font-size: 0.9em; }
.system { color: #00d8ff; opacity: 0.7; font-size: 0.8em; }
.ai .label { color: #ffaa00; font-weight: bold; margin-right: 5px; }

.input-toolbar { display: flex; align-items: flex-end; gap: 10px; }
.icon-btn { background: transparent !important; border: 1px solid rgba(0, 216, 255, 0.3) !important; color: #00d8ff !important; width: 40px; height: 40px; font-size: 18px; }
.icon-btn:hover { background: rgba(0, 216, 255, 0.1) !important; box-shadow: 0 0 10px rgba(0,216,255,0.4); }

.input-wrapper { flex: 1; }
.tech-textarea :deep(.el-textarea__inner) { background: rgba(0, 20, 30, 0.6); box-shadow: inset 0 0 5px rgba(0, 216, 255, 0.2); border: 1px solid rgba(0, 216, 255, 0.3); color: white; font-family: inherit; font-size: 16px; padding: 8px 12px; }
.tech-textarea :deep(.el-textarea__inner:focus) { box-shadow: 0 0 10px rgba(0, 216, 255, 0.3), inset 0 0 5px rgba(0, 216, 255, 0.2); border-color: #00d8ff; }

.right-tools { display: flex; gap: 10px; align-items: flex-end; }
.send-btn { background: linear-gradient(135deg, #007f96 0%, #005f73 100%); border: none; height: 40px; font-weight: bold; }
.send-btn:hover { background: linear-gradient(135deg, #00a0be 0%, #007f96 100%); box-shadow: 0 0 15px rgba(0, 216, 255, 0.4); }

/* ✅ 场景按钮样式 */
.scene-btn {
  background: rgba(0, 216, 255, 0.15); border: 1px solid #00d8ff; 
  color: #00d8ff; height: 40px; font-weight: bold; width: 80px; /* 固定宽度，看起来更整齐 */
}
.scene-btn:hover { border-color: #00d8ff; color: #00d8ff; }

/* ✅ Popover 内部简单列表样式 */
.scene-list { display: flex; flex-direction: column; }
.scene-item {
  padding: 10px; cursor: pointer; text-align: center; color: #333; font-weight: bold; transition: background 0.2s;
}
.scene-item:hover { background: #f0f9eb; color: #00d8ff; }
.scene-item.active { color: #007f96; background: rgba(0,216,255,0.1); }
</style>

<style>
/* ⚠️ 注意：这里不要加 scoped，因为弹窗是全局的 */

/* 覆盖 Popover 的默认白色背景 */
.el-popover.simple-popover {
  /* 深蓝底色 (和你大屏背景一致) */
  background: rgba(13, 27, 42, 0.95) !important;
  /* 蓝色边框 */
  border: 1px solid #00d8ff !important;
  box-shadow: 0 0 20px rgba(0, 216, 255, 0.2) !important;
  padding: 5px !important; /* 紧凑一点 */
}

/* 覆盖箭头颜色 (如果有箭头的话) */
.el-popover.simple-popover .el-popper__arrow::before {
  background: rgba(13, 27, 42, 0.95) !important;
  border: 1px solid #00d8ff !important;
}

/* 选项文字颜色 */
.simple-popover .scene-item {
  color: #fff !important; /* 默认白色 */
  border-radius: 4px;
  margin: 2px 0;
}

/* 选项悬停/激活颜色 */
.simple-popover .scene-item:hover,
.simple-popover .scene-item.active {
  background: rgba(0, 216, 255, 0.2) !important; /* 淡蓝背景 */
  color: #00d8ff !important; /* 亮蓝文字 */
}
</style>


<!-- <template>
  <div class="interaction-panel">
    <div class="chat-history">
      <div class="chat-message system">
        <span class="time">[系统]</span> 链接建立成功... 当前场景：{{ sceneModeLabel }}
      </div>
      <div class="chat-message ai">
        <span class="label">🤖 AI:</span> 这种布局看起来很不错，请下达指令。
      </div>
    </div>

    <div class="input-toolbar">
      <div class="left-tools">
        <el-tooltip content="上传文件" placement="top">
          <el-button circle class="icon-btn">
            <el-icon><FolderAdd /></el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip content="语音输入" placement="top">
          <el-button circle class="icon-btn">
            <el-icon><Microphone /></el-icon>
          </el-button>
        </el-tooltip>
      </div>

      <div class="input-wrapper">
        <el-input
          v-model="inputText"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 5 }"
          placeholder="在此输入指令..."
          class="tech-textarea"
          resize="none"
          @keydown.enter.prevent="handleEnter"
        />
      </div>

      <div class="right-tools">
        <el-popover
          :width="220"
          trigger="click"
          v-model:visible="popoverVisible"
          popper-class="tech-popover"
        >
          <template #reference>
            <el-button class="scene-btn">
              <el-icon style="margin-right:4px"><Setting /></el-icon> {{ sceneModeLabel }}
            </el-button>
          </template>
          
          <div class="scene-pop-content">
            <div class="pop-header">⚙️ 场景模式切换</div>
            <el-radio-group v-model="tempSceneMode" class="scene-radios">
              <el-radio label="civilian" border size="large">🏙️ 民用模式 (Civilian)</el-radio>
              <el-radio label="military" border size="large" class="radio-mil">🛡️ 军用模式 (Military)</el-radio>
            </el-radio-group>
            <div class="pop-actions">
              <el-button size="small" text @click="popoverVisible = false">取消</el-button>
              <el-button size="small" type="primary" @click="confirmSceneChange">确认生效</el-button>
            </div>
          </div>
        </el-popover>

        <el-button type="primary" class="send-btn" @click="sendMessage">
          发送 <el-icon class="el-icon--right"><Position /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FolderAdd, Microphone, Position, Setting } from '@element-plus/icons-vue';
import { useSceneStore } from '@/store/sceneStore';

// Store
const sceneStore = useSceneStore();
const sceneModeLabel = computed(() => sceneStore.sceneMode === 'military' ? '军用场景' : '民用场景');

// State
const inputText = ref('');
const popoverVisible = ref(false);
const tempSceneMode = ref(sceneStore.sceneMode); // 临时变量用于弹窗选择

// Methods
const handleEnter = (e: KeyboardEvent) => {
  if (!e.shiftKey) {
    sendMessage();
  }
};

const sendMessage = () => {
  if (!inputText.value.trim()) return;
  console.log('发送指令:', inputText.value);
  inputText.value = '';
};

const confirmSceneChange = () => {
  sceneStore.toggleSceneMode(tempSceneMode.value);
  popoverVisible.value = false;
};
</script>

<style scoped>
.interaction-panel {
  display: flex; flex-direction: column; height: 100%; padding: 15px;
  position: relative;
}

/* 对话区 */
.chat-history {
  flex: 1; overflow-y: auto; margin-bottom: 15px;
  border: 1px solid rgba(0, 216, 255, 0.1);
  background: rgba(0, 0, 0, 0.2); padding: 10px;
  border-radius: 4px;
}
.chat-message { margin-bottom: 10px; line-height: 1.4; font-size: 0.9em; }
.system { color: #00d8ff; opacity: 0.7; font-size: 0.8em; }
.ai .label { color: #ffaa00; font-weight: bold; margin-right: 5px; }

/* 底部工具栏 - 底部对齐 */
.input-toolbar {
  display: flex; align-items: flex-end; /* 关键：输入框变高时，按钮保持在底部 */
  gap: 10px;
}

/* 图标按钮 */
.icon-btn {
  background: transparent !important; border: 1px solid rgba(0, 216, 255, 0.3) !important;
  color: #00d8ff !important; width: 40px; height: 40px; font-size: 18px;
}
.icon-btn:hover { background: rgba(0, 216, 255, 0.1) !important; box-shadow: 0 0 10px rgba(0,216,255,0.4); }

/* 输入框 */
.input-wrapper { flex: 1; }
.tech-textarea :deep(.el-textarea__inner) {
  background: rgba(0, 20, 30, 0.6);
  box-shadow: inset 0 0 5px rgba(0, 216, 255, 0.2);
  border: 1px solid rgba(0, 216, 255, 0.3);
  color: white; font-family: inherit; font-size: 16px; /* 这里的字体单独控制 */
  padding: 8px 12px;
}
.tech-textarea :deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 10px rgba(0, 216, 255, 0.3), inset 0 0 5px rgba(0, 216, 255, 0.2);
  border-color: #00d8ff;
}

/* 右侧按钮 */
.right-tools { display: flex; gap: 10px; align-items: flex-end; }
.scene-btn {
  background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); 
  color: #ccc; height: 40px;
}
.scene-btn:hover { border-color: #00d8ff; color: #00d8ff; }

.send-btn {
  background: linear-gradient(135deg, #007f96 0%, #005f73 100%); 
  border: none; height: 40px; font-weight: bold;
}
.send-btn:hover { background: linear-gradient(135deg, #00a0be 0%, #007f96 100%); box-shadow: 0 0 15px rgba(0, 216, 255, 0.4); }

/* --- Popover 内容样式 (需要配合 global.css 或 scope 不生效时注意) --- */
.scene-pop-content { padding: 5px; color: #333; }
.pop-header { font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
.scene-radios { display: flex; flex-direction: column; gap: 10px; width: 100%; margin-bottom: 15px; }
.pop-actions { display: flex; justify-content: flex-end; gap: 10px; }
</style> -->
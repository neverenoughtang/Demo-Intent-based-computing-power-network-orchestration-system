import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 1. 引入根组件
import App from './App.vue'

// 2. 引入全局样式 (确保此文件存在且路径正确)
import '@/assets/styles/global.css'

console.log('🚀 [Main] Starting Vue app...')

const app = createApp(App)

// 3. 注册插件
app.use(createPinia())
app.use(ElementPlus)

// 4. 注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 5. 全局错误处理 (✅ 已添加类型注解，修复 TS7006)
app.config.errorHandler = (err: unknown, instance: unknown, info: string) => {
  console.error("🔥 捕获到 Vue 错误:", err);
  console.error("错误位置:", info);
};

// 6. 挂载
app.mount('#app')
console.log('✅ [Main] Vue app mounted!')
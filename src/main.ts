import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import '@/assets/styles/global.css' // 确保这个文件存在！

console.log('🚀 [Main] Starting Vue app...')

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
console.log('✅ [Main] Vue app mounted!')

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import App from './App.vue'
// import '@/assets/styles/global.css'

// console.log('🚀 [Step 1] App initializing...')

// const app = createApp(App)

// app.use(createPinia()) // 注册 Pinia
// app.use(ElementPlus) // 注册 Element Plus

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// } // 注册所有图标 (方便在组件中直接使用)

// console.log('🚀 [Step 2] Plugins loaded, mounting...')

// app.mount('#app') // 挂载 APP

// console.log('✅ [Step 3] App mounted!')


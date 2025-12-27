import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // 关键！监听所有 IP 地址
    port: 3000,      // 固定端口
    strictPort: false, // 如果端口被占用直接报错，不自动换端口
    cors: true        // 允许跨域，防止某些浏览器安全策略拦截
  }
})
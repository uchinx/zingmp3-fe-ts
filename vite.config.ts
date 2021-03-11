import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/variables";`
      }
    },
  },
  resolve: {
    alias: {
      '@/': '/src/',
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/variables";
          @import "./src/assets/styles/include-media";
        `
      }
    },
  },
  resolve: {
    alias: {
      '@/': '/src/',
    }
  }
})

import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => ({
  plugins: [
    Vue(),
  ],
  resolve: command === 'build'
    ? {}
    : {
        alias: {
          '@vue-toolskit/core': resolve(__dirname, '../../packages/core/index.ts'),
          '@vue-toolskit/shared': resolve(__dirname, '../../packages/shared/index.ts'),
        },
      },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@vue-toolskit/'))
            return 'vue-toolskit'
          else
            return 'vendor'
        },
      },
    },
  },
}))

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
          '@toolskit/core': resolve(__dirname, '../../packages/core/index.ts'),
          '@toolskit/shared': resolve(__dirname, '../../packages/shared/index.ts'),
        },
      },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@toolskit/'))
            return 'toolskit'
          else
            return 'vendor'
        },
      },
    },
  },
}))

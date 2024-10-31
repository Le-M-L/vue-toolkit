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
          '@toolkit/core': resolve(__dirname, '../../packages/core/index.ts'),
          '@toolkit/shared': resolve(__dirname, '../../packages/shared/index.ts'),
        },
      },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@toolkit/'))
            return 'toolkit'
          else
            return 'vendor'
        },
      },
    },
  },
}))

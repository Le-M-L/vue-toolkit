import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@toolskit/shared': resolve(__dirname, 'packages/shared/index.ts'),
      '@toolskit/core': resolve(__dirname, 'packages/core/index.ts'),
      '@toolskit/math': resolve(__dirname, 'packages/math/index.ts'),
      '@toolskit/components': resolve(__dirname, 'packages/components/index.ts'),
      '@toolskit/docs-utils': resolve(__dirname, 'packages/.vitepress/plugins/utils.ts'),
    },
    dedupe: [
      'vue',
      'vue-demi',
      '@vue/runtime-core',
    ],
  },
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  },
  test: {
    environment: 'jsdom',
    setupFiles: [resolve(__dirname, 'packages/.test/setup.ts')],
    reporters: 'dot',
    server: {
      deps: {
        inline: [
          'vue2',
          '@vue/composition-api',
          'vue-demi',
          'msw',
        ],
      },
    },
  },
  ssr: {
    noExternal: [
      /@toolskit\/.*/,
    ],
  },
})

import type { PackageManifest } from '@vue-toolskit/metadata'

export const packages: PackageManifest[] = [
  {
    name: 'metadata',
    display: 'Metadata for ToolKit functions',
    manualImport: true,
    iife: false,
    utils: true,
    target: 'node14',
  },
  {
    name: 'shared',
    display: 'Shared utilities',
  },
  {
    name: 'core',
    display: 'ToolKit',
    description: 'Collection of essential Vue Composition Utilities',
  },
  {
    name: 'components',
    display: 'Components',
    description: 'Renderless components for VueUse',
    author: '',
    external: [
      '@vue-toolskit/core',
      '@vue-toolskit/shared',
    ],
  },
  {
    name: 'integrations',
    display: 'Integrations',
    description: 'Integration wrappers for utility libraries',
    addon: true,
    submodules: true,
    external: [
      'axios',
      'vue-i18n',
      'vue-router',
      'pinia-plugin-persistedstate',
      'pinia',
      '@vue-toolskit/core',
      '@vue-toolskit/shared',
      '@vue-toolskit/integrations',
      '@vueuse/core',
      '@ctrl/tinycolor'
    ],
    globals: {
      'axios': 'axios',
      'vue-i18n': 'VueI18n',
      'vue-router': 'VueRouter',
      'pinia': 'pinia',
      'pinia-plugin-persistedstate': 'PiniaPluginPersistedstate',
      '@vue-toolskit/integrations': 'VueToolskit',
      '@vueuse/core': 'core',
      '@ctrl/tinycolor':'tinycolor'
    },
  },

]

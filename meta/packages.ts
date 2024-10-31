import type { PackageManifest } from '@toolskit/metadata'

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
      '@toolskit/core',
      '@toolskit/shared',
    ],
  },

]

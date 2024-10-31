import type { PackageIndexes } from '@toolkit/metadata'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { packages } from '../meta/packages'


const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const DIR_ROOT = resolve(__dirname, '..')
export const DIR_SRC = resolve(__dirname, '../packages')
const DIR_TYPES = resolve(__dirname, '../types/packages')

export async function getTypeDefinition(pkg: string, name: string): Promise<string | undefined> {
  const typingFilepath = join(DIR_TYPES, `${pkg}/${name}/index.d.ts`)

  if (!fs.existsSync(typingFilepath))
    return

  let types = await fs.readFile(typingFilepath, 'utf-8')

  if (!types)
    return

  // clean up types
  types = types
    .replace(/import\(.*?\)\./g, '')
    .replace(/import[\s\S]+?from ?["'][\s\S]+?["']/g, '')
    .replace(/export \{\}/g, '')

  const prettier = await import('prettier')
  return (await prettier
    .format(
      types,
      {
        semi: false,
        parser: 'typescript',
      },
    ))
    .trim()
}

export async function updateImport({ packages, functions }: PackageIndexes) {
  for (const { name, dir, manualImport } of Object.values(packages)) {
    if (manualImport)
      continue

    let imports: string[]
    if (name === 'components') {
      imports = functions
        .sort((a, b) => a.name.localeCompare(b.name))
        .flatMap((fn) => {
          const arr: string[] = []

          // don't include integration components
          if (fn.package === 'integrations')
            return arr

          if (fn.component)
            arr.push(`export * from '../${fn.package}/${fn.name}/component'`)
          if (fn.directive)
            arr.push(`export * from '../${fn.package}/${fn.name}/directive'`)
          return arr
        })
    }
    else {
      imports = functions
        .filter(i => i.package === name)
        .map(f => f.name)
        .sort()
        .map(name => `export * from './${name}'`)
    }

    if (name === 'core') {
      imports.push(
        'export * from \'./types\'',
        'export * from \'@toolkit/shared\'',
        'export * from \'./ssr-handlers\'',
      )
    }

    if (name === 'nuxt') {
      imports.push(
        'export * from \'@toolkit/core\'',
      )
    }

    await fs.writeFile(join(dir, 'index.ts'), `${imports.join('\n')}\n`)

    // temporary file for export-size
    await fs.remove(join(dir, 'index.mjs'))
  }
}

export function uniq<T extends any[]>(a: T) {
  return Array.from(new Set(a))
}


export async function updatePackageJSON(indexes: PackageIndexes) {
  const { version } = await fs.readJSON('package.json')

  for (const { name, description, author, submodules, iife } of packages) {
    const packageDir = join(DIR_SRC, name)
    const packageJSONPath = join(packageDir, 'package.json')
    const packageJSON = await fs.readJSON(packageJSONPath)

    packageJSON.version = version
    packageJSON.description = description || packageJSON.description
    packageJSON.author = author || ''
    packageJSON.main = './index.cjs'
    packageJSON.types = packageJSON.type === 'module' ? './index.d.ts' : './index.d.cts'
    packageJSON.module = './index.mjs'
    if (iife !== false) {
      packageJSON.unpkg = './index.iife.min.js'
      packageJSON.jsdelivr = './index.iife.min.js'
    }
    packageJSON.exports = {
      '.': {
        import: './index.mjs',
        require: './index.cjs',
      },
      './*': './*',
      ...packageJSON.exports,
    }

    if (submodules) {
      indexes.functions
        .filter(i => i.package === name)
        .forEach((i) => {
          packageJSON.exports[`./${i.name}`] = {
            import: `./${i.name}.mjs`,
            require: `./${i.name}.cjs`,
          }
          if (i.component) {
            packageJSON.exports[`./${i.name}/component`] = {
              import: `./${i.name}/component.mjs`,
              require: `./${i.name}/component.cjs`,
            }
          }
        })
    }

    await fs.writeJSON(packageJSONPath, packageJSON, { spaces: 2 })
  }
}

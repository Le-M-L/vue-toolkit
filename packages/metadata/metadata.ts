import type { PackageIndexes } from './types'
import _metadata, { categories as _categories, functions as _functions, packages as _packages } from './index.json'

export const metadata = _metadata as PackageIndexes
export const functions = _functions as PackageIndexes['functions']
export const packages = _packages as PackageIndexes['packages']
export const categories = _categories as PackageIndexes['categories']

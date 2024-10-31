import { metadata } from '../packages/metadata/metadata'
import { updateImport, updatePackageJSON } from './utils'

async function run() {
  await Promise.all([
    updateImport(metadata),
    updatePackageJSON(metadata),
  ])

}

export {
  run
}

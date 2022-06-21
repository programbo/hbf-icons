import { readdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

import { listdir } from './walk'

const SRC_PATH = resolve(__dirname, '../src')
const ICONS_DIR = 'src/icons'
const GENERATED_HEADER = `/* THIS FILE HAS BEEN AUTOMATICALLY GENERATED BY 'scripts/build-index.ts' */
/* IT IS EXECUTED DURING THE \`prebuild\` PHASE */
/* AND CAN BE RUN MANUALL VIA \`npm run build-index\` */\n\n`

const dirToPrefix = (dir: string) => {
  return dir.includes('mono')
    ? ''
    : dir
        .split('/')
        .slice(2)
        .map(segment => segment[0].toUpperCase() + segment.slice(1))
        .join('')
}

const sortedList = [...listdir(ICONS_DIR)].sort((a, z) =>
  z.type === 'directory' ||
  a.dir + a.file.toLowerCase() > z.dir + z.file.toLowerCase()
    ? 1
    : -1
)

const components = sortedList
  .filter(({ file }) => file.endsWith('.tsx') && !file.startsWith('index'))
  .map(({ dir, type, file }) => ({
    dir,
    type,
    prefix: dirToPrefix(dir),
    file: type === 'file' ? file.slice(0, -4) : file,
  }))

const icons = components
  .map(
    ({ dir, file, prefix, type }) =>
      `export {default as ${prefix}${file}} from '${dir.replace(
        ICONS_DIR,
        './icons'
      )}/${file}';`
  )
  .join('\n')

const types = `export enum IconType {
${components
  .map(({ type, file, prefix }) => `  ${prefix}${file} = '${prefix}${file}',`)
  .join('\n')}
}`

const paths = `import { IconType } from './types';

export const IconPath = {
${components
  .map(
    ({ type, file, prefix, dir }) =>
      `  [IconType.${prefix}${file}]: '${dir.replace(
        ICONS_DIR + '/',
        ''
      )}/${file}',`
  )
  .join('\n')}
} as const`

try {
  const sourceFiles = { icons, types, paths }
  const index = Object.keys(sourceFiles)
    .map(name => `export * from './${name}'`)
    .join('\n')

  Object.entries({ ...sourceFiles, index }).forEach(
    ([fileName, fileContent]) => {
      writeFileSync(
        `${SRC_PATH}/${fileName}.ts`,
        `${GENERATED_HEADER}${fileContent}`
      )
    }
  )
  console.log(
    `Generated typed exports for ${components.length} icons in \`${SRC_PATH}/index.ts\`:\n${index}`
  )
} catch (err) {
  console.error(err)
}

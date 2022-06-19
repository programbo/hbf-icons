import fs from 'fs'
import { resolve } from 'path'

import { listdir } from './walk'

const ICONS_DIR = 'src/icons'

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

const index = components
  .map(({ dir, file, prefix, type }) =>
    type === 'file'
      ? `export {default as ${prefix}${file}} from '${dir.replace(
          ICONS_DIR,
          '.'
        )}/${file}';`
      : `\n  // ${file} icons`.toUpperCase()
  )
  .join('\n')

const types = `export enum IconType {
${components
  .map(({ type, file, prefix }) =>
    type === 'file'
      ? `  ${prefix}${file} = '${prefix}${file}',`
      : `\n  // ${file} icons`.toUpperCase()
  )
  .join('\n')}
}`

const paths = `import { IconType } from './types';

export const IconPath = {
${components
  .map(({ type, file, prefix, dir }) =>
    type === 'file'
      ? `  [IconType.${prefix}${file}]: '${dir.replace(
          ICONS_DIR + '/',
          ''
        )}/${file}',`
      : `\n  // ${file} icons`.toUpperCase()
  )
  .join('\n')}
} as const`

try {
  Object.entries({ index, types, paths }).forEach(([fileName, fileContent]) => {
    fs.writeFileSync(
      resolve(__dirname, `../${ICONS_DIR}/${fileName}.ts`),
      fileContent
    )
    console.log(
      `Successfully added ${components.length} items to ${ICONS_DIR}/${fileName}.ts`
    )
  })
} catch (err) {
  console.error(err)
}

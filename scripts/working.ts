import { readdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const srcDir = resolve(__dirname, '../src')
const list = readdirSync(srcDir)
  .filter(file => file.endsWith('.ts') && !file.startsWith('index'))
  .map(file => file.slice(0, -3))

try {
  writeFileSync(
    `${srcDir}/index.ts`,
    list.map(name => `export * from './${name}'`).join('\n')
  )
} catch (error) {
  console.error(error)
}

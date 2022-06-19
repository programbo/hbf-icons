import fs from 'fs'
import path from 'path'

type Found = {
  dir: string
  file: string
  type: 'file' | 'directory' | null
}

export function listdir(root: string) {
  const list: Found[] = []

  const walk = (dir: string) => {
    const files = fs.readdirSync(dir, { encoding: 'utf8' })

    files.forEach((file) => {
      const filepath = path.join(dir, file)
      const stats = fs.statSync(filepath)
      const type = stats.isDirectory()
        ? 'directory'
        : stats.isFile()
        ? 'file'
        : null

      list.push({ dir, file, type })

      if (stats.isDirectory()) {
        walk(filepath)
      }
    })
  }

  walk(root)

  return list
}

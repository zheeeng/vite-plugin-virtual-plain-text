import * as path from 'path'
import * as fs from 'fs'

const defaultVirtualFileId = '@virtual:plain-text/'

/**
 * @param match
 * Regular expression in string or Regexp type,
 *  or a match predicate  (this: vite transform context, code: string, id: file name string) => void
 * @returns transformed code
 */
export default function plainText (virtualFileId = defaultVirtualFileId) {
  return {
    name: 'virtual-plain-text', // required, will show up in warnings and errors
    resolveId(id: string) {
      if (id.indexOf(virtualFileId) === 0) {
        return id
      }
    },
    async load(id: string) {
      if (id.indexOf(virtualFileId) === 0) {
        const filePath = path.resolve(id.replace(virtualFileId, ''))
        const content = await fs.promises.readFile(filePath, { encoding: 'utf-8' })
        return `export const content = ${JSON.stringify(content)}`
      }
    }
  }
}
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
      const indexOfVirtualFileId = id.indexOf(virtualFileId)
      if (indexOfVirtualFileId === 0) {
        return `${virtualFileId}${encodeURIComponent(id.slice(virtualFileId.length))}`
      }
    },
    async load(id: string) {
      const indexOfVirtualFileId = id.indexOf(virtualFileId)

      if (indexOfVirtualFileId === 0) {
        const loadId = decodeURIComponent(id.replace(virtualFileId, ''))
        const filePath = path.resolve(loadId)
        const content = await fs.promises.readFile(filePath, { encoding: 'utf-8' })
        return `export const plainText = ${JSON.stringify(content)}`
      }
    }
  }
}
import * as path from 'path'
import * as fs from 'fs'

const defaultVirtualNamespace = '@virtual:plain-text/'
const getResolvedVirtualNamespace = (virtualNamespace: string) => `@resolved${virtualNamespace}`

/**
 * @param match
 * Regular expression in string or Regexp type,
 *  or a match predicate  (this: vite transform context, code: string, id: file name string) => void
 * @returns transformed code
 */
export default function plainText (virtualNamespace = defaultVirtualNamespace) {
  const resolvedVirtualNamespace = getResolvedVirtualNamespace(virtualNamespace)

  return {
    name: 'virtual-plain-text', // required, will show up in warnings and errors
    resolveId (id: string) {
      if (id.indexOf(virtualNamespace) === 0) {
        const encodedLoadId = encodeURIComponent(id.slice(virtualNamespace.length))
        return `${resolvedVirtualNamespace}${encodedLoadId}`
      }
    },
    async load (maybeEncodedId: string) {
      if (maybeEncodedId.indexOf(resolvedVirtualNamespace) === 0) {
        const decodedLoadId = decodeURIComponent(maybeEncodedId.slice(resolvedVirtualNamespace.length))
        const filePath = path.resolve(decodedLoadId)
        const content = await fs.promises.readFile(filePath, { encoding: 'utf-8' })
        return `export const plainText = ${JSON.stringify(content)}`
      }
    }
  }
}
import type { Plugin } from 'vite'
import * as path from 'path'
import * as fs from 'fs'

const getResolvedVirtualNamespace = (virtualNamespace: string) => `@resolved${virtualNamespace}`

type PlainTextOptions = {
  virtualNamespace?: string,
  namedExport?: string | false,
  dtsAutoGen?: string | false,
}

const defaultPlainTextOptions: Required<PlainTextOptions> = { virtualNamespace: '@virtual:plain-text/', namedExport: false, dtsAutoGen: false }

/**
 * @param match
 * Regular expression in string or Regexp type,
 *  or a match predicate  (this: vite transform context, code: string, id: file name string) => void
 * @returns transformed code
 */
export default function plainText (options?: PlainTextOptions): Plugin {
  // strip or add ending slash
  const plainTextOptions: Required<PlainTextOptions> = { ...defaultPlainTextOptions, ...options }

  const virtualNamespace = plainTextOptions.virtualNamespace.replace(/\/*$/, '/')
  const resolvedVirtualNamespace = getResolvedVirtualNamespace(virtualNamespace)

  if (plainTextOptions.dtsAutoGen) {
    const declaration = [
      `declare module '${virtualNamespace}*' {`,
      plainTextOptions.namedExport
        ? (`    export const ${plainTextOptions.namedExport}: string`)
        : ('    const plainText: string' + '\n' + '    export default plainText'),
      '}'
    ].join('\n')

    fs.writeFileSync(plainTextOptions.dtsAutoGen + '.d.ts', declaration)
  }

  return {
    name: 'virtual-plain-text', // required, will show up in warnings and errors
    resolveId (id: string) {
      if (id.indexOf(virtualNamespace) !== 0) return

      const encodedLoadId = encodeURIComponent(id.slice(virtualNamespace.length))
      return `${resolvedVirtualNamespace}${encodedLoadId}`
    },
    async load (maybeEncodedId: string) {
      if (maybeEncodedId.indexOf(resolvedVirtualNamespace) !== 0) return

      const decodedLoadId = decodeURIComponent(maybeEncodedId.slice(resolvedVirtualNamespace.length))
      const filePath = path.resolve(decodedLoadId)
      const content = await fs.promises.readFile(filePath, { encoding: 'utf-8' })

      return plainTextOptions.namedExport
        // Named exporting
        ? `export const ${plainTextOptions.namedExport} = ${JSON.stringify(content)}`
        // Default exporting
        : (`const plainText = ${JSON.stringify(content)}` + '\n' + `export default plainText`)
    },
  }
}
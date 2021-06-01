# vite-plugin-virtual-plain-text

[![NPM](https://nodei.co/npm/vite-plugin-virtual-plain-text.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vite-plugin-virtual-plain-text/)

![publish workflow](https://github.com/zheeeng/vite-plugin-virtual-plain-text/actions/workflows/publish.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/vite-plugin-virtual-plain-text.svg)](https://www.npmjs.com/package/vite-plugin-virtual-plain-text)

A Vite plugin loads file as plain text from the virtual assets workspace.

## Install

```bash
yarn add -D vite-plugin-virtual-plain-text (or by npm)
```

## Example

Take the project's legal file `LICENSE` as an example:

```ts
// vite.config.(t|j)s

import { defineConfig } from 'vite';

/**
 * @param match
 * Regular expression in string or Regexp type,
 *  or a match predicate  (this: vite transform context, code: string, id: file name string) => void
 * @returns transformed code
 */
import plainText from 'vite-plugin-virtual-plain-text';

export default defineConfig({
  plugins: [
    // passing string type Regular expression
    plainText(),
  ],
});
```

Load the content of `LICENSE` file under the project root:

```js
// component.js

import { plainText as LICENSE } from '@virtual:plain-text/LICENSE'

console.log(LICENSE)
```

For Typescript user you could add the typing reference in your workspace declaration file:

```ts
// declaration.d.ts
/// <reference types="vite-plugin-virtual-plain-text/virtual-assets" />
```

## License

MIT

## Alternative

Plain text transformer: [vite-plugin-plain-text](https://www.npmjs.com/package/vite-plugin-plain-text)

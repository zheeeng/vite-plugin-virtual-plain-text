# vite-plugin-virtual-plain-text

[![NPM](https://nodei.co/npm/vite-plugin-virtual-plain-text.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vite-plugin-virtual-plain-text/)

![publish workflow](https://github.com/zheeeng/vite-plugin-virtual-plain-text/actions/workflows/publish.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/vite-plugin-virtual-plain-text.svg)](https://www.npmjs.com/package/vite-plugin-virtual-plain-text)

A Vite plugin loads file as plain text from the virtual assets workspace.

> This plugin resolves a virtual assets path file as a local file path against the project root.

## Install

```bash
yarn add -D vite-plugin-virtual-plain-text (or by npm)
```

## Example

Take the project's legal file `LICENSE` as an example:

```ts
// vite.config.(t|j)s

import { defineConfig } from 'vite';

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

## Advanced

You can configure the virtual assets' workspace name

```ts
// vite.config.(t|j)s

import { defineConfig } from 'vite';

import plainText from 'vite-plugin-virtual-plain-text';

export default defineConfig({
  plugins: [
    // passing string type Regular expression
    plainText('@my-virtual-plain-text-workspace:/'),
  ],
});
```

For Typescript user, the type declaration should be correspondingly added:

```ts
// declaration.d.ts

declare module '@my-virtual-plain-text-workspace:/*' {
    export const plainText: string
}
```

## License

MIT

## Alternative

Plain text transformer: [vite-plugin-plain-text](https://www.npmjs.com/package/vite-plugin-plain-text)

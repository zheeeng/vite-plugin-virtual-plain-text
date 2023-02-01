# vite-plugin-virtual-plain-text

[![NPM](https://nodei.co/npm/vite-plugin-virtual-plain-text.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vite-plugin-virtual-plain-text/)

![publish workflow](https://github.com/zheeeng/vite-plugin-virtual-plain-text/actions/workflows/publish.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/vite-plugin-virtual-plain-text.svg)](https://www.npmjs.com/package/vite-plugin-virtual-plain-text)

A Vite plugin to load file content as plain text from the virtual assets workspace.

> This plugin maps virtual asset file paths to local file paths based on the project root.

## Install

```bash
pnpm i -D vite-plugin-virtual-plain-text
```

```bash
yarn add -D vite-plugin-virtual-plain-text
```

```bash
npm install --save-dev vite-plugin-virtual-plain-text
```

## Basic Usage

To treat all virtual asset imports as plain text:

```ts
// vite.config.(t|j)s

import { defineConfig } from 'vite';

import plainText from 'vite-plugin-virtual-plain-text';

export default defineConfig({
  plugins: [
    plainText(),
  ],
});
```

You can now load the content of the `LICENSE` file in the project root:

```js
// component.js

import LICENSE from '@virtual:plain-text/LICENSE'

console.log(LICENSE)
```

For TypeScript users, you can create a `.dts` file manually for referencing the virtual assets declaration:

```ts
// declaration.d.ts
/// <reference types="vite-plugin-virtual-plain-text/virtual-assets" />
```

Or, you can use the auto declaration file generation feature, as described in the `Advanced Usage` section below.

## Advanced Usage

### Options Reference

```ts
type PlainTextOptions = {
  virtualNamespace?: string,
  namedExport?: string | false,
  dtsAutoGen?: string | false,
}
```

### Configure the virtual assets' workspace

```ts
// vite.config.(t|j)s

import { defineConfig } from 'vite';

import plainText from 'vite-plugin-virtual-plain-text';

export default defineConfig({
  plugins: [
    // passing the custom virtual workspace name
    plainText({ virtualNamespace: '@my-virtual-plain-text-workspace/' }),
  ],
});
```

For TypeScript users, add a module declaration:

```ts
// declaration.d.ts

declare module '@my-virtual-plain-text-workspace/*' {
    export const plainText: string
}
```

Or, configure auto generation:

```ts
// vite.config.(t|j)s

import { defineConfig } from 'vite';

import plainText from 'vite-plugin-virtual-plain-text';

export default defineConfig({
  plugins: [
    // passing the custom dts file pathname
    plainText({ virtualNamespace: '@my-virtual-plain-text-workspace/', dtsAutoGen: 'virtual-workspace-declaration' }),
  ],
});
```

`virtual-workspace-declaration.d.ts` will be created in the project's root directory.

### Enabling Named Export

```ts
// vite.config.(t|j)s

import { defineConfig } from 'vite';

import plainText from 'vite-plugin-virtual-plain-text';

export default defineConfig({
  plugins: [
    // passing the custom name of the named exporting variable
    plainText({ virtualNamespace: '@my-virtual-plain-text-workspace/', namedExport: 'plainText' }),
  ],
});
```

```js
// component.js

import { plainText as LICENSE } from '@virtual:plain-text/LICENSE'

console.log(LICENSE)
```

## License

MIT

## Alternative

Plain text transformer: [vite-plugin-plain-text](https://www.npmjs.com/package/vite-plugin-plain-text)

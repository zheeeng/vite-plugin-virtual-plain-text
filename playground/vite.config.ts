import { defineConfig } from "vite";
import plainText from "../src/index";

export default defineConfig({
  plugins: [
    plainText({ virtualNamespace: '@my-virtual-plain-text-workspace/', namedExport: false }),
  ],
});

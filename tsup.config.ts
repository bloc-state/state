import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: true,
  minify: true,
  dts: true,
  keepNames: true,
  sourcemap: true,
  clean: true,
})

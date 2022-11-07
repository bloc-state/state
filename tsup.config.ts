import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: true,
  minify: true,
  keepNames: true,
  sourcemap: true,
  clean: true,
})

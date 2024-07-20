import { compress } from "https://deno.land/x/zip@v1.2.5/mod.ts"
import { join } from "https://deno.land/std@0.188.0/path/mod.ts"

const target = "x86_64-apple-darwin"
const filename = `epic-${target}`

const distDir = "dist"
const inputFile = join(distDir, filename)
const zipFilename = `epic-${target}.zip`
const outputZip = join(distDir, zipFilename)

try {
  await compress(inputFile, outputZip)
  console.log(`Created ${outputZip}`)
} catch (error) {
  console.error(`Error creating zip file: ${error.message}`)
  Deno.exit(1)
}

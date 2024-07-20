import { compress } from "https://deno.land/x/zip@v1.2.5/mod.ts"
import { join } from "https://deno.land/std@0.188.0/path/mod.ts"

const targets = [
  "x86_64-apple-darwin",
  "aarch64-apple-darwin",
  "x86_64-pc-windows-msvc",
  "x86_64-unknown-linux-gnu"
]

const distDir = "dist"

for (const target of targets) {
  const filename = target.includes("windows") ? `epic-${target}.exe` : `epic-${target}`
  const inputFile = join(distDir, filename)
  const zipFilename = `epic-${target}.zip`
  const outputZip = join(distDir, zipFilename)

  try {
    await compress(inputFile, outputZip)
    console.log(`Created ${outputZip}`)
  } catch (error) {
    console.error(`Error creating zip file for ${target}: ${error.message}`)
  }
}

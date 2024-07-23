import Parser from "./frontend/parser.ts"
import { colorPrint, GRAY } from "./utils/painting.ts"

export async function runParser(filename: string) {
  try {
    const startTime = performance.now()
    const content = await Deno.readTextFile(filename)
    const parser = new Parser()
    const program = parser.produceAST(content)
    console.dir(program, { depth: 20 }) // 20 is just random depth
    const endTime = performance.now()
    const executionTime = endTime - startTime
    colorPrint(GRAY, `(${executionTime.toFixed(5)}ms)`)
  } catch (error) {
    console.error(`Error parsing file: ${error.message}`)
  }
}

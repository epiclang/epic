// deno-lint-ignore-file no-explicit-any
import Parser from "./frontend/parser.ts"
import Environment from "./runtime/environment.ts"
import { evaluate } from "./runtime/interpreter.ts"
import { MK_BOOL, MK_NULL } from "./runtime/values.ts"
import { colorPrint, GRAY, DARK_RED, RED, YELLOW } from "./utils/painting.ts"

export async function runScript(filename: string) {
  try {
    const startTime = performance.now()
    const content = await Deno.readTextFile(filename)
    const parser = new Parser()
    const env = new Environment()

    // Default Global Environment
    env.declareVar("true", MK_BOOL(true), true)
    env.declareVar("false", MK_BOOL(false), true)
    env.declareVar("null", MK_NULL(), true)

    console.log("\n")
    colorPrint(GRAY, "[0] ", false)
    colorPrint(DARK_RED, `Run ${filename}`, false)
    colorPrint(GRAY, ` [${(content.length / 1024).toFixed(6)}mb]`)

    const program = parser.produceAST(content)
    const result = evaluate(program, env) as any
    colorPrint(RED, `[Output] `, false)
    colorPrint(YELLOW, result.value)

    const endTime = performance.now()
    const executionTime = endTime - startTime

    colorPrint(RED, "End ", false)
    colorPrint(GRAY, `(${executionTime.toFixed(5)}ms)`)
    console.log("\n")

    return result.value
  } catch (error) {
    console.error(`Error reading or executing file: ${error.message}`)
  }
}

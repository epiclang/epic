import Parser from "./frontend/parser.ts"
import Environment from "./runtime/environment.ts"
import { evaluate } from "./runtime/interpreter.ts"
import { MK_BOOL, MK_NULL } from "./runtime/values.ts"
import { colorPrint, GRAY, DARK_RED, RED, YELLOW } from "./utils/painting.ts"

export function repl_web(input: string) {
  const startTime = performance.now()
  const parser = new Parser()
  const env = new Environment()

  // Default Global Environment
  env.declareVar("true", MK_BOOL(true), true)
  env.declareVar("false", MK_BOOL(false), true)
  env.declareVar("null", MK_NULL(), true)

  colorPrint(GRAY, "[0] ", false)
  colorPrint(DARK_RED, `Run on web`, false)
  colorPrint(GRAY, ` [${(input.length / 1024).toFixed(6)}mb]`)

  try {
    const program = parser.produceAST(input)
    const result = evaluate(program, env)
    colorPrint(RED, `[Output] `, false)
    colorPrint(YELLOW, `${result.value}`)
    const endTime = performance.now()
    const executionTime = endTime - startTime

    colorPrint(RED, "End ", false)
    colorPrint(GRAY, `(${executionTime.toFixed(5)}ms)`)
    return result.value
  } catch (error) {
    colorPrint(RED, `[ERROR] `, false)
    colorPrint(YELLOW, "Oppsi, syntax not worky ;(")
    console.error(error)
    return "Awesome error"
  }
}

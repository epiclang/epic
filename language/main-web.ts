// deno-lint-ignore-file no-explicit-any
import Parser from "./frontend/parser.ts"
import Environment from "./runtime/environment.ts"
import { evaluate } from "./runtime/interpreter.ts"
import { MK_BOOL, MK_NULL } from "./runtime/values.ts"

export function repl_web(input: string) {
  const parser = new Parser()
  const env = new Environment()

  // Default Global Environment
  env.declareVar("true", MK_BOOL(true), true)
  env.declareVar("false", MK_BOOL(false), true)
  env.declareVar("null", MK_NULL(), true)

  console.log("\nEpic Repl")

  const program = parser.produceAST(input)
  const result = evaluate(program, env) as any
  console.log("CHECK", result)
  return result.value
}

import Parser from "./frontend/parser.ts"
import { runScript } from "./main-run.ts"
import Environment from "./runtime/environment.ts"
import { evaluate } from "./runtime/interpreter.ts"
import { MK_BOOL, MK_NULL } from "./runtime/values.ts"
import { colorPrint, GRAY } from "./utils/painting.ts"

if (Deno.args.length > 0) {
  if (Deno.args[0] === "ast") {
    runParser(Deno.args[1])
  }
  runScript(Deno.args[0])
} else {
  repl()
}

function repl() {
  const parser = new Parser()
  const env = new Environment()

  // Default Global Environment
  env.declareVar("true", MK_BOOL(true), true)
  env.declareVar("false", MK_BOOL(false), true)
  env.declareVar("null", MK_NULL(), true)

  console.log("\nEpic Repl")
  while (true) {
    const input = prompt("> ")

    if (!input || input.includes("exit")) {
      Deno.exit(1)
    }

    const program = parser.produceAST(input)
    const result = evaluate(program, env)
    console.log(result)
  }
}

async function runParser(filename: string) {
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

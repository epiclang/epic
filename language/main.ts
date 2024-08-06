import Parser from "./frontend/parser.ts"
import { runScript } from "./main-run-file.ts"
import { runParser } from "./main-run-parser.ts"
import Environment from "./runtime/environment.ts"
import { evaluate } from "./runtime/interpreter.ts"
import { MK_BOOL, MK_NULL } from "./runtime/values.ts"

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
    evaluate(program, env)
  }
}

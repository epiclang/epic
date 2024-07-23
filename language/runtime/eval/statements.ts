// deno-lint-ignore-file no-explicit-any
import { Program, VarDeclaration } from "../../frontend/ast.ts"
import { colorPrint, GRAY, LIME, WHITE, YELLOW } from "../../utils/painting.ts"
import Environment from "../environment.ts"
import { evaluate } from "../interpreter.ts"
import { MK_NULL, RuntimeVal } from "../values.ts"

export function eval_program(program: Program, env: Environment): RuntimeVal {
  let lastEvaluated: RuntimeVal = MK_NULL()

  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env)
  }

  return lastEvaluated
}

export function eval_var_declaration(declaration: VarDeclaration, env: Environment): RuntimeVal {
  const value = declaration.value ? evaluate(declaration.value, env) : (MK_NULL() as any)
  colorPrint(GRAY, `[X] `, false)
  colorPrint(WHITE, "Assign ", false)
  colorPrint(LIME, declaration.identifier, false)
  colorPrint(WHITE, " to ", false)
  colorPrint(YELLOW, `${value.value}`)
  return env.declareVar(declaration.identifier, value, declaration.constant)
}

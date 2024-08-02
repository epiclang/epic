// deno-lint-ignore-file no-explicit-any
import { Program, VarDeclaration } from "../../frontend/ast.ts"
import { colorPrint, GRAY, LIME, WHITE, YELLOW } from "../../utils/painting.ts"
import Environment from "../environment.ts"
import { evaluate } from "../interpreter.ts"
import { MK_NULL, RuntimeVal } from "../values.ts"

export function eval_program(program: Program, env: Environment): RuntimeVal {
  let step = 1
  let lastEvaluated: RuntimeVal = MK_NULL()

  for (const statement of program.body) {
    if (statement.kind === "VarDeclaration") {
      const stmt = statement as any
      if (stmt.value.kind === "NumbericLiteral") {
        colorPrint(GRAY, `[${step}] `, false)
        colorPrint(WHITE, "Assigned ", false)
        colorPrint(LIME, stmt.identifier, false)
        colorPrint(WHITE, " to ", false)
        colorPrint(YELLOW, `${stmt.value.value}`)
        lastEvaluated = evaluate(statement, env)
      } else {
        colorPrint(GRAY, `[${step}] `, false)
        colorPrint(WHITE, "Assigned ", false)
        colorPrint(LIME, stmt.identifier, false)
        colorPrint(WHITE, " to:")
        lastEvaluated = evaluate(statement, env)
        colorPrint(GRAY, `    `, false)
        colorPrint(YELLOW, `= `, false)
        colorPrint(YELLOW, `${(lastEvaluated as any).value}`)
      }
    }
    step++
  }

  return lastEvaluated
}

export function eval_var_declaration(declaration: VarDeclaration, env: Environment): RuntimeVal {
  const value = declaration.value ? evaluate(declaration.value, env) : (MK_NULL() as any)
  return env.declareVar(declaration.identifier, value, declaration.constant)
}

import {
  AssignmentExpr,
  BinaryExpr,
  Identifier,
  NumbericLiteral,
  Program,
  Stmt,
  VarDeclaration
} from "../frontend/ast.ts"
import Environment from "./environment.ts"
import { eval_assignment, eval_binary_expr, eval_identifier } from "./eval/expressions.ts"
import { eval_program, eval_var_declaration } from "./eval/statements.ts"
import { NumberVal, RuntimeVal } from "./values.ts"

export function evaluate(astNode: Stmt, env: Environment): RuntimeVal {
  // console.log(astNode)
  switch (astNode.kind) {
    case "NumbericLiteral":
      return {
        value: (astNode as NumbericLiteral).value,
        type: "number"
      } as NumberVal

    case "Identifier":
      return eval_identifier(astNode as Identifier, env)

    case "AssignmentExpr":
      return eval_assignment(astNode as AssignmentExpr, env)

    case "BinaryExpr":
      return eval_binary_expr(astNode as BinaryExpr, env)

    case "Program":
      return eval_program(astNode as Program, env)

    case "VarDeclaration":
      return eval_var_declaration(astNode as VarDeclaration, env)

    default:
      console.error("This AST Node has not yet been setup for interpretation.", astNode)
      Deno.exit(0)
  }
}

export type NodeType =
  // STATEMENTS
  | "Program"
  | "VarDeclaration"
  // EXPRESSIONS
  | "AssignmentExpr"
  | "NumbericLiteral"
  | "Identifier"
  | "BinaryExpr"

export interface Stmt {
  kind: NodeType
}

export interface Program extends Stmt {
  kind: "Program"
  body: Stmt[]
}
export interface VarDeclaration extends Stmt {
  kind: "VarDeclaration"
  constant: boolean
  identifier: string
  value?: Expr
}

export interface Expr extends Stmt {}

export interface AssignmentExpr extends Expr {
  kind: "AssignmentExpr"
  assigne: Expr
  value: Expr
}

export interface BinaryExpr extends Expr {
  left: Expr
  right: Expr
  operator: string
}

export interface Identifier extends Expr {
  kind: "Identifier"
  symbol: string
}

export interface NumbericLiteral extends Expr {
  kind: "NumbericLiteral"
  value: number
}

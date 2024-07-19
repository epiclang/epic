export type NodeType = "Program" | "NumbericLiteral" | "Identifier" | "BinaryExpr" | "NullLiteral"

export interface Stmt {
  kind: NodeType
}

export interface Program extends Stmt {
  kind: "Program"
  body: Stmt[]
}

export interface Expr extends Stmt {}

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

export interface NullLiteral extends Expr {
  kind: "NullLiteral"
  value: "null"
}

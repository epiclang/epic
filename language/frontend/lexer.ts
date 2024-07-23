export enum TokenType {
  // Literal types
  Number,
  Identifier,

  // keywords
  Let,
  Const,

  // Grouping * Operators
  Equals,
  Semicolon,
  OpenParen,
  CloseParen,
  BinaryOperator,
  EOF // Signified the end of file
}

const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
  const: TokenType.Const
}

export interface Token {
  value: string
  type: TokenType
}

function token(value = "", type: TokenType): Token {
  return { value, type }
}

function isAlpha(src: string) {
  return src.toUpperCase() != src.toLowerCase()
}

function isSkippable(str: string) {
  return str == " " || str == "\n" || str == "\t"
}

function isInt(str: string) {
  const c = str.charCodeAt(0)
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)]
  return c >= bounds[0] && c <= bounds[1]
}

export class Lexer {
  private tokens = new Array<Token>()
  private src: string[] = []
  private at() {
    return this.src[0] as string
  }
  public tokenize(sourceCode: string): Token[] {
    this.src = sourceCode.split("")
    while (this.src.length > 0) {
      if (this.at() == "(") {
        this.tokens.push(token(this.src.shift(), TokenType.OpenParen))
      } else if (this.at() == ")") {
        this.tokens.push(token(this.src.shift(), TokenType.CloseParen))
      } else if (this.at() == "+" || this.at() == "-") {
        this.tokens.push(token(this.src.shift(), TokenType.BinaryOperator))
      } else if (this.at() == "*" || this.at() == "/") {
        if (this.at() == "/" && this.src[1] == "/") {
          // Allow for comments like //
          // Will check for // and then just shift until new line
          while (this.src.length > 0 && this.at() != ("\n" as string)) {
            this.src.shift()
          }

          if (this.src.length > 0 && this.at() === ("\n" as string)) {
            this.src.shift()
          }
        } else {
          this.tokens.push(token(this.src.shift(), TokenType.BinaryOperator))
        }
      } else if (this.at() == "%") {
        this.tokens.push(token(this.src.shift(), TokenType.BinaryOperator))
      } else if (this.at() == "=") {
        this.tokens.push(token(this.src.shift(), TokenType.Equals))
      } else if (this.at() == ";") {
        this.tokens.push(token(this.src.shift(), TokenType.Semicolon))
      } else {
        // handle multicharather tokens

        if (isInt(this.at())) {
          let num = ""
          while (this.src.length > 0 && isInt(this.at())) {
            num += this.src.shift()
          }
          this.tokens.push(token(num, TokenType.Number))
        } else if (isAlpha(this.at())) {
          let ident = ""
          while (this.src.length > 0 && isAlpha(this.at())) {
            ident += this.src.shift()
          }
          const reserved = KEYWORDS[ident]
          if (typeof reserved == "number") {
            this.tokens.push(token(ident, reserved))
          } else {
            // Unreconized name must mean user edfined symbol
            this.tokens.push(token(ident, TokenType.Identifier))
          }
        } else if (isSkippable(this.at())) {
          this.src.shift()
        } else {
          console.log("Unreconized character found in source: ", this.at())
          Deno.exit(1)
        }
      }
    }
    this.tokens.push({ type: TokenType.EOF, value: "EndOfFile" })
    return this.tokens
  }
}

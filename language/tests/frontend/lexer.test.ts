import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"
import { Lexer, TokenType } from "../../frontend/lexer.ts"

const operators = ["+", "-", "*", "/", "%"]
Deno.test("Lexer - operators", async (t) => {
  for (const operator of operators) {
    await t.step(`should tokenize ${operator}`, () => {
      assertEquals(new Lexer().tokenize(operator), [
        { type: TokenType.BinaryOperator, value: operator },
        { type: TokenType.EOF, value: "EndOfFile" }
      ])
    })
  }
  await t.step(`should tokenize =`, () => {
    assertEquals(new Lexer().tokenize("="), [
      { type: TokenType.Equals, value: "=" },
      { type: TokenType.EOF, value: "EndOfFile" }
    ])
  })
})

Deno.test("Lexer - misc", async (t) => {
  await t.step("should handle comments - with new line", () => {
    assertEquals(new Lexer().tokenize("100 // This is a comment \n"), [
      { type: TokenType.Number, value: "100" },
      { type: TokenType.EOF, value: "EndOfFile" }
    ])
  })
  await t.step("should handle comments - without new line", () => {
    assertEquals(new Lexer().tokenize("100 // This is a comment"), [
      { type: TokenType.Number, value: "100" },
      { type: TokenType.EOF, value: "EndOfFile" }
    ])
  })
})

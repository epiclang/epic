// deno-lint-ignore-file no-explicit-any
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts"
import Parser from "../../frontend/parser.ts"

Deno.test("Parser", async (t) => {
  await t.step("Minimal inputs", async (t) => {
    await t.step("Input nothing", () => {
      assertEquals(new Parser().produceAST(""), {
        body: [],
        kind: "Program"
      } as any)
    })
    await t.step("Input only number", () => {
      assertEquals(new Parser().produceAST("123"), {
        body: [{ kind: "NumbericLiteral", value: 123 }],
        kind: "Program"
      } as any)
    })
  })
  await t.step("Complex inputs", async (t) => {
    await t.step("Binary expressions", async (t) => {
      const operators = ["+", "-", "*", "/", "%"]
      for (const operator of operators) {
        await t.step(`should parse ${operator}`, () => {
          assertEquals(new Parser().produceAST(`1 ${operator} 1`), {
            body: [
              {
                kind: "BinaryExpr",
                left: {
                  kind: "NumbericLiteral",
                  value: 1
                },
                operator,
                right: {
                  kind: "NumbericLiteral",
                  value: 1
                }
              }
            ],
            kind: "Program"
          } as any)
        })
      }
    })
  })
})

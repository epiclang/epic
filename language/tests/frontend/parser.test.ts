// deno-lint-ignore-file no-explicit-any
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts"
import Parser from "../../frontend/parser.ts"

Deno.test("Parser", async (t) => {
  await t.step("check soemthing", () => {
    assertEquals(new Parser().produceAST("123"), {
      body: [{ kind: "NumbericLiteral", value: 123 }],
      kind: "Program"
    } as any)
  })
})

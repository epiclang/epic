import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts"
import { repl_web } from "../../main-web.ts"

const input = `// awesome
let x = 200;
let value = (10 * 20) + (20 + 10) + x;`

Deno.test("Parser", async (t) => {
  await t.step("check soemthing", () => {
    assertEquals(repl_web(input), 430)
  })
})
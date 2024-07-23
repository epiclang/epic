import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts"
import { runScript } from "../../main-run-file.ts"

Deno.test("Example: simple-math", async (t) => {
  await t.step("The output should be 300", async () => {
    const result = await runScript("examples/simple-math.epic")
    assertEquals(430, result)
  })
})

// ANSI color codes
export const GRAY = "\x1b[90m"
export const DARK_RED = "\x1b[31m"
export const WHITE = "\x1b[37m"
export const LIME = "\x1b[92m"
export const YELLOW = "\x1b[93m"
export const GREEN = "\x1b[32m"
export const ORANGE = "\x1b[38;5;208m"
export const RED = "\x1b[31m"
export const RESET = "\x1b[0m"

export function colorPrint(color: string, text: string, newLine: boolean = true) {
  Deno.stdout.writeSync(new TextEncoder().encode(`${color}${text}${RESET}${newLine ? "\n" : ""}`))
}

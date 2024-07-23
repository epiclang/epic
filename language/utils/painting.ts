// deno-lint-ignore-file ban-ts-comment no-explicit-any
// @ts-nocheck
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

const ansiToCSS: { [key: string]: string } = {
  "\x1b[90m": "#888888", // GRAY
  "\x1b[31m": "#FF0000", // RED
  "\x1b[37m": "#FFFFFF", // WHITE
  "\x1b[92m": "#00FF00", // LIME
  "\x1b[93m": "#FFFF00", // YELLOW
  "\x1b[32m": "#008000", // GREEN
  "\x1b[38;5;208m": "#FFA500" // ORANGE
}

export function colorPrint(color: string, text: string, newLine: boolean = true): void {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    // Browser environment
    const runtimeDiv = document.getElementById("runtime")
    if (runtimeDiv) {
      const span = document.createElement("span")
      span.style.color = ansiToCSS[color] || color
      span.textContent = text
      runtimeDiv.appendChild(span)

      if (newLine) {
        runtimeDiv.appendChild(document.createElement("br"))
      }

      // Scroll to bottom
      runtimeDiv.scrollTop = runtimeDiv.scrollHeight
    }
  } else {
    // Non-browser environment
    const output = `${color}${text}${RESET}${newLine ? "\n" : ""}`

    if (typeof Deno !== "undefined" && "stdout" in Deno) {
      // Deno environment
      ;(Deno as any).stdout.writeSync(new TextEncoder().encode(output))
    } else if (typeof process !== "undefined" && process.stdout) {
      // Node.js environment
      process.stdout.write(output)
    } else {
      // Fallback for other environments
      console.log(output)
    }
  }
}

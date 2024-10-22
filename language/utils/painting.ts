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
  "\x1b[31m": "#ef4444", // RED
  "\x1b[37m": "#f8fafc", // WHITE
  "\x1b[92m": "#84cc16", // LIME
  "\x1b[93m": "#facc15", // YELLOW
  "\x1b[32m": "#4ade80", // GREEN
  "\x1b[38;5;208m": "#ea580c" // ORANGE
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
    // const output = `${color}${text}${RESET}${newLine ? "\n" : ""}`

    if (typeof Deno !== "undefined" && "stdout" in Deno) {
      // Deno environment
      // Deno.stdout.writeSync(new TextEncoder().encode(output))
    } else {
      // Fallback for other environments
      // console.log(output)
    }
  }
}

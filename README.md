# The Epic Programming Language
Epic is a feature complete meta language that is written in TypeScript and is design the be easy to understand for anyone that wants to create their own language from scratch. Epic has:
- Compiler.
- Build tool.
- Package manager.
- Code formatter.
- language server.
- Test runner.
- Neovim extension.
- VSCode extension.

## Example syntax
```
import epic/pred {is_number?}

@assert is_number?, is_number? -> is_number?
fn add(first_number, second_number) {
	return first_number + second_number @? 10 17 27 44
}

add(5, 5) @? 10
add(10, 7) @$ 3.2ms
add(15, 12) @?f called 1 
add(22, 22) @?|$|f 44 | 2.2ms | called 1
```

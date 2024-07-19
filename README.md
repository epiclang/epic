# The Epic Programming Language

Epic is a feature meta language that is written in TypeScript and is design the be easy to understand for anyone that wants to create their own language from scratch. Epic has:

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

### Run

```
[0] Run add.epic [0.323mb]
[1] import epic/pred [0.12mb]
[2] Initiate fn add on line 24
[3] Call fn add on line 24
    [1] Assert 1th argument: 5 is_number? -> true
    [2] Assert 2th argument: 5 is_number? -> true
    [3] first_number + second_number -> 10
    [4] Assert return: 10 is_number? -> true
    [5] return 10
[4] Helper @? output 10 on line 24
```

## Why would you use Epic?

Epic has the most beautiful and human-readable output as seen above. If you are learning data algorithms or you are teaching someone new to programming, the Epic programming language is for you. Epic is horrendously slow, it's synchronous, and should never be used in a production system. Epic exists solely to allow you to understand what's happening when you code and to make the Epic source code easy to read, allowing you to inspect how the language works.

##

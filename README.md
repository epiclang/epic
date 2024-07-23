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

## install

### MacOS ARM • MacOS Intel • Linux

```
curl -fsSL https://epiclang.org/install.sh | sh
```

### Windows

```
irm https://epiclang.org/install.ps1 | iex
```

## Example future syntax

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

## How to Run Epic

After installing Epic, you can run it in two ways:

1. **File Execution**: To run an Epic file, use the following command:

```
epic [filename].epic
```

For example: `epic myprogram.epic`

2. **REPL Mode**: To start the Epic REPL (Read-Eval-Print Loop) for interactive coding, simply run:

```
epic
```

The REPL mode allows you to write and execute Epic code line by line, which is great for quick experimentation and learning.
Remember, whether you're running a file or using the REPL, Epic will provide its detailed, human-readable output, helping you understand exactly what's happening in your code.

### Here is example code that works with corrent version

```
// example comment
let x = 200;
let value = (10 * 20) + (20 + 10) + x;
```

#### Output:

```
[0] Run examples/simple-math.epic [0.060547mb]
[X] Assign x to 200
    - 10 * 20
    - 20 + 10
    - 200 + 30
    - 230 + 200
[X] Assign value to 430
[X] Output 430
[2] End (1.16042ms)
```

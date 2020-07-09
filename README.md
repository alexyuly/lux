# lux

## Introduction

**lux** is a programming language and a software development kit. There is a parser, a compiler, and an interpreter.

You send source code to the parser, which sends abstract syntax to the compiler, which sends an executable to the interpreter, like so:

`(you) -> source code -> (parser) -> abstract syntax -> (compiler) -> executable -> (interpreter)`

## Parser

The parser accepts a lux source code file (\*.lux) and outputs a lux abstract syntax file (\*.las).

Here is a very simple example of a lux source code file:

```
application
  effect system:out
    cause 'Hello, world!'
```

The above source code will compile into an executable application which prints the text `Hello, world!` to the system terminal.

### Declarations

A **declaration** is one of the following:
- a value, which is an immutable data structure
- `function`, which is a stateless unit of synchronous computation
  - may accept a parameter, which is a value or a function
- a component, which is a stateful unit of asynchronous processing
  - may accept a parameter, which is a value
  - may have `input` and `output`, to connect with other components
  - has one of the following keywords:
    - `application`
      - does not support `input`
      - does not support `output`
      - construct a new one by invoking with the interpreter
    - `publisher`
      - does not support `input`
      - supports `output`
      - construct a new one using the `cause` keyword
    - `processor`
      - supports `input`
      - supports `output`
      - construct a new one using the `chain` keyword
    - `subscriber`
      - supports `input`
      - does not support `output`
      - construct a new one using the `effect` keyword

Each lux source code file contains a single declaration at the first indentation level, called the **root declaration**. Other declarations, at subsequent indentation levels nested within the root, are called **inline declarations**.

#### Functions

A function which doesn't accept a parameter looks like this:

`function (x) result_in_terms_of_x`

Whereas, a function which accepts a parameter looks like this:

`function (x) by (y) result_in_terms_of_x_and_y`

Only a function which is a root declaration may accept a parameter.

### Statements

A **statement** controls the flow of data within a component declaration or within another statement.

#### `define`

A `define` statement creates an immutable reference to a value. For example, the following application defines a reference named `Message` and prints it twice:

```
application
  define Message 'Hello, world!'
  
  effect system:out
    cause `
      [ Message ]
      [ Message ]
    `
```

#### `store`, `write`, and `read`

A `store` statement creates a mutable reference to a value.

*TODO: Add information about store's syntax.*

*TODO: Add information about read and write statements.*

For example, the following application defines a store named `Count` and uses it to respond and render HTML:

```
application
  define Min 0
  
  store Count {
    `default` = Min
  }
  
  write Count
    cause html:click 'button'
    chain Count + 1
  
  effect html:render
    read Count
    chain html:parse `
      <button>
        [ Count ]
      </button>
    `
```

#### `cause`

#### `chain`

#### `effect`

#### `input`

#### `output`

## Compiler

The compiler accepts a lux AST file (\*.las) and outputs a lux executable file (\*.lex).

## Interpreter

The interpreter runs a lux executable file (\*.lex).

# lux

## Introduction

**lux** is a programming language and a software development kit. There is a parser, a compiler, and an interpreter.

You send source code to the parser, which sends abstract syntax to the compiler, which sends an executable to the interpreter, like so:

`(you) -> source code -> (parser) -> abstract syntax -> (compiler) -> executable -> (interpreter)`

## Parser

The parser accepts a lux source code file (\*.lux) and outputs a lux abstract syntax file (\*.las).

### Declarations

A **declaration** is one of the following:
- a value, which is an immutable data structure
- `function`, which is a stateless unit of synchronous computation
  - may accept a parameter, which is a value or a function
- a component, which is a static unit of asynchronous processing
  - may accept a parameter, which is a value
  - may have `input` and `output`, to connect with other components
  - has one of the following keywords:
    - `application`
      - supports `cause` and `effect` statements
      - construct a new one by invoking with the interpreter
    - `publisher`
      - supports `cause` and `output` statements
      - construct a new one using the `cause` keyword
    - `processor`
      - supports `input` and `output` statements
      - construct a new one using the `chain` keyword
    - `subscriber`
      - supports `input` and `effect` statements
      - construct a new one using the `effect` keyword

Each lux source code file contains a single declaration at the first indentation level, called the *root declaration*. Other declarations, at subsequent indentation levels nested within the root, are called *inline declarations*.

#### Functions

A function which doesn't accept a parameter looks like this:

`function (x) result_in_terms_of_x`

Whereas, a function which accepts a parameter looks like this:

`function (x) by (y) result_in_terms_of_x_and_y`

Only a function which is a root declaration may accept a parameter.

### Statements

A **statement** is a child of a component declaration or another statement, which controls the flow of data within its parent.

Many languages represent processing with *control flow*, but lux centers around *data flow*. Instead of writing customized implementations of control flow, you connect normalized controllers of data flow. Statements are these controllers.

#### `cause` and `effect`

The primary statements are `cause` and `effect`. A cause represents an origin of values from hardware over time, while an effect represents a destination for values from hardware over time.

Each effect has a reference to a subscriber and a set of child causes. Each cause has either a value or a reference to a publisher.

For example, the following application prints the text `Hello, world!` to the system output:

```
application
  effect system:out
    cause `Hello, world!`
```

#### `chain`

*TODO*

#### `define`

A `define` statement creates an immutable reference to a value.
- consists of the `define` keyword, followed by a name, followed by a value
- is the child of a component
- its name is private to its parent component
- its name is locally unique within its parent component
- its name contains only alphanumeric characters and underscores

Define statements should be used for a named value which is referenced more than once.

For example, the following application prints the text `Hello, world!` twice, once on each new line:

```
application
  define Message `Hello, world!`
  
  effect system:out
  cause `
    [ Message ]
    [ Message ]
  `
```

#### `store`, `write`, and `read`

A `store` statement creates a mutable reference to a value.

For example, the following application defines a store named `Count` and uses it to respond and render HTML:

```
application
  store Count {
    `default` = 0
  }
  
  effect html:render
    read Count
    chain html:parse `
      <button>
        [ Count ]
      </button>
    `
  
  write Count
    cause html:click 'button'
    chain Count + 1
```

#### `input` and `output`

*TODO*

## Compiler

The compiler accepts a lux AST file (\*.las) and outputs a lux executable file (\*.lex).

## Interpreter

The interpreter runs a lux executable file (\*.lex).

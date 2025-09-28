# Expression Decoder System

The Expression Decoder is a TypeScript-based console application that evaluates mathematical expressions using the **Decoder (Interpreter) pattern**. It provides a command-line interface for parsing and computing mathematical expressions with support for basic arithmetic operations, exponentiation, and parentheses. The system demonstrates object-oriented design principles and recursive descent parsing techniques.

---

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)
* [Command Examples](#command-examples)
* [Design Overview](#design-overview)
* [SOLID Principles and Design Patterns](#solid-principles-and-design-patterns)
* [Error Handling](#error-handling)
* [Sample Output](#sample-output)

---

## Features

* **Mathematical Expression Parsing:** Parse complex mathematical expressions with proper operator precedence
* **Multiple Operations:** Support for addition (+), subtraction (-), multiplication (*), division (/), and exponentiation (^)
* **Parentheses Support:** Handle nested parentheses for complex expressions
* **Interactive CLI:** Command-line interface for continuous expression evaluation
* **Recursive Descent Parser:** Robust parsing using recursive descent algorithm
* **Expression Tree:** Builds abstract syntax tree using Interpreter pattern

---

## Prerequisites

* **Node.js** (v16 or higher)
* **TypeScript** (latest stable version)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/expression-decoder.git
   ```

2. Navigate to the project directory:

   ```bash
   cd expression-decoder
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

---

## Usage

1. Start the application:

   ```bash
   npm run dev
   ```

2. Enter mathematical expressions when prompted:

   * Type any valid mathematical expression
   * Use parentheses for grouping operations
   * Type `exit` to quit the application

---

## Command Examples

| Input Example | Description |
| ------------- | ----------- |
| `2 + 3 * 4` | Basic arithmetic with precedence |
| `(2 + 3) * 4` | Expression with parentheses |
| `2 ^ 3` | Exponentiation operation |
| `10 / 2 + 5` | Mixed operations |
| `(5 + 3) ^ 2 - 10` | Complex nested expression |
| `exit` | Quit the application |

---

## Design Overview

The system applies object-oriented design principles with the following core components:

* **Expression Interface**: Defines the contract for all expression types with `evaluate()` and `toString()` methods.
* **Parser Class**: Implements recursive descent parsing to build expression trees from input strings.
* **InputHandler Class**: Provides CLI input prompts and user interaction.
* **Expression Classes**: Concrete implementations for different operations (AddExpression, SubtractExpression, MultiplyExpression, DivideExpression, PowerExpression, NumberExpression).

---

## SOLID Principles and Design Patterns

* **Single Responsibility:** Each expression class handles one specific operation, while Parser focuses solely on parsing.
* **Open/Closed Principle:** New expression types can be added by implementing the Expression interface without modifying existing code.
* **Liskov Substitution:** All expression implementations can be used interchangeably through the Expression interface.
* **Interface Segregation:** The Expression interface provides minimal, focused methods for evaluation and string representation.
* **Dependency Inversion:** High-level modules depend on the Expression abstraction rather than concrete implementations.

### Design Patterns

* **Interpreter Pattern:** Each expression class interprets and evaluates itself, creating a hierarchical structure for complex expressions.
* **Composite Pattern:** Expression tree structure allows for recursive evaluation of nested expressions.
* **Recursive Descent Parser:** Parsing algorithm that recursively processes grammar rules to build the expression tree.

---

## Error Handling

* **Syntax Validation:** Invalid expressions trigger parsing errors with descriptive messages.
* **Division by Zero:** Handles division by zero gracefully (depends on JavaScript's behavior).
* **Malformed Parentheses:** Detects and reports unmatched parentheses.
* **Invalid Tokens:** Provides clear error messages for unexpected characters.
* **Type Safety:** TypeScript ensures expressions are evaluated with correct data structures.

---

## Sample Output

```bash
> npm run dev

=== Mathematical Expression Evaluator ===
This application uses the Decoder (Interpreter) pattern to evaluate expressions.
Supported operations: +, -, *, /, ^ (power) and parentheses.

Enter a mathematical expression (or "exit" to quit): 2 + 3 * 4
Expression: (2 + (3 * 4))
Result: 14

Enter a mathematical expression (or "exit" to quit): (2 + 3) * 4
Expression: ((2 + 3) * 4)
Result: 20

Enter a mathematical expression (or "exit" to quit): 2 ^ 3 + 5
Expression: ((2 ^ 3) + 5)
Result: 13

Enter a mathematical expression (or "exit" to quit): (10 - 2) / (3 + 1)
Expression: ((10 - 2) / (3 + 1))
Result: 2

Enter a mathematical expression (or "exit" to quit): exit

Thank you for using the Mathematical Expression Evaluator!
```

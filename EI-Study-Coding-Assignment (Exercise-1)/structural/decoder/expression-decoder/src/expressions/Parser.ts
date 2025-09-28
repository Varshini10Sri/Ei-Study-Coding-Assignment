import { Expression } from "./Expression.js";
import { NumberExpression } from "./NumberExpression.js";
import { AddExpression } from "./AddExpression.js";
import { SubtractExpression } from "./SubtractExpression.js";
import { MultiplyExpression } from "./MultiplyExpression.js";
import { DivideExpression } from "./DivideExpression.js";
import { PowerExpression } from "./PowerExpression.js";

export class Parser {
  private tokens: string[];
  private current = 0;

  constructor(expression: string) {
    // Tokenize the expression
    this.tokens = expression
      .split("")
      .filter((token) => token.trim() !== "")
      .map((token) => {
        if (token === " ") return "";
        return token;
      })
      .filter((token) => token !== "");
  }

  parse(): Expression {
    return this.expression();
  }

  private expression(): Expression {
    let expr = this.term();

    while (this.match("+") || this.match("-")) {
      const operator = this.previous();
      const right = this.term();
      if (operator === "+") {
        expr = new AddExpression(expr, right);
      } else if (operator === "-") {
        expr = new SubtractExpression(expr, right);
      }
    }

    return expr;
  }

  private term(): Expression {
    let expr = this.factor();

    while (this.match("*") || this.match("/")) {
      const operator = this.previous();
      const right = this.factor();
      if (operator === "*") {
        expr = new MultiplyExpression(expr, right);
      } else if (operator === "/") {
        expr = new DivideExpression(expr, right);
      }
    }

    return expr;
  }

  private factor(): Expression {
    let expr = this.unary();

    while (this.match("^")) {
      const operator = this.previous();
      const right = this.unary();
      expr = new PowerExpression(expr, right);
    }

    return expr;
  }

  private unary(): Expression {
    if (this.match("-")) {
      const right = this.unary();
      return new NumberExpression(-right.evaluate());
    }

    if (this.match("+")) {
      return this.unary();
    }

    return this.primary();
  }

  private primary(): Expression {
    if (this.match("(")) {
      const expr = this.expression();
      this.consume(")", "Expected ')' after expression.");
      return expr;
    }

    // Handle numbers (including decimals)
    if (this.match(/\d+(\.\d+)?/)) {
      return new NumberExpression(parseFloat(this.previous()));
    }

    throw new Error(`Unexpected token: ${this.peek()}`);
  }

  private match(expected: string | RegExp): boolean {
    if (this.isAtEnd()) return false;
    if (typeof expected === "string") {
      if (this.peek() !== expected) return false;
    } else {
      if (!expected.test(this.peek())) return false;
    }
    this.advance();
    return true;
  }

  private consume(expected: string | RegExp, message: string): string {
    if (this.check(expected)) {
      return this.advance();
    }
    throw new Error(message);
  }

  private check(expected: string | RegExp): boolean {
    if (this.isAtEnd()) return false;
    if (typeof expected === "string") {
      return this.peek() === expected;
    } else {
      return expected.test(this.peek());
    }
  }

  private advance(): string {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.current >= this.tokens.length;
  }

  private peek(): string {
    return this.tokens[this.current];
  }

  private previous(): string {
    return this.tokens[this.current - 1];
  }
}

import { Expression } from "./Expression.js";

export class PowerExpression implements Expression {
  constructor(private base: Expression, private exponent: Expression) {}

  evaluate(): number {
    return Math.pow(this.base.evaluate(), this.exponent.evaluate());
  }

  toString(): string {
    return `(${this.base.toString()} ^ ${this.exponent.toString()})`;
  }
}

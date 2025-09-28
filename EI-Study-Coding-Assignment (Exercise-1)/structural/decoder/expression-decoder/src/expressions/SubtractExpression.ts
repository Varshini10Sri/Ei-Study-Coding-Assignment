import { Expression } from "./Expression.js";

export class SubtractExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  evaluate(): number {
    return this.left.evaluate() - this.right.evaluate();
  }

  toString(): string {
    return `(${this.left.toString()} - ${this.right.toString()})`;
  }
}

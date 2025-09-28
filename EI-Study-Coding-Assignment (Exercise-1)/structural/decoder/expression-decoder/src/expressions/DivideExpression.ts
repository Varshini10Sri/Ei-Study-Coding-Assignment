import { Expression } from "./Expression.js";

export class DivideExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  evaluate(): number {
    const rightValue = this.right.evaluate();
    if (rightValue === 0) {
      throw new Error("Division by zero");
    }
    return this.left.evaluate() / rightValue;
  }

  toString(): string {
    return `(${this.left.toString()} / ${this.right.toString()})`;
  }
}

import { Expression } from "./Expression.js";

export class NumberExpression implements Expression {
  constructor(private value: number) {}

  evaluate(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}

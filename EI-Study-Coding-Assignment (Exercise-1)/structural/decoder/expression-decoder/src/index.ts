import { Parser } from "./expressions/Parser.js";
import { InputHandler } from "./utils/InputHandler.js";

async function main() {
  const inputHandler = new InputHandler();

  console.log("=== Mathematical Expression Evaluator ===");
  console.log(
    "This application uses the Decoder (Interpreter) pattern to evaluate expressions."
  );
  console.log("Supported operations: +, -, *, /, ^ (power) and parentheses.\n");

  let evaluating = true;

  while (evaluating) {
    const input = await inputHandler.promptForExpression();

    if (input.toLowerCase() === "exit") {
      evaluating = false;
      continue;
    }

    try {
      const parser = new Parser(input);
      const expression = parser.parse();
      const result = expression.evaluate();
      console.log(`Expression: ${expression.toString()}`);
      console.log(`Result: ${result}`);
    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
    }
  }

  console.log("\nThank you for using the Mathematical Expression Evaluator!");
  inputHandler.close();
}

main().catch(console.error);

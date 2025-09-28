import * as readline from "readline";
import { ConfigEntry } from "../models/Config";

export class InputHandler {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async promptForAction(): Promise<string> {
    console.log("\n=== Configuration Manager ===");
    console.log("1. Set a configuration");
    console.log("2. Get a configuration");
    console.log("3. List all configurations");
    console.log("4. Delete a configuration");
    console.log("5. Clear all configurations");
    console.log("6. Exit");

    const choice = await this.promptInput("Select an option (1-6): ");
    return choice.trim();
  }

  async promptForConfigEntry(): Promise<ConfigEntry | null> {
    const key = await this.promptInput("Enter configuration key: ");
    if (!key) return null;

    const valueStr = await this.promptInput("Enter configuration value: ");
    if (!valueStr) return null;

    // Try to determine the type
    let value: string | number | boolean = valueStr;
    let type: "string" | "number" | "boolean" = "string";

    if (
      valueStr.toLowerCase() === "true" ||
      valueStr.toLowerCase() === "false"
    ) {
      value = valueStr.toLowerCase() === "true";
      type = "boolean";
    } else if (!isNaN(Number(valueStr))) {
      value = Number(valueStr);
      type = "number";
    }

    return { key, value, type };
  }

  async promptForKey(): Promise<string> {
    return await this.promptInput("Enter configuration key: ");
  }

  async promptInput(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async promptContinue(): Promise<boolean> {
    const answer = await this.promptInput("Continue? (y/n): ");
    return answer.toLowerCase() === "y";
  }

  close(): void {
    this.rl.close();
  }
}

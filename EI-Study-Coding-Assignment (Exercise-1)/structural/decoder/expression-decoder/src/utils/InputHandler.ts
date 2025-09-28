import * as readline from "readline";

export class InputHandler {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async promptForExpression(): Promise<string> {
    return await this.promptInput(
      'Enter a mathematical expression (or "exit" to quit): '
    );
  }

  async promptInput(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  close(): void {
    this.rl.close();
  }
}

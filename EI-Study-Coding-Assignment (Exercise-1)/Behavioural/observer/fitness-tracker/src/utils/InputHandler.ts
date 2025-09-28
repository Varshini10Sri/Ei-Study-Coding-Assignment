import * as readline from "readline";
import { Activity } from "../models/Activity";

export class InputHandler {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async promptForActivity(): Promise<Activity | null> {
    console.log("\n--- Add New Activity ---");

    const type = await this.promptInput(
      "Activity type (running/cycling/swimming/walking): "
    );

    if (!["running", "cycling", "swimming", "walking"].includes(type)) {
      console.log("Invalid activity type. Please try again.");
      return this.promptForActivity();
    }

    const duration = await this.promptInput("Duration (minutes): ");
    const calories = await this.promptInput("Calories burned: ");
    const distance = await this.promptInput("Distance (km): ");

    return {
      id: Date.now().toString(),
      type: type as Activity["type"],
      duration: parseFloat(duration),
      calories: parseFloat(calories),
      distance: parseFloat(distance),
      date: new Date(),
    };
  }

  async promptInput(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async promptContinue(): Promise<boolean> {
    const answer = await this.promptInput("Add another activity? (y/n): ");
    return answer.toLowerCase() === "y";
  }

  close(): void {
    this.rl.close();
  }
}

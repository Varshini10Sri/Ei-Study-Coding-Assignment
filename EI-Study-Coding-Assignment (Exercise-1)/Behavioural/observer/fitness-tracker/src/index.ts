import { FitnessTracker } from "./subject/FitnessTracker";
import { ConsoleLogger } from "./observers/ConsoleLogger";
import { StepCounter } from "./observers/StepCounter";
import { CalorieTracker } from "./observers/CalorieTracker";
import { InputHandler } from "./utils/InputHandler";

async function main() {
  // Initialize tracker
  const tracker = new FitnessTracker();
  const inputHandler = new InputHandler();

  // Create observers
  const logger = new ConsoleLogger();
  const stepCounter = new StepCounter();
  const calorieTracker = new CalorieTracker();

  // Register observers
  tracker.addObserver(logger);
  tracker.addObserver(stepCounter);
  tracker.addObserver(calorieTracker);

  console.log("=== Fitness Tracker ===");
  console.log("Enter your fitness activities to track them.\n");

  let continueAdding = true;

  while (continueAdding) {
    const activity = await inputHandler.promptForActivity();

    if (activity) {
      tracker.addActivity(activity);
      console.log("\nActivity added successfully!");
    }

    continueAdding = await inputHandler.promptContinue();
  }

  // Display summary
  console.log("\n=== Activity Summary ===");
  console.log(`Total activities: ${tracker.getActivities().length}`);
  console.log(`Total steps: ${stepCounter.getTotalSteps()}`);
  console.log(`Total calories: ${calorieTracker.getTotalCalories()}`);

  inputHandler.close();
}

main().catch(console.error);

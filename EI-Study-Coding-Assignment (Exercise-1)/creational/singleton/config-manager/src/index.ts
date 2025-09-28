import { ConfigManager } from "./services/ConfigManager";
import { InputHandler } from "./utils/InputHandler";

async function main() {
  const configManager = ConfigManager.getInstance();
  const inputHandler = new InputHandler();

  console.log("Welcome to Configuration Manager!");
  console.log(
    "This application uses the Singleton pattern to manage settings.\n"
  );

  let running = true;

  while (running) {
    const action = await inputHandler.promptForAction();

    switch (action) {
      case "1": // Set configuration
        const entry = await inputHandler.promptForConfigEntry();
        if (entry) {
          configManager.set(entry.key, entry.value);
        }
        break;

      case "2": // Get configuration
        const key = await inputHandler.promptForKey();
        const value = configManager.get(key);
        if (value !== undefined) {
          console.log(`\n${key}: ${value} (${typeof value})`);
        } else {
          console.log(`\nConfiguration key '${key}' not found`);
        }
        break;

      case "3": // List all configurations
        configManager.printAll();
        break;

      case "4": // Delete configuration
        const deleteKey = await inputHandler.promptForKey();
        const deleted = configManager.delete(deleteKey);
        if (!deleted) {
          console.log(`\nConfiguration key '${deleteKey}' not found`);
        }
        break;

      case "5": // Clear all configurations
        const confirm = await inputHandler.promptInput("Are you sure? (y/n): ");
        if (confirm.toLowerCase() === "y") {
          configManager.clear();
        }
        break;

      case "6": // Exit
        running = false;
        break;

      default:
        console.log("Invalid option. Please try again.");
    }

    if (running && action !== "6") {
      running = await inputHandler.promptContinue();
    }
  }

  console.log("\nThank you for using Configuration Manager!");
  inputHandler.close();
}

main().catch(console.error);

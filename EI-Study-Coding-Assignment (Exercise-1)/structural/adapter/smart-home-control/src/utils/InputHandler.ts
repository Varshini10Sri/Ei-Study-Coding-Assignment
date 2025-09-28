import * as readline from "readline";

export class InputHandler {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async promptForAction(): Promise<string> {
    console.log("\n=== Smart Home Control System ===");
    console.log("1. Add a device");
    console.log("2. Remove a device");
    console.log("3. Turn on a device");
    console.log("4. Turn off a device");
    console.log("5. Check device status");
    console.log("6. List all devices");
    console.log("7. Exit");

    const choice = await this.promptInput("Select an option (1-7): ");
    return choice.trim();
  }

  async promptForDeviceType(): Promise<string> {
    console.log("\n=== Device Type ===");
    console.log("1. Philips Hue Light");
    console.log("2. Nest Thermostat");
    console.log("3. Ring Camera");

    const choice = await this.promptInput("Select device type (1-3): ");
    if (choice === "1") return "philips-hue";
    if (choice === "2") return "nest";
    if (choice === "3") return "ring";

    console.log("Invalid option. Please try again.");
    return this.promptForDeviceType();
  }

  async promptForDeviceName(): Promise<string> {
    return await this.promptInput("Enter a name for the device: ");
  }

  async promptForExistingDevice(deviceNames: string[]): Promise<string> {
    console.log("\nAvailable devices:");
    deviceNames.forEach((name, index) => {
      console.log(`${index + 1}. ${name}`);
    });

    const choice = await this.promptInput(
      "Select a device (enter number or name): "
    );

    // Check if input is a number
    const index = parseInt(choice) - 1;
    if (!isNaN(index) && index >= 0 && index < deviceNames.length) {
      return deviceNames[index];
    }

    // Check if input is a device name
    if (deviceNames.includes(choice)) {
      return choice;
    }

    console.log("Invalid device. Please try again.");
    return this.promptForExistingDevice(deviceNames);
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

import * as readline from "readline";
import { TravelOptions } from "../models/TravelOptions.js";

export class InputHandler {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async promptForTravelOptions(): Promise<TravelOptions> {
    console.log("\n=== Smart Travel Planner ===");
    console.log("Let's plan your journey! Please provide the following details:\n");

    const origin = await this.promptInput("Origin location: ");
    const destination = await this.promptInput("Destination location: ");
    
    // For now, we'll use a simple distance calculation
    // In a real app, you'd use a geocoding service
    const distance = await this.calculateDistance(origin, destination);
    
    console.log(`\n Distance from ${origin} to ${destination}: ${distance} km\n`);

    const budget = parseFloat(await this.promptInput("Budget ($): "));
    const timeLimit = parseFloat(
      await this.promptInput("Time limit (hours): ")
    );
    const passengers = parseInt(
      await this.promptInput("Number of passengers: ")
    );

    console.log("\nNow, let us know your preferences:\n");

    const costPreference = (await this.promptForPreference("Cost preference", [
      "low",
      "medium",
      "high",
    ])) as "low" | "medium" | "high";

    const timePreference = (await this.promptForPreference("Time preference", [
      "fast",
      "moderate",
      "slow",
    ])) as "fast" | "moderate" | "slow";

    const comfortPreference = (await this.promptForPreference(
      "Comfort preference",
      ["basic", "standard", "luxury"]
    )) as "basic" | "standard" | "luxury";

    return {
      origin,
      destination,
      distance,
      budget,
      timeLimit,
      passengers,
      preferences: {
        cost: costPreference,
        time: timePreference,
        comfort: comfortPreference,
      },
    };
  }

  private async calculateDistance(origin: string, destination: string): Promise<number> {
    // Simple mock distance calculation based on city names
    // In a real application, you would use a geocoding service like Google Maps API
    const cityDistances: { [key: string]: { [key: string]: number } } = {
      "New York": { "Los Angeles": 3944, "Chicago": 790, "Miami": 1289, "Seattle": 2851 },
      "Los Angeles": { "New York": 3944, "Chicago": 2015, "Miami": 2342, "Seattle": 960 },
      "Chicago": { "New York": 790, "Los Angeles": 2015, "Miami": 1190, "Seattle": 1721 },
      "Miami": { "New York": 1289, "Los Angeles": 2342, "Chicago": 1190, "Seattle": 2734 },
      "Seattle": { "New York": 2851, "Los Angeles": 960, "Chicago": 1721, "Miami": 2734 }
    };

    // Normalize city names for lookup
    const normalizeCity = (city: string) => {
      return city.split(',')[0].trim();
    };

    const originCity = normalizeCity(origin);
    const destCity = normalizeCity(destination);

    // Check if we have a direct distance
    if (cityDistances[originCity] && cityDistances[originCity][destCity]) {
      return cityDistances[originCity][destCity];
    }
    if (cityDistances[destCity] && cityDistances[destCity][originCity]) {
      return cityDistances[destCity][originCity];
    }

    // Default distance for unknown cities
    return 500;
  }

  async promptForPreference(label: string, options: string[]): Promise<string> {
    console.log(`${label}:`);
    options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });

    const choice = parseInt(await this.promptInput("Select an option: "));
    if (choice < 1 || choice > options.length) {
      console.log("Invalid option. Please try again.");
      return this.promptForPreference(label, options);
    }

    return options[choice - 1];
  }

  async promptInput(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async promptContinue(): Promise<boolean> {
    const answer = await this.promptInput("Plan another trip? (y/n): ");
    return answer.toLowerCase() === "y";
  }

  close(): void {
    this.rl.close();
  }
}

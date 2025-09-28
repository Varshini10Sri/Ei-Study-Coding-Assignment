import { TravelPlanner } from "./context/TravelPlanner.js";
import { CarStrategy } from "./strategies/CarStrategy.js";
import { PlaneStrategy } from "./strategies/PlaneStrategy.js";
import { TrainStrategy } from "./strategies/TrainStrategy.js";
import { BusStrategy } from "./strategies/BusStrategy.js";
import { InputHandler } from "./utils/InputHandler.js";
async function main() {
    const planner = new TravelPlanner();
    const inputHandler = new InputHandler();
    // Add strategies
    planner.addStrategy(new CarStrategy());
    planner.addStrategy(new PlaneStrategy());
    planner.addStrategy(new TrainStrategy());
    planner.addStrategy(new BusStrategy());
    console.log("Welcome to Smart Travel Planner!");
    console.log("=".repeat(50));
    console.log("Plan your journey with multiple transport options:");
    console.log("• Car - Flexible and comfortable for short-medium distances");
    console.log("• Plane - Fastest for long distances");
    console.log("• Train - Eco-friendly and scenic");
    console.log("• Bus - Most economical option");
    console.log("=".repeat(50));
    console.log("We'll calculate distance, cost, time, and comfort for each option!\n");
    let planning = true;
    while (planning) {
        const options = await inputHandler.promptForTravelOptions();
        const results = planner.planTrip(options);
        console.log("\n=== Available Transport Options ===");
        console.log("Here are your travel options with detailed information:\n");
        // Display results
        results.forEach((result, index) => {
            console.log(`${index + 1}. ${result.strategy.toUpperCase()}`);
            console.log(`   Route: ${options.origin} → ${options.destination}`);
            console.log(`   Distance: ${options.distance} km`);
            console.log(`   Cost: $${result.cost}`);
            console.log(`   Time: ${result.time} hours`);
            console.log(`   Comfort: ${result.comfort}/10`);
            console.log(`   Suitability: ${result.suitability}%`);
            console.log(`   ${result.description}`);
            console.log("");
        });
        // Highlight the best option
        const bestOption = results[0];
        console.log("=".repeat(60));
        console.log(`RECOMMENDED: ${bestOption.strategy.toUpperCase()}`);
        console.log(`   Best match with ${bestOption.suitability}% suitability`);
        console.log(`   Cost: $${bestOption.cost} | Time: ${bestOption.time} hours | Comfort: ${bestOption.comfort}/10`);
        console.log("=".repeat(60));
        planning = await inputHandler.promptContinue();
    }
    console.log("\nThank you for using Smart Travel Planner!");
    inputHandler.close();
}
main().catch(console.error);

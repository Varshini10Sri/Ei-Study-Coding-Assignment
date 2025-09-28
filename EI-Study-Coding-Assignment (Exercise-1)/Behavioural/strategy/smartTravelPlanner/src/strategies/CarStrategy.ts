import { TravelStrategy } from "../models/TravelStrategy.js";
import { TravelOptions } from "../models/TravelOptions.js";

export class CarStrategy implements TravelStrategy {
  name = "Car";

  calculate(options: TravelOptions) {
    // Base cost: $0.15 per km + $0.10 per passenger
    const cost = options.distance * 0.15 + options.passengers * 0.1;

    // Time: 60 km/h average speed
    const time = options.distance / 60;

    // Comfort: 7/10 for car
    const comfort = 7;

    // Calculate suitability based on user preferences
    let suitability = 50;

    // Cost preference
    if (options.preferences.cost === "low" && cost < 50) suitability += 20;
    if (options.preferences.cost === "medium" && cost >= 50 && cost < 100)
      suitability += 15;
    if (options.preferences.cost === "high" && cost >= 100) suitability += 10;

    // Time preference
    if (options.preferences.time === "fast" && time < 3) suitability += 20;
    if (options.preferences.time === "moderate" && time >= 3 && time < 6)
      suitability += 15;
    if (options.preferences.time === "slow" && time >= 6) suitability += 10;

    // Comfort preference
    if (options.preferences.comfort === "basic") suitability += 5;
    if (options.preferences.comfort === "standard") suitability += 15;
    if (options.preferences.comfort === "luxury") suitability += 10;

    // Distance factor
    if (options.distance < 500) suitability += 10;
    if (options.distance > 1000) suitability -= 20;

    // Cap suitability at 100
    suitability = Math.min(100, Math.max(0, suitability));

    return {
      cost: Math.round(cost),
      time: parseFloat(time.toFixed(1)),
      comfort,
      suitability,
      description: `Travel by car from ${options.origin} to ${options.destination} (${options.distance}km). Estimated cost: $${Math.round(cost)}, time: ${time.toFixed(1)} hours.`,
    };
  }
}

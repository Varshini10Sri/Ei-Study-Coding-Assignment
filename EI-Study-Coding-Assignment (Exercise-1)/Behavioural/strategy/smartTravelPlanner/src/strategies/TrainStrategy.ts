import { TravelStrategy } from "../models/TravelStrategy.js";
import { TravelOptions } from "../models/TravelOptions.js";

export class TrainStrategy implements TravelStrategy {
  name = "Train";

  calculate(options: TravelOptions) {
    // Base cost: $50 + $0.10 per km + $20 per passenger
    const cost = 50 + options.distance * 0.1 + options.passengers * 20;

    // Time: 100 km/h average speed
    const time = options.distance / 100;

    // Comfort: 6/10 for train
    const comfort = 6;

    // Calculate suitability based on user preferences
    let suitability = 50;

    // Cost preference
    if (options.preferences.cost === "low" && cost < 150) suitability += 20;
    if (options.preferences.cost === "medium" && cost >= 150 && cost < 300)
      suitability += 15;
    if (options.preferences.cost === "high" && cost >= 300) suitability += 5;

    // Time preference
    if (options.preferences.time === "fast" && time < 4) suitability += 10;
    if (options.preferences.time === "moderate" && time >= 4 && time < 8)
      suitability += 20;
    if (options.preferences.time === "slow" && time >= 8) suitability += 15;

    // Comfort preference
    if (options.preferences.comfort === "basic") suitability += 10;
    if (options.preferences.comfort === "standard") suitability += 20;
    if (options.preferences.comfort === "luxury") suitability += 10;

    // Distance factor
    if (options.distance > 200 && options.distance < 800) suitability += 15;
    if (options.distance > 1000) suitability -= 10;

    // Cap suitability at 100
    suitability = Math.min(100, Math.max(0, suitability));

    return {
      cost: Math.round(cost),
      time: parseFloat(time.toFixed(1)),
      comfort,
      suitability,
      description: `Travel by train from ${options.origin} to ${options.destination} (${options.distance}km). Estimated cost: $${Math.round(cost)}, time: ${time.toFixed(1)} hours.`,
    };
  }
}

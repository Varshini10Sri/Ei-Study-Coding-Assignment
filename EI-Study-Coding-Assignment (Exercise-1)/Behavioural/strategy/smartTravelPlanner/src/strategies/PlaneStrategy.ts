import { TravelStrategy } from "../models/TravelStrategy.js";
import { TravelOptions } from "../models/TravelOptions.js";

export class PlaneStrategy implements TravelStrategy {
  name = "Plane";

  calculate(options: TravelOptions) {
    // Base cost: $100 + $0.20 per km + $50 per passenger
    const cost = 100 + options.distance * 0.2 + options.passengers * 50;

    // Time: 1 hour boarding + flight time (800 km/h)
    const time = 1 + options.distance / 800;

    // Comfort: 8/10 for plane
    const comfort = 8;

    // Calculate suitability based on user preferences
    let suitability = 50;

    // Cost preference
    if (options.preferences.cost === "low" && cost < 200) suitability += 10;
    if (options.preferences.cost === "medium" && cost >= 200 && cost < 500)
      suitability += 15;
    if (options.preferences.cost === "high" && cost >= 500) suitability += 20;

    // Time preference
    if (options.preferences.time === "fast" && time < 5) suitability += 30;
    if (options.preferences.time === "moderate" && time >= 5 && time < 10)
      suitability += 20;
    if (options.preferences.time === "slow" && time >= 10) suitability += 5;

    // Comfort preference
    if (options.preferences.comfort === "basic") suitability += 5;
    if (options.preferences.comfort === "standard") suitability += 15;
    if (options.preferences.comfort === "luxury") suitability += 25;

    // Distance factor
    if (options.distance > 500) suitability += 20;
    if (options.distance < 300) suitability -= 15;

    // Cap suitability at 100
    suitability = Math.min(100, Math.max(0, suitability));

    return {
      cost: Math.round(cost),
      time: parseFloat(time.toFixed(1)),
      comfort,
      suitability,
      description: `Travel by plane from ${options.origin} to ${options.destination} (${options.distance}km). Estimated cost: $${Math.round(cost)}, time: ${time.toFixed(1)} hours.`,
    };
  }
}

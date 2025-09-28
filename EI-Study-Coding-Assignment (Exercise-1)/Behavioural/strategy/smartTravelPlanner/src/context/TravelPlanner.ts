import { TravelStrategy } from "../models/TravelStrategy.js";
import { TravelOptions } from "../models/TravelOptions.js";

export class TravelPlanner {
  private strategies: TravelStrategy[] = [];

  addStrategy(strategy: TravelStrategy): void {
    this.strategies.push(strategy);
  }

  planTrip(options: TravelOptions) {
    const results = this.strategies.map((strategy) => {
      const result = strategy.calculate(options);
      return {
        strategy: strategy.name,
        ...result,
      };
    });

    // Sort by suitability (highest first)
    results.sort((a, b) => b.suitability - a.suitability);

    return results;
  }
}

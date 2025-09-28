export class TravelPlanner {
    strategies = [];
    addStrategy(strategy) {
        this.strategies.push(strategy);
    }
    planTrip(options) {
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

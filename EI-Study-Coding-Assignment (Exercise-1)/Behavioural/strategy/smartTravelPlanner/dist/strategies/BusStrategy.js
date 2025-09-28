export class BusStrategy {
    name = "Bus";
    calculate(options) {
        // Base cost: $30 + $0.08 per km + $15 per passenger
        const cost = 30 + options.distance * 0.08 + options.passengers * 15;
        // Time: 80 km/h average speed + 30 min stops
        const time = options.distance / 80 + 0.5;
        // Comfort: 5/10 for bus
        const comfort = 5;
        // Calculate suitability based on user preferences
        let suitability = 50;
        // Cost preference
        if (options.preferences.cost === "low" && cost < 100)
            suitability += 25;
        if (options.preferences.cost === "medium" && cost >= 100 && cost < 200)
            suitability += 20;
        if (options.preferences.cost === "high" && cost >= 200)
            suitability += 5;
        // Time preference
        if (options.preferences.time === "fast" && time < 6)
            suitability += 10;
        if (options.preferences.time === "moderate" && time >= 6 && time < 12)
            suitability += 20;
        if (options.preferences.time === "slow" && time >= 12)
            suitability += 15;
        // Comfort preference
        if (options.preferences.comfort === "basic")
            suitability += 20;
        if (options.preferences.comfort === "standard")
            suitability += 10;
        if (options.preferences.comfort === "luxury")
            suitability += 5;
        // Distance factor
        if (options.distance > 100 && options.distance < 600)
            suitability += 15;
        if (options.distance > 1000)
            suitability -= 10;
        // Cap suitability at 100
        suitability = Math.min(100, Math.max(0, suitability));
        return {
            cost: Math.round(cost),
            time: parseFloat(time.toFixed(1)),
            comfort,
            suitability,
            description: `Travel by bus from ${options.origin} to ${options.destination} (${options.distance}km). Estimated cost: $${Math.round(cost)}, time: ${time.toFixed(1)} hours.`,
        };
    }
}

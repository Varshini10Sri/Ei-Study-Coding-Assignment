export interface TravelOptions {
  origin: string;
  destination: string;
  distance: number; // in kilometers
  budget: number; // in dollars
  timeLimit: number; // in hours
  passengers: number;
  preferences: {
    cost: "low" | "medium" | "high";
    time: "fast" | "moderate" | "slow";
    comfort: "basic" | "standard" | "luxury";
  };
}

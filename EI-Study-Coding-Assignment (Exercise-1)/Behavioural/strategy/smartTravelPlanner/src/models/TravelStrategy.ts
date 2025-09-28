import { TravelOptions } from "./TravelOptions";

export interface TravelStrategy {
  name: string;
  calculate(options: TravelOptions): {
    cost: number;
    time: number; // in hours
    comfort: number; // 1-10 rating
    suitability: number; // 0-100 percentage
    description: string;
  };
}

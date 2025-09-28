import { Observer } from "../models/Observer";
import { Activity } from "../models/Activity";

export class StepCounter implements Observer {
  private totalSteps = 0;

  update(activity: Activity): void {
    // Estimate steps (rough calculation: 1300 steps per km for walking/running)
    const stepsPerKm = 1300;
    this.totalSteps += Math.round(activity.distance * stepsPerKm);
    console.log(`[Step Counter] Total steps: ${this.totalSteps}`);
  }

  getTotalSteps(): number {
    return this.totalSteps;
  }
}

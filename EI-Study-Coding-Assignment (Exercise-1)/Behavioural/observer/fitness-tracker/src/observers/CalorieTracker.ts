import { Observer } from "../models/Observer";
import { Activity } from "../models/Activity";

export class CalorieTracker implements Observer {
  private totalCalories = 0;

  update(activity: Activity): void {
    this.totalCalories += activity.calories;
    console.log(`[Calorie Tracker] Total calories: ${this.totalCalories}`);
  }

  getTotalCalories(): number {
    return this.totalCalories;
  }
}

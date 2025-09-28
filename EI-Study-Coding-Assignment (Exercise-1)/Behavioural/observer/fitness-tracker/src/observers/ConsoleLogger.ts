import { Observer } from "../models/Observer";
import { Activity } from "../models/Activity";

export class ConsoleLogger implements Observer {
  update(activity: Activity): void {
    console.log(`[Activity Logged] ${activity.type} - ${activity.duration}min`);
  }
}

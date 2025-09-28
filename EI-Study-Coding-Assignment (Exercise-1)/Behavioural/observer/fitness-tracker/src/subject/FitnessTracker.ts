import { Observer } from "../models/Observer";
import { Activity } from "../models/Activity";

export class FitnessTracker {
  private activities: Activity[] = [];
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  private notifyObservers(activity: Activity): void {
    this.observers.forEach((observer) => observer.update(activity));
  }

  addActivity(activity: Activity): void {
    this.activities.push(activity);
    this.notifyObservers(activity);
  }

  getActivities(): Activity[] {
    return this.activities;
  }
}

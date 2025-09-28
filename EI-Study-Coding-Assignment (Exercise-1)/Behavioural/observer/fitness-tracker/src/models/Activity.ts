export interface Activity {
  id: string;
  type: "running" | "cycling" | "swimming" | "walking";
  duration: number; // in minutes
  calories: number;
  distance: number; // in kilometers
  date: Date;
}

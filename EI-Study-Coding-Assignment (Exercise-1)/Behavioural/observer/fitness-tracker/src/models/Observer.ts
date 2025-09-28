import { Activity } from "./Activity";

export interface Observer {
  update(activity: Activity): void;
}

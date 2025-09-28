import { SmartDevice } from "../../interfaces/SmartDevice.js";
import { PhilipsHueLight } from "./PhilipsHueLight.js";

export class PhilipsHueLightAdapter implements SmartDevice {
  private light: PhilipsHueLight;

  constructor(light: PhilipsHueLight) {
    this.light = light;
  }

  turnOn(): void {
    this.light.setPower(true);
  }

  turnOff(): void {
    this.light.setPower(false);
  }

  getStatus(): string {
    const powerStatus = this.light.getPowerStatus() ? "ON" : "OFF";
    const brightness = this.light.getBrightness();
    return `Philips Hue Light is ${powerStatus} with brightness ${brightness}%`;
  }
}

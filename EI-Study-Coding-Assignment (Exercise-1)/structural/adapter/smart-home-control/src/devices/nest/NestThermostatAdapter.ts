import { SmartDevice } from "../../interfaces/SmartDevice.js";
import { NestThermostat } from "./NestThermostat.js";

export class NestThermostatAdapter implements SmartDevice {
  private thermostat: NestThermostat;

  constructor(thermostat: NestThermostat) {
    this.thermostat = thermostat;
  }

  turnOn(): void {
    this.thermostat.activateHeating();
  }

  turnOff(): void {
    this.thermostat.deactivateHeating();
  }

  getStatus(): string {
    const heatingStatus = this.thermostat.isHeatingActive() ? "ON" : "OFF";
    const temperature = this.thermostat.getCurrentTemperature();
    return `Nest Thermostat is ${heatingStatus}, current temperature: ${temperature}°C`;
  }
}

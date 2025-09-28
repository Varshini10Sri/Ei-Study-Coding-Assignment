export class NestThermostat {
  private isOn: boolean = false;
  private temperature: number = 22; // Celsius

  activateHeating(): void {
    this.isOn = true;
    console.log("Nest Thermostat heating activated");
  }

  deactivateHeating(): void {
    this.isOn = false;
    console.log("Nest Thermostat heating deactivated");
  }

  setTemperature(temp: number): void {
    this.temperature = temp;
    console.log(`Nest Thermostat temperature set to ${temp}°C`);
  }

  isHeatingActive(): boolean {
    return this.isOn;
  }

  getCurrentTemperature(): number {
    return this.temperature;
  }
}

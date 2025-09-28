export class PhilipsHueLight {
  private isOn: boolean = false;
  private brightness: number = 50; // 0-100

  setPower(power: boolean): void {
    this.isOn = power;
    console.log(`Philips Hue Light is now ${power ? "ON" : "OFF"}`);
  }

  setBrightness(brightness: number): void {
    this.brightness = brightness;
    console.log(`Philips Hue Light brightness set to ${brightness}%`);
  }

  getPowerStatus(): boolean {
    return this.isOn;
  }

  getBrightness(): number {
    return this.brightness;
  }
}

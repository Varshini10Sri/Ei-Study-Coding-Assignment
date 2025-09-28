import { SmartDevice } from "../interfaces/SmartDevice.js";

export class SmartHomeController {
  private devices: Map<string, SmartDevice> = new Map();

  addDevice(name: string, device: SmartDevice): void {
    this.devices.set(name, device);
    console.log(`Device '${name}' added to the smart home system`);
  }

  removeDevice(name: string): boolean {
    if (this.devices.has(name)) {
      this.devices.delete(name);
      console.log(`Device '${name}' removed from the smart home system`);
      return true;
    }
    return false;
  }

  turnOnDevice(name: string): boolean {
    const device = this.devices.get(name);
    if (device) {
      device.turnOn();
      return true;
    }
    return false;
  }

  turnOffDevice(name: string): boolean {
    const device = this.devices.get(name);
    if (device) {
      device.turnOff();
      return true;
    }
    return false;
  }

  getDeviceStatus(name: string): string | null {
    const device = this.devices.get(name);
    if (device) {
      return device.getStatus();
    }
    return null;
  }

  listDevices(): string[] {
    return Array.from(this.devices.keys());
  }
}

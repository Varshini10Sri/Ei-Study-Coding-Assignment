export interface SmartDevice {
  turnOn(): void;
  turnOff(): void;
  getStatus(): string;
}

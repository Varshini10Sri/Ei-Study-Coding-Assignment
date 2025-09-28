# Smart Home Control System

The Smart Home Control System is a TypeScript-based console application that demonstrates the **Adapter Design Pattern** for controlling smart devices from different manufacturers. It provides a unified interface to manage Philips Hue lights, Nest thermostats, and Ring cameras through a single command-line interface. The system showcases how adapters can bridge incompatible interfaces while maintaining clean, extensible code architecture.

---

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)
* [Command Examples](#command-examples)
* [Design Overview](#design-overview)
* [Adapter Pattern Implementation](#adapter-pattern-implementation)
* [Supported Devices](#supported-devices)
* [Error Handling](#error-handling)
* [Sample Output](#sample-output)

---

## Features

* **Multi-Brand Device Support:** Control Philips Hue, Nest, and Ring devices through a unified interface
* **Device Management:** Add, remove, and list smart devices in your home system
* **Device Control:** Turn devices on/off and check their current status
* **Interactive CLI:** User-friendly command-line interface with guided prompts
* **Adapter Pattern:** Demonstrates how to integrate incompatible device APIs
* **Type Safety:** Full TypeScript implementation with strict type checking

---

### Project Structure

```
src/
├── controllers/
│   └── SmartHomeController.ts    # Central device management
├── devices/
│   ├── nest/
│   │   ├── NestThermostat.ts     # Native Nest API
│   │   └── NestThermostatAdapter.ts  # Nest adapter
│   ├── philips-hue/
│   │   ├── PhilipsHueLight.ts    # Native Philips Hue API
│   │   └── PhilipsHueLightAdapter.ts # Philips Hue adapter
│   └── ring/
│       ├── RingCamera.ts         # Native Ring API
│       └── RingCameraAdapter.ts  # Ring adapter
├── interfaces/
│   └── SmartDevice.ts           # Standard device interface
├── utils/
│   └── InputHandler.ts          # CLI input handling
└── index.ts                     # Application entry point
```


## Prerequisites

* **Node.js** (v16 or higher)
* **TypeScript** (latest stable version)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/smart-home-control.git
   ```

2. Navigate to the project directory:

   ```bash
   cd smart-home-control
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

---

## Usage

1. Start the application:

   ```bash
   npm run dev
   ```

2. Follow the interactive menu to:
   * Add devices from different manufacturers
   * Control device power states (on/off)
   * Check device status and configurations
   * Remove devices from the system
   * List all connected devices

---

## Command Examples

| Action | Description |
|--------|-------------|
| `1` | Add a new device to the system |
| `2` | Remove an existing device |
| `3` | Turn on a selected device |
| `4` | Turn off a selected device |
| `5` | Check the status of a device |
| `6` | List all connected devices |
| `7` | Exit the application |

### Device Type Selection

| Option | Device Type | Example Usage |
|--------|-------------|---------------|
| `1` | Philips Hue Light | Control brightness and power |
| `2` | Nest Thermostat | Manage heating and temperature |
| `3` | Ring Camera | Control recording and night vision |

---

## Design Overview

The system implements the **Adapter Design Pattern** to create a unified interface for controlling devices from different manufacturers. The architecture consists of:

* **SmartDevice Interface:** Defines the standard contract (`turnOn()`, `turnOff()`, `getStatus()`)
* **Device Classes:** Native implementations with manufacturer-specific APIs
* **Adapter Classes:** Bridge between the standard interface and device-specific APIs
* **SmartHomeController:** Central management system for all devices
* **InputHandler:** CLI interface for user interaction
---

## Adapter Pattern Implementation

The Adapter Pattern allows incompatible interfaces to work together by creating a wrapper that translates requests. In this system:

### Key Components

1. **Target Interface (`SmartDevice`)**
   ```typescript
   interface SmartDevice {
     turnOn(): void;
     turnOff(): void;
     getStatus(): string;
   }
   ```

2. **Adaptees (Device Classes)**
   - `PhilipsHueLight`: Uses `setPower()`, `setBrightness()` methods
   - `NestThermostat`: Uses `activateHeating()`, `setTemperature()` methods  
   - `RingCamera`: Uses `startRecording()`, `enableNightVision()` methods

3. **Adapters**
   - `PhilipsHueLightAdapter`: Translates `turnOn()` → `setPower(true)`
   - `NestThermostatAdapter`: Translates `turnOn()` → `activateHeating()`
   - `RingCameraAdapter`: Translates `turnOn()` → `startRecording()` + `enableNightVision()`

### Benefits

* **Unified Interface:** All devices respond to the same commands
* **Extensibility:** New devices can be added without modifying existing code
* **Maintainability:** Device-specific logic is encapsulated in adapters
* **Flexibility:** Easy to swap or upgrade individual devices

---

## Supported Devices

### Philips Hue Light
- **Power Control:** Turn lights on/off
- **Brightness:** Adjustable from 0-100%
- **Status:** Shows current power state and brightness level

### Nest Thermostat  
- **Heating Control:** Activate/deactivate heating system
- **Temperature:** Set and monitor current temperature
- **Status:** Shows heating state and current temperature

### Ring Camera
- **Recording:** Start/stop video recording
- **Night Vision:** Enable/disable night vision mode
- **Status:** Shows recording and night vision states

---

## Error Handling

* **Invalid Input:** Menu options outside valid range trigger re-prompting
* **Device Management:** Graceful handling of non-existent devices
* **Type Safety:** TypeScript ensures devices are properly typed
* **Resource Management:** Proper cleanup of readline interface on exit

---

## Sample Output

```bash
> npm run dev

=== Smart Home Control System ===
This application uses the Adapter pattern to control devices from different manufacturers.

=== Smart Home Control System ===
1. Add a device
2. Remove a device
3. Turn on a device
4. Turn off a device
5. Check device status
6. List all devices
7. Exit
Select an option (1-7): 1

=== Device Type ===
1. Philips Hue Light
2. Nest Thermostat
3. Ring Camera
Select device type (1-3): 1
Enter a name for the device: Living Room Light
Device 'Living Room Light' added to the smart home system
Continue? (y/n): y

=== Smart Home Control System ===
1. Add a device
2. Remove a device
3. Turn on a device
4. Turn off a device
5. Check device status
6. List all devices
7. Exit
Select an option (1-7): 3

Available devices:
1. Living Room Light
Select a device (enter number or name): 1
Philips Hue Light is now ON
Device 'Living Room Light' turned on
Continue? (y/n): y

=== Smart Home Control System ===
1. Add a device
2. Remove a device
3. Turn on a device
4. Turn off a device
5. Check device status
6. List all devices
7. Exit
Select an option (1-7): 5

Available devices:
1. Living Room Light
Select a device (enter number or name): 1
Status of 'Living Room Light': Philips Hue Light is ON with brightness 50%

Continue? (y/n): n

Thank you for using the Smart Home Control System!
```


This Smart Home Control System effectively demonstrates the Adapter Design Pattern's ability to create a unified interface for diverse device APIs while maintaining clean, extensible code architecture.

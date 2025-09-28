import { SmartHomeController } from "./controllers/SmartHomeController.js";
import { PhilipsHueLightAdapter } from "./devices/philips-hue/PhilipsHueLightAdapater.js";
import { PhilipsHueLight } from "./devices/philips-hue/PhilipsHueLight.js";
import { NestThermostatAdapter } from "./devices/nest/NestThermostatAdapter.js";
import { NestThermostat } from "./devices/nest/NestThermostat.js";
import { RingCameraAdapter } from "./devices/ring/RingCameraAdapter.js";
import { RingCamera } from "./devices/ring/RingCamera.js";
import { InputHandler } from "./utils/InputHandler.js";

async function main() {
  const controller = new SmartHomeController();
  const inputHandler = new InputHandler();

  console.log("=== Smart Home Control System ===");
  console.log(
    "This application uses the Adapter pattern to control devices from different manufacturers.\n"
  );

  let running = true;

  while (running) {
    const action = await inputHandler.promptForAction();

    switch (action) {
      case "1": // Add device
        const deviceType = await inputHandler.promptForDeviceType();
        const deviceName = await inputHandler.promptForDeviceName();

        switch (deviceType) {
          case "philips-hue":
            controller.addDevice(
              deviceName,
              new PhilipsHueLightAdapter(new PhilipsHueLight())
            );
            break;
          case "nest":
            controller.addDevice(
              deviceName,
              new NestThermostatAdapter(new NestThermostat())
            );
            break;
          case "ring":
            controller.addDevice(
              deviceName,
              new RingCameraAdapter(new RingCamera())
            );
            break;
        }
        break;

      case "2": // Remove device
        const deviceNames = controller.listDevices();
        if (deviceNames.length === 0) {
          console.log("No devices to remove.");
          break;
        }

        const deviceToRemove = await inputHandler.promptForExistingDevice(
          deviceNames
        );
        controller.removeDevice(deviceToRemove);
        break;

      case "3": // Turn on device
        const devicesToTurnOn = controller.listDevices();
        if (devicesToTurnOn.length === 0) {
          console.log("No devices to control.");
          break;
        }

        const deviceToTurnOn = await inputHandler.promptForExistingDevice(
          devicesToTurnOn
        );
        if (controller.turnOnDevice(deviceToTurnOn)) {
          console.log(`Device '${deviceToTurnOn}' turned on`);
        } else {
          console.log(`Failed to turn on device '${deviceToTurnOn}'`);
        }
        break;

      case "4": // Turn off device
        const devicesToTurnOff = controller.listDevices();
        if (devicesToTurnOff.length === 0) {
          console.log("No devices to control.");
          break;
        }

        const deviceToTurnOff = await inputHandler.promptForExistingDevice(
          devicesToTurnOff
        );
        if (controller.turnOffDevice(deviceToTurnOff)) {
          console.log(`Device '${deviceToTurnOff}' turned off`);
        } else {
          console.log(`Failed to turn off device '${deviceToTurnOff}'`);
        }
        break;

      case "5": // Check device status
        const devicesToCheck = controller.listDevices();
        if (devicesToCheck.length === 0) {
          console.log("No devices to check.");
          break;
        }

        const deviceToCheck = await inputHandler.promptForExistingDevice(
          devicesToCheck
        );
        const status = controller.getDeviceStatus(deviceToCheck);
        if (status) {
          console.log(`Status of '${deviceToCheck}': ${status}`);
        } else {
          console.log(`Failed to get status for device '${deviceToCheck}'`);
        }
        break;

      case "6": // List all devices
        const allDevices = controller.listDevices();
        if (allDevices.length === 0) {
          console.log("No devices found.");
        } else {
          console.log("\n=== All Devices ===");
          allDevices.forEach((device) => {
            console.log(`- ${device}`);
          });
        }
        break;

      case "7": // Exit
        running = false;
        break;

      default:
        console.log("Invalid option. Please try again.");
    }

    if (running && action !== "7") {
      running = await inputHandler.promptContinue();
    }
  }

  console.log("\nThank you for using the Smart Home Control System!");
  inputHandler.close();
}

main().catch(console.error);

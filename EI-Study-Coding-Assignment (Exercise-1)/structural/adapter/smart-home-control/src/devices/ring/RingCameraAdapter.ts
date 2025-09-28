import { SmartDevice } from "../../interfaces/SmartDevice.js";
import { RingCamera } from "./RingCamera.js";

export class RingCameraAdapter implements SmartDevice {
  private camera: RingCamera;

  constructor(camera: RingCamera) {
    this.camera = camera;
  }

  turnOn(): void {
    this.camera.startRecording();
    this.camera.enableNightVision();
  }

  turnOff(): void {
    this.camera.stopRecording();
    this.camera.disableNightVision();
  }

  getStatus(): string {
    const recordingStatus = this.camera.getRecordingStatus()
      ? "Recording"
      : "Not recording";
    const nightVisionStatus = this.camera.getNightVisionStatus()
      ? "Night vision ON"
      : "Night vision OFF";
    return `Ring Camera: ${recordingStatus}, ${nightVisionStatus}`;
  }
}

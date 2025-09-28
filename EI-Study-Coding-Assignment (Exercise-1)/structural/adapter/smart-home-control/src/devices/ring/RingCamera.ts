export class RingCamera {
  private isRecording: boolean = false;
  private nightVision: boolean = false;

  startRecording(): void {
    this.isRecording = true;
    console.log("Ring Camera started recording");
  }

  stopRecording(): void {
    this.isRecording = false;
    console.log("Ring Camera stopped recording");
  }

  enableNightVision(): void {
    this.nightVision = true;
    console.log("Ring Camera night vision enabled");
  }

  disableNightVision(): void {
    this.nightVision = false;
    console.log("Ring Camera night vision disabled");
  }

  getRecordingStatus(): boolean {
    return this.isRecording;
  }

  getNightVisionStatus(): boolean {
    return this.nightVision;
  }
}

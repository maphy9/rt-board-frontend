import Camera from "./camera";

export default class Size {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  toCameraSize(camera: Camera) {
    const cameraWidth = this.width / camera.zoom;
    const cameraHeight = this.height / camera.zoom;
    return new Size(cameraWidth, cameraHeight);
  }

  toRealSize(camera: Camera) {
    const realWidth = this.width * camera.zoom;
    const realHeight = this.height * camera.zoom;
    return new Size(realWidth, realHeight);
  }
}

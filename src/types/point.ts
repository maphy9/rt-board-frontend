import Camera from "./camera";

export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toCameraPoint(camera: Camera) {
    const cameraX = (this.x - camera.offsetX) / camera.zoom;
    const cameraY = (this.y - camera.offsetY) / camera.zoom;
    return new Point(cameraX, cameraY);
  }

  toRealPoint(camera: Camera) {
    const realX = this.x * camera.zoom + camera.offsetX;
    const realY = this.y * camera.zoom + camera.offsetY;
    return new Point(realX, realY);
  }

  getOffset(point: Point) {
    return new Point(this.x - point.x, this.y - point.y);
  }
}

export default interface Camera {
  offsetX: number;
  offsetY: number;
  zoom: number;
}

export function scaleToCamera(x: number, camera: Camera): number {
  return x / camera.zoom;
}

export function scaleToReal(x: number, camera: Camera): number {
  return x * camera.zoom;
}

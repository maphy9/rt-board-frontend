import Camera, { scaleToCamera } from "./camera";

export default interface Size {
  width: number;
  height: number;
}

export function toCameraSize(size: Size, camera: Camera): Size {
  const width = scaleToCamera(size.width, camera);
  const height = scaleToCamera(size.height, camera);
  return { width, height };
}

export function toRealSize(size: Size, camera: Camera): Size {
  return scaleSize(size, camera.zoom);
}

export function scaleSize(size: Size, scaleFactor: number): Size {
  return { width: size.width * scaleFactor, height: size.height * scaleFactor };
}

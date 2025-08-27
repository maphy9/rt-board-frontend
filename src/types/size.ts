import Camera from "./camera";

export default interface Size {
  width: number;
  height: number;
}

export function toCameraSize(size: Size, camera: Camera): Size {
  const width = size.width / camera.zoom;
  const height = size.height / camera.zoom;
  return { width, height };
}

export function toRealSize(size: Size, camera: Camera): Size {
  const width = size.width * camera.zoom;
  const height = size.height * camera.zoom;
  return { width, height };
}

import Camera from "./camera";

export default interface Point {
  x: number;
  y: number;
}

export function toCameraPoint(point: Point, camera: Camera): Point {
  const x = (point.x - camera.offsetX) / camera.zoom;
  const y = (point.y - camera.offsetY) / camera.zoom;
  return { x, y };
}

export function toRealPoint(point: Point, camera: Camera): Point {
  const x = point.x * camera.zoom + camera.offsetX;
  const y = point.y * camera.zoom + camera.offsetY;
  return { x, y };
}

export function getOffset(p1: Point, p2: Point): Point {
  const x = p1.x - p2.x;
  const y = p1.y - p2.y;
  return { x, y };
}

export function addOffset(p: Point, offset: Point): Point {
  const x = p.x + offset.x;
  const y = p.y + offset.y;
  return { x, y };
}

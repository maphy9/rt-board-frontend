import { degreeToRadian } from "@/utils/rotation";
import Camera from "./camera";
import Size from "./size";

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

export function rotateAround(p: Point, o: Point, angle: number): Point {
  const radian = degreeToRadian(angle);
  const x =
    (p.x - o.x) * Math.cos(radian) - (p.y - o.y) * Math.sin(radian) + o.x;
  const y =
    (p.x - o.x) * Math.sin(radian) + (p.y - o.y) * Math.cos(radian) + o.y;
  return { x, y };
}

export function distanceBetween(p1: Point, p2: Point) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

export function getCenter(startPosition: Point, size: Size): Point {
  const x = startPosition.x + size.width / 2;
  const y = startPosition.y + size.height / 2;
  return { x, y };
}

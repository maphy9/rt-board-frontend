import Camera from "./camera";
import Point, { toCameraPoint, toRealPoint } from "./point";
import Size from "./size";

export default interface Rectangle {
  start: Point;
  end: Point;
}

export function toCameraRectangle(
  rectangle: Rectangle,
  camera: Camera
): Rectangle {
  const start = toCameraPoint(rectangle.start, camera);
  const end = toCameraPoint(rectangle.end, camera);
  return { start, end };
}

export function toRealRectangle(
  rectangle: Rectangle,
  camera: Camera
): Rectangle {
  const start = toRealPoint(rectangle.start, camera);
  const end = toRealPoint(rectangle.end, camera);
  return { start, end };
}

export function createRectangle(p1: Point, p2: Point): Rectangle {
  let start = { ...p1 };
  let end = { ...p2 };
  if (start.x > end.x) {
    const tmp = end.x;
    end.x = start.x;
    start.x = tmp;
  }
  if (start.y > end.y) {
    const tmp = end.y;
    end.y = start.y;
    start.y = tmp;
  }
  return { start, end };
}

export function getRectangleSize(r: Rectangle): Size {
  const width = r.end.x - r.start.x;
  const height = r.end.y - r.start.y;
  return { width, height };
}

function areLinesIntersecting(l1: Point, l2: Point): boolean {
  return !(l1.y < l2.x || l1.x > l2.y || l2.y < l1.x || l2.x > l1.y);
}

export function areRectanglesIntersecting(
  r1: Rectangle,
  r2: Rectangle
): boolean {
  const horizontalLine1 = { x: r1.start.x, y: r1.end.x };
  const horizontalLine2 = { x: r2.start.x, y: r2.end.x };
  if (!areLinesIntersecting(horizontalLine1, horizontalLine2)) {
    return false;
  }
  const verticalLine1 = { x: r1.start.y, y: r1.end.y };
  const verticalLine2 = { x: r2.start.y, y: r2.end.y };
  return areLinesIntersecting(verticalLine1, verticalLine2);
}

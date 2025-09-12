import Point, { addOffset, distanceBetween } from "@/types/point";

export function degreeToRadian(angle: number): number {
  return (angle * Math.PI) / 180;
}

export function radianToDegree(radian: number): number {
  return (radian * 180) / Math.PI;
}

export function angleBetweenTwoPoints(p1: Point, p2: Point): number {
  const p3 = addOffset(p2, { x: 0, y: 30 });

  const d1 = distanceBetween(p1, p2);
  const d2 = distanceBetween(p2, p3);
  const d3 = distanceBetween(p1, p3);

  const radian = Math.acos((d1 ** 2 + d2 ** 2 - d3 ** 2) / (2 * d1 * d2));
  const angle = radianToDegree(radian);

  if (p1.x > p2.x) {
    return -angle;
  }
  return angle;
}

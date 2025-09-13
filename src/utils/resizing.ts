import { degreeToRadian } from "@/utils/rotation";
import { OBJECT_RESIZER_SIZE } from "@/constants/boardObjectConstants";
import Point, { getCenter } from "@/types/point";
import Size from "@/types/size";
import { addOffset } from "@/types/point";
import BoardObject, { Corner } from "@/types/BoardObjects/boardObject";
import { radianToDegree } from "./rotation";

export function getCornerPosition(
  objectSize: Size,
  resizerSize: number,
  corner: Corner
): Point {
  let position = { x: -OBJECT_RESIZER_SIZE, y: -OBJECT_RESIZER_SIZE };
  if (corner === "top-left") {
    position.x = -resizerSize / 2;
    position.y = -resizerSize / 2;
  }
  if (corner === "top-right") {
    position.x = objectSize.width - resizerSize / 2;
    position.y = -resizerSize / 2;
  }
  if (corner === "bottom-left") {
    position.x = -resizerSize / 2;
    position.y = objectSize.height - resizerSize / 2;
  }
  if (corner === "bottom-right") {
    position.x = objectSize.width - resizerSize / 2;
    position.y = objectSize.height - resizerSize / 2;
  }
  return position;
}

function getAdjustedPosition(newCenter: Point, newSize: Size): Point {
  return {
    x: newCenter.x - newSize.width / 2,
    y: newCenter.y - newSize.height / 2,
  };
}

function resizeTopLeft(boardObject: BoardObject, dx: number, dy: number) {
  const { width, height } = boardObject.size;
  const { minWidth, minHeight } = boardObject;
  const startPosition = boardObject.position;
  const endPosition = addOffset(startPosition, { x: width, y: height });
  const newPosition = addOffset(startPosition, { x: -dx, y: -dy });
  newPosition.x = Math.min(newPosition.x, endPosition.x - minWidth);
  newPosition.y = Math.min(newPosition.y, endPosition.y - minHeight);
  const newSize = {
    width: endPosition.x - newPosition.x,
    height: endPosition.y - newPosition.y,
  };

  const radians = degreeToRadian(boardObject.rotationAngle);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const brRelativeX = boardObject.size.width / 2;
  const brRelativeY = boardObject.size.height / 2;

  const center = getCenter(startPosition, boardObject.size);
  const brWorldX = center.x + brRelativeX * cos - brRelativeY * sin;
  const brWorldY = center.y + brRelativeX * sin + brRelativeY * cos;

  const newBrRelativeX = newSize.width / 2;
  const newBrRelativeY = newSize.height / 2;
  center.x = brWorldX - (newBrRelativeX * cos - newBrRelativeY * sin);
  center.y = brWorldY - (newBrRelativeX * sin + newBrRelativeY * cos);

  const adjustedPosition = getAdjustedPosition(center, newSize);

  return { position: adjustedPosition, size: newSize };
}

function resizeTopRight(boardObject: BoardObject, dx: number, dy: number) {
  const { width, height } = boardObject.size;
  const { minWidth, minHeight } = boardObject;
  const startPosition = boardObject.position;
  const newPosition = addOffset(startPosition, { x: width - dx, y: -dy });
  newPosition.x = Math.max(newPosition.x, startPosition.x + minWidth);
  newPosition.y = Math.min(newPosition.y, startPosition.y + height - minHeight);
  const newSize = {
    width: newPosition.x - startPosition.x,
    height: startPosition.y + height - newPosition.y,
  };
  newPosition.x = startPosition.x;

  const radians = degreeToRadian(boardObject.rotationAngle);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const blRelativeX = -boardObject.size.width / 2;
  const blRelativeY = boardObject.size.height / 2;

  const center = getCenter(startPosition, boardObject.size);
  const blWorldX = center.x + blRelativeX * cos - blRelativeY * sin;
  const blWorldY = center.y + blRelativeX * sin + blRelativeY * cos;

  const newBlRelativeX = -newSize.width / 2;
  const newBlRelativeY = newSize.height / 2;
  center.x = blWorldX - (newBlRelativeX * cos - newBlRelativeY * sin);
  center.y = blWorldY - (newBlRelativeX * sin + newBlRelativeY * cos);

  const adjustedPosition = getAdjustedPosition(center, newSize);

  return { position: adjustedPosition, size: newSize };
}

function resizeBottomLeft(boardObject: BoardObject, dx: number, dy: number) {
  const { width, height } = boardObject.size;
  const { minWidth, minHeight } = boardObject;
  const startPosition = boardObject.position;
  const newPosition = addOffset(startPosition, { x: -dx, y: height - dy });
  newPosition.x = Math.min(newPosition.x, startPosition.x + width - minWidth);
  newPosition.y = Math.max(newPosition.y, startPosition.y + minHeight);
  const newSize = {
    width: startPosition.x + width - newPosition.x,
    height: newPosition.y - startPosition.y,
  };
  newPosition.y = startPosition.y;

  const radians = degreeToRadian(boardObject.rotationAngle);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const trRelativeX = boardObject.size.width / 2;
  const trRelativeY = -boardObject.size.height / 2;

  const center = getCenter(startPosition, boardObject.size);
  const trWorldX = center.x + trRelativeX * cos - trRelativeY * sin;
  const trWorldY = center.y + trRelativeX * sin + trRelativeY * cos;

  const newTrRelativeX = newSize.width / 2;
  const newTrRelativeY = -newSize.height / 2;
  center.x = trWorldX - (newTrRelativeX * cos - newTrRelativeY * sin);
  center.y = trWorldY - (newTrRelativeX * sin + newTrRelativeY * cos);

  const adjustedPosition = getAdjustedPosition(center, newSize);

  return { position: adjustedPosition, size: newSize };
}

function resizeBottomRight(boardObject: BoardObject, dx: number, dy: number) {
  const { width, height } = boardObject.size;
  const { minWidth, minHeight } = boardObject;
  const startPosition = boardObject.position;
  const newPosition = addOffset(startPosition, {
    x: width - dx,
    y: height - dy,
  });
  newPosition.x = Math.max(newPosition.x, startPosition.x + minWidth);
  newPosition.y = Math.max(newPosition.y, startPosition.y + minHeight);
  const newSize = {
    width: newPosition.x - startPosition.x,
    height: newPosition.y - startPosition.y,
  };

  const radians = degreeToRadian(boardObject.rotationAngle);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const tlRelativeX = -boardObject.size.width / 2;
  const tlRelativeY = -boardObject.size.height / 2;

  const center = getCenter(startPosition, boardObject.size);
  const tlWorldX = center.x + tlRelativeX * cos - tlRelativeY * sin;
  const tlWorldY = center.y + tlRelativeX * sin + tlRelativeY * cos;

  const newTlRelativeX = -newSize.width / 2;
  const newTlRelativeY = -newSize.height / 2;
  center.x = tlWorldX - (newTlRelativeX * cos - newTlRelativeY * sin);
  center.y = tlWorldY - (newTlRelativeX * sin + newTlRelativeY * cos);

  const adjustedPosition = getAdjustedPosition(center, newSize);

  return { position: adjustedPosition, size: newSize };
}

function getRelativeDelta(a: number, dx: number, dy: number) {
  const signY = dy < 0 ? 1 : -1;
  const d = Math.sqrt(dx ** 2 + dy ** 2);
  const b = signY * radianToDegree(Math.acos(dx / d));
  const g = degreeToRadian(b + a);
  return { dx: Math.cos(g) * d, dy: Math.sin(g) * d };
}

export function resizeBoardObject(
  boardObject: BoardObject,
  dx: number,
  dy: number
) {
  if (dx == 0 && dy == 0) {
    return resizeTopLeft(boardObject, dx, dy);
  }
  const resizingCorner = boardObject.resizingCorner;

  const { dx: relDx, dy: relDy } = getRelativeDelta(
    boardObject.rotationAngle,
    -dx,
    -dy
  );

  if (resizingCorner === "top-left") {
    return resizeTopLeft(boardObject, -relDx, relDy);
  }
  if (resizingCorner === "top-right") {
    return resizeTopRight(boardObject, -relDx, relDy);
  }
  if (resizingCorner === "bottom-left") {
    return resizeBottomLeft(boardObject, -relDx, relDy);
  }
  if (resizingCorner === "bottom-right") {
    return resizeBottomRight(boardObject, -relDx, relDy);
  }
}

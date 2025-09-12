import { OBJECT_RESIZER_SIZE } from "@/constants/boardObjectConstants";
import Point from "@/types/point";
import Size from "@/types/size";
import { addOffset } from "@/types/point";
import BoardObject, { Corner } from "@/types/BoardObjects/boardObject";

export function getCornerPosition(
  objectPosition: Point,
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
  return { position: newPosition, size: newSize };
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
  return { position: newPosition, size: newSize };
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
  return { position: newPosition, size: newSize };
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
  return { position: startPosition, size: newSize };
}

export function resizeBoardObject(
  boardObject: BoardObject,
  dx: number,
  dy: number
) {
  const resizingCorner = boardObject.resizingCorner;

  if (resizingCorner === "top-left") {
    return resizeTopLeft(boardObject, dx, dy);
  }
  if (resizingCorner === "top-right") {
    return resizeTopRight(boardObject, dx, dy);
  }
  if (resizingCorner === "bottom-left") {
    return resizeBottomLeft(boardObject, dx, dy);
  }
  if (resizingCorner === "bottom-right") {
    return resizeBottomRight(boardObject, dx, dy);
  }
}

import React from "react";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import Camera, { scaleToCamera } from "@/types/camera";
import styles from "./styles.module.css";
import BoardObjects from "@/types/boardObjects";
import { addTextObject } from "@/state/slices/boardObjectsSlice";
import { toCameraPoint, toRealPoint } from "@/types/point";
import BoardObjectComponent from "@/components/BoardObjects/BoardObject";
import Input from "@/types/input";
import {
  createRectangle,
  getRectangleSize,
  toCameraRectangle,
} from "@/types/rectangle";
import useBoardMouse from "@/hooks/useBoardMouse";
import {
  BACKGROUND_DOT_GAP,
  BACKGROUND_DOT_SIZE,
  BACKGROUND_POSITION,
} from "@/constants/boardConstants";

function Board() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const input: Input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

  const { handleMouseMove, handleMouseDown, handleMouseUp, handleWheel } =
    useBoardMouse();

  const realSelectionRectangle = createRectangle(
    input.selectionStart,
    toRealPoint(input.mousePosition, camera)
  );
  const selectionRectangle = toCameraRectangle(realSelectionRectangle, camera);
  const selectionSize = getRectangleSize(selectionRectangle);

  const backgroundDotSize = scaleToCamera(BACKGROUND_DOT_SIZE, camera);
  const backgroundDotGap = scaleToCamera(BACKGROUND_DOT_GAP, camera);
  const backgroundPosition = toCameraPoint(BACKGROUND_POSITION, camera);

  return (
    <div
      className={styles.board}
      style={{
        backgroundImage: `radial-gradient(gray ${backgroundDotSize}px, transparent ${backgroundDotSize}px)`,
        backgroundSize: `${backgroundDotGap}px ${backgroundDotGap}px`,
        backgroundPosition: `${backgroundPosition.x}px ${backgroundPosition.y}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <button
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const x = Math.floor(Math.random() * (window.innerWidth + 1));
          const y = Math.floor(Math.random() * (window.innerHeight + 1));
          dispatch(addTextObject({ x, y }));
        }}
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        Add text object
      </button>
      {...boardObjects.order.map((id: number) => {
        const boardObject = boardObjects.objects[id];
        return <BoardObjectComponent boardObject={boardObject} />;
      })}

      {input.isSelecting ? (
        <div
          className={styles.selectionRectangle}
          style={{
            top: selectionRectangle.start.y,
            left: selectionRectangle.start.x,
            width: selectionSize.width,
            height: selectionSize.height,
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Board;

import React from "react";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import Camera from "@/types/camera";
import styles from "./styles.module.css";
import BoardObjects from "@/types/boardObjects";
import { addTextObject } from "@/state/slices/boardObjectsSlice";
import { toRealPoint } from "@/types/point";
import BoardObjectComponent from "@/components/BoardObjects/BoardObject";
import Input from "@/types/input";
import {
  createRectangle,
  getRectangleSize,
  toCameraRectangle,
} from "@/types/rectangle";
import useBoardWheel from "@/hooks/useBoardWheel";
import useBoardMouse from "@/hooks/useBoardMouse";

function Board() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const input: Input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

  const { handleMouseMove, handleMouseDown, handleMouseUp } = useBoardMouse();
  const { handleWheel } = useBoardWheel();

  const realSelectionRectangle = createRectangle(
    input.selectionStart,
    toRealPoint(input.mousePosition, camera)
  );
  const selectionRectangle = toCameraRectangle(realSelectionRectangle, camera);
  const selectionSize = getRectangleSize(selectionRectangle);

  return (
    <div
      className={styles.board}
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
          dispatch(addTextObject({ position: { x, y }, text: "Hello world" }));
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

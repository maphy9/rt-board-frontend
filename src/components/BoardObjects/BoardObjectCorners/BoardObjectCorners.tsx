import React from "react";
import BoardObjectCorner from "./BoardObjectCorner";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Input from "@/types/input";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import BoardObject from "@/types/BoardObjects/boardObject";

function BoardObjectCorners({ boardObject }: { boardObject: BoardObject }) {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const input: Input = useSelector((state: RootState) => state.input);

  const canResize =
    boardObject.isSelected &&
    !boardObject.isEditing &&
    Object.keys(boardObjects.selected).length === 1 &&
    !input.isDragging;

  return canResize ? (
    <>
      <BoardObjectCorner boardObject={boardObject} corner={"top-left"} />

      <BoardObjectCorner boardObject={boardObject} corner={"top-right"} />

      <BoardObjectCorner boardObject={boardObject} corner={"bottom-left"} />

      <BoardObjectCorner boardObject={boardObject} corner={"bottom-right"} />
    </>
  ) : (
    <></>
  );
}

export default BoardObjectCorners;

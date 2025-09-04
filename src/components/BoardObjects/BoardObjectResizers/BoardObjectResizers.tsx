import BoardObject from "@/types/boardObject";
import React from "react";
import BoardObjectResizer from "./BoardObjectResizer";
import BoardObjects from "@/types/boardObjects";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Input from "@/types/input";

function BoardObjectResizers({ boardObject }: { boardObject: BoardObject }) {
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
      <BoardObjectResizer
        boardObject={boardObject}
        resizingCorner={"top-left"}
      />

      <BoardObjectResizer
        boardObject={boardObject}
        resizingCorner={"top-right"}
      />

      <BoardObjectResizer
        boardObject={boardObject}
        resizingCorner={"bottom-left"}
      />

      <BoardObjectResizer
        boardObject={boardObject}
        resizingCorner={"bottom-right"}
      />
    </>
  ) : (
    <></>
  );
}

export default BoardObjectResizers;

import BoardObject from "@/types/boardObject";
import React from "react";
import BoardObjectResizer from "./BoardObjectResizer";

function BoardObjectResizers({ boardObject }: { boardObject: BoardObject }) {
  return (
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
  );
}

export default BoardObjectResizers;

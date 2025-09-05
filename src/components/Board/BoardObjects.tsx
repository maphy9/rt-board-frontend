import { RootState } from "@/state/store";
import React from "react";
import { useSelector } from "react-redux";
import BoardObjectComponent from "../BoardObjects/BoardObject";
import BoardObjects from "@/types/BoardObjects/boardObjects";

function BoardObjectComponents() {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );

  return (
    <>
      {boardObjects.order.map((id: string) => {
        const boardObject = boardObjects.objects[id];
        return (
          <BoardObjectComponent
            key={boardObject.id}
            boardObject={boardObject}
          />
        );
      })}
    </>
  );
}

export default BoardObjectComponents;

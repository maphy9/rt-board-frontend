import { RootState } from "@/state/store";
import BoardObjects from "@/types/boardObjects";
import React from "react";
import { useSelector } from "react-redux";
import BoardObjectComponent from "../BoardObjects/BoardObject";

function BoardObjectComponents() {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );

  return (
    <>
      {...boardObjects.order.map((id: string) => {
        const boardObject = boardObjects.objects[id];
        return <BoardObjectComponent boardObject={boardObject} />;
      })}
    </>
  );
}

export default BoardObjectComponents;

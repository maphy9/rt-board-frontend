import React, { useMemo } from "react";
import BoardObjectComponent from "../BoardObjects/BoardObject";
import useCameraObjects from "@/hooks/useCameraObjects";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

function BoardObjectComponents() {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const visibleBoardObjects = useCameraObjects();

  return useMemo(() => {
    return (
      <>
        {visibleBoardObjects.map((id: string) => {
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
  }, [visibleBoardObjects, boardObjects.objects]);
}

export default BoardObjectComponents;

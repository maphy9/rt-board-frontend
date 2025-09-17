import {
  setOldObjectState,
  setResized,
  setRotatingPoint,
} from "@/state/slices/boardObjectsSlice";
import { addHistoryItem } from "@/state/slices/historySlice";
import { setIsDragging } from "@/state/slices/inputSlice";
import { RootState } from "@/state/store";
import { boardObjectCleanCopy } from "@/types/BoardObjects/boardObject";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import Camera from "@/types/camera";
import Input from "@/types/input";
import { addOffset, toRealPoint } from "@/types/point";
import { useDispatch, useSelector } from "react-redux";

export default function useUniversalInput() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const input: Input = useSelector((state: RootState) => state.input);
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const dispatch = useDispatch();

  const stopPropagation = (event) => event.stopPropagation();

  const stopPropagationAndEdit = (event) => {
    event.stopPropagation();
    handleStopEdit();
    handleStopResize();
    handleStopRotate();
  };

  const handleStopDragging = () => {
    const draggingStart = input.draggingStart;
    const draggingEnd = toRealPoint(input.mousePosition, camera);
    const delta = {
      x: draggingStart.x - draggingEnd.x,
      y: draggingStart.y - draggingEnd.y,
    };
    const data = [];
    for (const id in boardObjects.selected) {
      const cleanCopy = boardObjectCleanCopy(boardObjects.objects[id]);
      const oldState = {
        ...cleanCopy,
        position: addOffset(cleanCopy.position, delta),
      };
      data.push({ new: cleanCopy, old: oldState });
    }
    dispatch(addHistoryItem({ type: "edit", data }));
    dispatch(setIsDragging({ isDragging: false, position: null }));
  };

  const handleStopResize = () => {
    const oldState = boardObjects.resized;
    if (oldState === null) {
      return;
    }
    const _id = oldState.id;
    const newState = boardObjectCleanCopy(boardObjects.objects[_id]);
    const data = [{ old: oldState, new: newState }];
    dispatch(addHistoryItem({ type: "edit", data }));
    dispatch(setResized(null));
  };

  const handleStopRotate = () => {
    const oldState = boardObjects.rotated;
    if (oldState === null) {
      return;
    }
    const _id = oldState.id;
    const newState = boardObjectCleanCopy(boardObjects.objects[_id]);
    const data = [{ old: oldState, new: newState }];
    dispatch(addHistoryItem({ type: "edit", data }));
    dispatch(
      setRotatingPoint({ id: boardObjects.rotated.id, rotatingPoint: null })
    );
  };

  const handleStopEdit = () => {
    if (boardObjects.oldObjectState === null) {
      return;
    }

    const _id = boardObjects.oldObjectState.id;
    const newState = boardObjectCleanCopy(boardObjects.objects[_id]);
    const data = [{ old: boardObjects.oldObjectState, new: newState }];
    dispatch(setOldObjectState(null));
    dispatch(addHistoryItem({ type: "edit", data }));
  };

  return {
    stopPropagation,
    handleStopDragging,
    handleStopResize,
    handleStopEdit,
    stopPropagationAndEdit,
    handleStopRotate,
  };
}

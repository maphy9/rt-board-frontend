import { setIsEditing } from "@/state/slices/boardObjectsSlice";
import BoardObject from "@/types/BoardObjects/boardObject";
import { useDispatch } from "react-redux";

export default function useEditEvents(boardObject: BoardObject) {
  const dispatch = useDispatch();

  const handleDoubleClick = () => {
    dispatch(setIsEditing({ id: boardObject.id, isEditing: true }));
  };

  const handleBlur = () => {
    dispatch(setIsEditing({ id: boardObject.id, isEditing: false }));
  };

  return {
    handleBlur,
    handleDoubleClick,
  };
}

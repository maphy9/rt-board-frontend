import { setIsEditing } from "@/state/slices/boardObjectsSlice";
import TextObject from "@/types/BoardObjects/textObject";
import { useDispatch } from "react-redux";
import useBoardActions from "./useBoardActions";

export default function useEditEvents(textObject: TextObject) {
  const dispatch = useDispatch();
  const { changeText } = useBoardActions();

  const handleDoubleClick = () => {
    dispatch(setIsEditing({ id: textObject.id, isEditing: true }));
  };

  const handleBlur = (newText: string) => {
    if (textObject.text !== newText) {
      changeText(textObject.id, newText);
    }
    dispatch(setIsEditing({ id: textObject.id, isEditing: false }));
  };

  return {
    handleBlur,
    handleDoubleClick,
  };
}

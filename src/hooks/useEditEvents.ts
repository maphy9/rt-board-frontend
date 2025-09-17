import { setIsEditing, setText } from "@/state/slices/boardObjectsSlice";
import { addHistoryItem } from "@/state/slices/historySlice";
import { boardObjectCleanCopy } from "@/types/BoardObjects/boardObject";
import TextObject from "@/types/BoardObjects/textObject";
import { useDispatch } from "react-redux";

export default function useEditEvents(textObject: TextObject) {
  const dispatch = useDispatch();

  const handleDoubleClick = () => {
    dispatch(setIsEditing({ id: textObject.id, isEditing: true }));
  };

  const handleBlur = (newText: string) => {
    if (textObject.text !== newText) {
      const cleanCopy = boardObjectCleanCopy(textObject);
      const data = [
        {
          old: cleanCopy,
          new: { ...cleanCopy, text: newText },
        },
      ];
      dispatch(addHistoryItem({ type: "edit", data }));
    }

    dispatch(setText({ id: textObject.id, text: newText }));
    dispatch(setIsEditing({ id: textObject.id, isEditing: false }));
  };

  return {
    handleBlur,
    handleDoubleClick,
  };
}

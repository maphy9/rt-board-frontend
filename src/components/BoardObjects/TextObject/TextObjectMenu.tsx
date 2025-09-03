import React from "react";
import BoardObjectMenu from "../Menu/BoardObjectMenu";
import TextObject from "@/types/textObject";
import FontSizeOption from "../Menu/MenuOptions/FontSizeOption";

function TextObjectMenu({ textObject }: { textObject: TextObject }) {
  return (
    <BoardObjectMenu boardObject={textObject}>
      <FontSizeOption id={textObject.id} />
    </BoardObjectMenu>
  );
}

export default TextObjectMenu;

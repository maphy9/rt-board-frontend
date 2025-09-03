import React from "react";
import BoardObjectMenu from "../Menu/BoardObjectMenu";
import TextObject from "@/types/textObject";
import FontSizeOption from "../Menu/MenuOptions/FontSizeOption";
import FontStyleOption from "../Menu/MenuOptions/FontStyleOption";
import FontColorOption from "../Menu/MenuOptions/FontColorOption";

function TextObjectMenu({ textObject }: { textObject: TextObject }) {
  return (
    <BoardObjectMenu boardObject={textObject}>
      <FontSizeOption id={textObject.id} />
      <FontStyleOption id={textObject.id} />
      <FontColorOption id={textObject.id} />
    </BoardObjectMenu>
  );
}

export default TextObjectMenu;

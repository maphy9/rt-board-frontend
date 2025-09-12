import React from "react";
import BoardObjectMenu from "../Menu/BoardObjectMenu";
import FontSizeOption from "../Menu/MenuOptions/FontSizeOption";
import FontStyleOption from "../Menu/MenuOptions/FontStyleOption";
import FontColorOption from "../Menu/MenuOptions/FontColorOption";
import OtherOption from "../Menu/MenuOptions/OtherOption";
import TextObject from "@/types/BoardObjects/textObject";

function TextObjectMenu({ textObject }: { textObject: TextObject }) {
  return (
    <BoardObjectMenu boardObject={textObject}>
      <FontSizeOption />
      <FontStyleOption />
      <FontColorOption />
      <OtherOption />
    </BoardObjectMenu>
  );
}

export default TextObjectMenu;

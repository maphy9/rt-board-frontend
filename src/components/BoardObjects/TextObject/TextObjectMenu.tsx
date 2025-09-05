import React from "react";
import BoardObjectMenu from "../Menu/BoardObjectMenu";
import FontSizeOption from "../Menu/MenuOptions/FontSizeOption";
import FontStyleOption from "../Menu/MenuOptions/FontStyleOption";
import FontColorOption from "../Menu/MenuOptions/FontColorOption";
import OtherOption from "../Menu/MenuOptions/OtherOption";
import TextObject from "@/types/BoardObjects/textObject";

function TextObjectMenu({ textObject }: { textObject: TextObject }) {
  const isOpen = false;
  const toggleIsOpen = () => {};
  return (
    <BoardObjectMenu boardObject={textObject}>
      <FontSizeOption
        id={textObject.id}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
      />
      <FontStyleOption
        id={textObject.id}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
      />
      <FontColorOption
        id={textObject.id}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
      />
      <OtherOption
        id={textObject.id}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
      />
    </BoardObjectMenu>
  );
}

export default TextObjectMenu;

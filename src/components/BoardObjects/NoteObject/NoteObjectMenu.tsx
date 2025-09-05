import React from "react";
import BoardObjectMenu from "../Menu/BoardObjectMenu";
import FontSizeOption from "../Menu/MenuOptions/FontSizeOption";
import FontStyleOption from "../Menu/MenuOptions/FontStyleOption";
import FontColorOption from "../Menu/MenuOptions/FontColorOption";
import OtherOption from "../Menu/MenuOptions/OtherOption";
import NoteObject from "@/types/BoardObjects/noteObject";
import BackgroundColorOption from "../Menu/MenuOptions/BackgroundColorOptions";

function NoteObjectMenu({ noteObject }: { noteObject: NoteObject }) {
  const isOpen = false;
  const toggleIsOpen = () => {};
  return (
    <BoardObjectMenu boardObject={noteObject}>
      <FontSizeOption
        id={noteObject.id}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
      />
      <FontStyleOption
        id={noteObject.id}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
      />
      <FontColorOption
        id={noteObject.id}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
      />
      <BackgroundColorOption
        id={noteObject.id}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
      />
      <OtherOption
        id={noteObject.id}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
      />
    </BoardObjectMenu>
  );
}

export default NoteObjectMenu;

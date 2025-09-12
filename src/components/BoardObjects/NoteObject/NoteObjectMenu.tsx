import React from "react";
import BoardObjectMenu from "../Menu/BoardObjectMenu";
import FontSizeOption from "../Menu/MenuOptions/FontSizeOption";
import FontStyleOption from "../Menu/MenuOptions/FontStyleOption";
import FontColorOption from "../Menu/MenuOptions/FontColorOption";
import OtherOption from "../Menu/MenuOptions/OtherOption";
import NoteObject from "@/types/BoardObjects/noteObject";
import BackgroundColorOption from "../Menu/MenuOptions/BackgroundColorOptions";

function NoteObjectMenu({ noteObject }: { noteObject: NoteObject }) {
  return (
    <BoardObjectMenu boardObject={noteObject}>
      <FontSizeOption />
      <FontStyleOption />
      <FontColorOption />
      <BackgroundColorOption />
      <OtherOption />
    </BoardObjectMenu>
  );
}

export default NoteObjectMenu;

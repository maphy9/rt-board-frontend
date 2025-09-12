import React from "react";
import BoardObjectMenu from "../Menu/BoardObjectMenu";
import ShapeObject from "@/types/BoardObjects/shapeObject";
import OtherOption from "../Menu/MenuOptions/OtherOption";
import BackgroundColorOption from "../Menu/MenuOptions/BackgroundColorOptions";

function ShapeObjectMenu({ shapeObject }: { shapeObject: ShapeObject }) {
  return (
    <BoardObjectMenu boardObject={shapeObject}>
      <BackgroundColorOption />
      <OtherOption />
    </BoardObjectMenu>
  );
}

export default ShapeObjectMenu;

import React from "react";
import BoardObjectMenu from "../Menu/BoardObjectMenu";
import OtherOption from "../Menu/MenuOptions/OtherOption";
import ImageObject from "@/types/BoardObjects/imageObject";

function ImageObjectMenu({ imageObject }: { imageObject: ImageObject }) {
  return (
    <BoardObjectMenu boardObject={imageObject}>
      <OtherOption />
    </BoardObjectMenu>
  );
}

export default ImageObjectMenu;

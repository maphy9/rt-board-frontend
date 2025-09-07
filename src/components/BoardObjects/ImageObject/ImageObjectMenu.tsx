import React from "react";
import BoardObjectMenu from "../Menu/BoardObjectMenu";
import OtherOption from "../Menu/MenuOptions/OtherOption";
import ImageObject from "@/types/BoardObjects/imageObject";

function ImageObjectMenu({ imageObject }: { imageObject: ImageObject }) {
  const isOpen = false;
  const toggleIsOpen = () => {};
  return (
    <BoardObjectMenu boardObject={imageObject}>
      <OtherOption
        id={imageObject.id}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
      />
    </BoardObjectMenu>
  );
}

export default ImageObjectMenu;

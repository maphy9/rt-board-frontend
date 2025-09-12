import {
  addObject,
  clearSelection,
  selectObject,
} from "@/state/slices/boardObjectsSlice";
import { setSelectedTool } from "@/state/slices/toolboxSlice";
import { RootState } from "@/state/store";
import { createBoardObject } from "@/types/BoardObjects/boardObject";
import Camera from "@/types/camera";
import { toRealPoint } from "@/types/point";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ImageUploader() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const src = URL.createObjectURL(file);
    const position = toRealPoint(input.mousePosition, camera);
    const imageObject = await createBoardObject("image", position, src);
    dispatch(addObject(imageObject));
    dispatch(setSelectedTool("cursor"));
  };

  return (
    <input
      type="file"
      accept="image/*"
      id="image-uploader"
      style={{ display: "none" }}
      onChange={handleImageUpload}
    />
  );
}

export default ImageUploader;

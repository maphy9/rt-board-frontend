import useBoardActions from "@/hooks/useBoardActions";
import { setSelectedTool } from "@/state/slices/toolboxSlice";
import { RootState } from "@/state/store";
import { createBoardObject } from "@/types/BoardObjects/boardObject";
import Camera from "@/types/camera";
import { toRealPoint } from "@/types/point";

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

function ImageUploader() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const input = useSelector((state: RootState) => state.input);
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const { addNewObject } = useBoardActions();

  const handleImageUpload = useCallback(
    async (event) => {
      const file = event.target.files[0];
      const src = URL.createObjectURL(file);
      const position = toRealPoint(input.mousePosition, camera);
      const imageObject = await createBoardObject(
        "image",
        position,
        theme,
        src
      );
      addNewObject(imageObject);
      dispatch(setSelectedTool("cursor"));
    },
    [input.mousePosition, theme]
  );

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

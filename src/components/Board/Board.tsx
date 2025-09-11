import React from "react";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import Camera, { scaleToCamera } from "@/types/camera";
import styles from "./styles.module.css";
import { toCameraPoint } from "@/types/point";
import useBoardMouse from "@/hooks/useBoardMouse";
import {
  BACKGROUND_DOT_GAP,
  BACKGROUND_DOT_SIZE,
  BACKGROUND_POSITION,
} from "@/constants/boardConstants";
import BoardObjectComponents from "./BoardObjects";
import SelectionRectangle from "./SelectionRectangle";
import SelectedToolComponent from "./SelectedTool";
import ImageUploader from "./ImageUploader";

function Board() {
  const camera: Camera = useSelector((state: RootState) => state.camera);

  const { handleMouseMove, handleMouseDown, handleMouseUp, handleWheel } =
    useBoardMouse();

  const backgroundDotSize = scaleToCamera(BACKGROUND_DOT_SIZE, camera);
  const backgroundDotGap = scaleToCamera(BACKGROUND_DOT_GAP, camera);
  const backgroundPosition = toCameraPoint(BACKGROUND_POSITION, camera);

  return (
    <div
      className={styles.board}
      style={{
        backgroundImage: `radial-gradient(gray ${backgroundDotSize}px, transparent ${backgroundDotSize}px)`,
        backgroundSize: `${backgroundDotGap}px ${backgroundDotGap}px`,
        backgroundPosition: `${backgroundPosition.x}px ${backgroundPosition.y}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <BoardObjectComponents />

      <SelectionRectangle />

      <SelectedToolComponent />

      <ImageUploader />
    </div>
  );
}

export default Board;

import React, { useRef } from "react";
import { RootState } from "./state/store";
import { useDispatch, useSelector } from "react-redux";
import { moveCamera, zoomCamera } from "./state/reducers/camera/cameraSlice";
import Point from "./types/point";
import Camera from "./types/camera";
import Size from "./types/size";
import { MAX_ZOOM, MIN_ZOOM } from "./constants/cameraConstants";

function App() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const dispatch = useDispatch();

  const mousePosition = useRef(new Point(0, 0));
  const isDraging = useRef(false);

  const handleMouseMove = (event) => {
    const { clientX: x, clientY: y } = event;
    if (!isDraging.current) {
      mousePosition.current = new Point(x, y);
      return;
    }
    const dx = (mousePosition.current.x - x) * camera.zoom;
    const dy = (mousePosition.current.y - y) * camera.zoom;
    mousePosition.current = new Point(x, y);
    dispatch(moveCamera({ dx, dy }));
  };

  const handleWheel = (event) => {
    const { deltaY } = event;
    const zoomFactor = deltaY > 0 ? 1.05 : 0.95;
    const newZoom = Math.min(
      MAX_ZOOM,
      Math.max(camera.zoom * zoomFactor, MIN_ZOOM)
    );
    const newCamera = { ...camera, zoom: newZoom };
    const mouseBefore = mousePosition.current.toRealPoint(camera);
    const mouseAfter = mousePosition.current.toRealPoint(newCamera);
    const { x: dx, y: dy } = mouseBefore.getOffset(mouseAfter);
    dispatch(zoomCamera({ zoom: newZoom, dx, dy }));
  };

  const handleMouseDown = (event) => {
    if (event.button == 1) {
      // Only pan on mouse wheel
      isDraging.current = true;
      return;
    }
  };

  const handleMouseUp = (event) => {
    if (event.button == 1) {
      // Only pan on mouse wheel
      isDraging.current = false;
      return;
    }
  };

  const rect1 = {
    position: new Point(700, 380),
    size: new Size(50, 50),
  };

  const rect2 = {
    position: new Point(900, 380),
    size: new Size(80, 50),
  };

  return (
    <div
      className="container"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <div
        style={{
          width: rect1.size.toCameraSize(camera).width,
          height: rect1.size.toCameraSize(camera).height,
          top: rect1.position.toCameraPoint(camera).y,
          left: rect1.position.toCameraPoint(camera).x,
          backgroundColor: "red",
          position: "absolute",
        }}
      />

      <div
        style={{
          width: rect2.size.toCameraSize(camera).width,
          height: rect2.size.toCameraSize(camera).height,
          top: rect2.position.toCameraPoint(camera).y,
          left: rect2.position.toCameraPoint(camera).x,
          backgroundColor: "green",
          position: "absolute",
        }}
      />
    </div>
  );
}

export default App;

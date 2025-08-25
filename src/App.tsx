import React, { useRef } from "react";
import CameraState from "./state/reducers/camera/cameraState";
import { RootState } from "./state/store";
import { useDispatch, useSelector } from "react-redux";
import { moveCamera } from "./state/reducers/camera/cameraSlice";

function realToCamera(real: number, offset: number): number {
  return real - offset;
}

function App() {
  const cameraState: CameraState = useSelector(
    (state: RootState) => state.camera
  );
  const dispatch = useDispatch();

  const lastPosition = useRef({ x: 0, y: 0 });
  const isDraging = useRef(false);
  const handleMouseMove = (event) => {
    const { clientX: x, clientY: y } = event;
    if (!isDraging.current) {
      lastPosition.current = { x, y };
      return;
    }
    const dx = lastPosition.current.x - x;
    const dy = lastPosition.current.y - y;
    dispatch(moveCamera({ dx, dy }));
    lastPosition.current = { x, y };
  };

  const rect = {
    realX: 20,
    realY: 20,
    realWidth: 50,
    realHeight: 50,
  };

  return (
    <div
      className="container"
      onMouseMove={handleMouseMove}
      onMouseDown={() => (isDraging.current = true)}
      onMouseUp={() => (isDraging.current = false)}
    >
      <div
        style={{
          width: rect.realWidth,
          height: rect.realHeight,
          top: realToCamera(rect.realY, cameraState.y),
          left: realToCamera(rect.realX, cameraState.x),
          backgroundColor: "red",
          position: "absolute",
        }}
      />
    </div>
  );
}

export default App;

import { MAX_ZOOM, MIN_ZOOM } from "@/constants/cameraConstants";
import { zoomCamera } from "@/state/reducers/camera/cameraSlice";
import { RootState } from "@/state/store";
import Camera from "@/types/camera";
import Input from "@/types/input";
import { getOffset, toRealPoint } from "@/types/point";
import { useDispatch, useSelector } from "react-redux";

function scaleZoom(zoom: number, zoomFactor: number): number {
  return Math.min(MAX_ZOOM, Math.max(zoom * zoomFactor, MIN_ZOOM));
}

export default function useBoardWheel() {
  const camera: Camera = useSelector((state: RootState) => state.camera);
  const input: Input = useSelector((state: RootState) => state.input);
  const dispatch = useDispatch();

  const handleWheel = (event) => {
    const { deltaY } = event;
    const zoomFactor = deltaY > 0 ? 1.05 : 0.95;
    const newZoom = scaleZoom(camera.zoom, zoomFactor);
    const newCamera = { ...camera, zoom: newZoom };
    const mouseBefore = toRealPoint(input.mousePosition, camera);
    const mouseAfter = toRealPoint(input.mousePosition, newCamera);
    const { x: dx, y: dy } = getOffset(mouseBefore, mouseAfter);
    dispatch(zoomCamera({ zoom: newZoom, dx, dy }));
  };

  return {
    handleWheel,
  };
}

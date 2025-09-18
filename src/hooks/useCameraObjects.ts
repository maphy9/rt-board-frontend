import { RootState } from "@/state/store";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import Camera, { scaleToReal } from "@/types/camera";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function useCameraObjects() {
  const boardObjects: BoardObjects = useSelector(
    (state: RootState) => state.boardObjects
  );
  const camera: Camera = useSelector((state: RootState) => state.camera);

  return useMemo(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const viewportLeft = camera.offsetX;
    const viewportRight = camera.offsetX + scaleToReal(windowWidth, camera);
    const viewportTop = camera.offsetY;
    const viewportBottom = camera.offsetY + scaleToReal(windowHeight, camera);

    return boardObjects.order.filter((id) => {
      const object = boardObjects.objects[id];
      return (
        object.position.x + object.size.width > viewportLeft &&
        object.position.x < viewportRight &&
        object.position.y + object.size.height > viewportTop &&
        object.position.y < viewportBottom
      );
    });
  }, [boardObjects.order, boardObjects.objects, camera]);
}

import { OBJECT_COPY_MARGIN } from "@/constants/boardObjectConstants";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import TextObject from "@/types/BoardObjects/textObject";
import { addOffset, rotateAround } from "@/types/point";
import { areRectanglesIntersecting, createRectangle } from "@/types/rectangle";
import getID from "@/utils/id";
import { resizeBoardObject } from "@/utils/resizing";
import { angleBetweenTwoPoints } from "@/utils/rotation";
import { createSlice } from "@reduxjs/toolkit";

const initialState: BoardObjects = {
  objects: {},
  order: [],
  selected: {},
  resized: null,
  rotated: null,
};

export const boardObjectsSlice = createSlice({
  name: "boardObjectsSlice",
  initialState,
  reducers: {
    addObject: (state, action) => {
      const newObject = action.payload;
      state.objects[newObject.id] = newObject;
      state.order.push(newObject.id);
    },
    deleteSelected: (state) => {
      state.order = state.order.filter((id) => !(id in state.selected));
      for (const id in state.selected) {
        const object = state.objects[id];
        if (object.type === "image") {
          URL.revokeObjectURL(object.src);
        }
        delete state.objects[id];
      }
      state.selected = {};
    },
    selectObject: (state, action) => {
      const id = action.payload;
      state.selected[id] = true;
      state.objects[id].isSelected = true;
      for (const id in state.selected) {
        state.objects[id].isEditing = false;
      }
    },
    selectObjectsInRectangle: (state, action) => {
      const selectionRectangle = action.payload;
      for (const id in state.objects) {
        const object = state.objects[id];
        const objectRectangle = createRectangle(
          object.position,
          addOffset(object.position, {
            x: object.size.width,
            y: object.size.height,
          })
        );
        if (!areRectanglesIntersecting(selectionRectangle, objectRectangle)) {
          continue;
        }
        state.selected[id] = true;
        state.objects[id].isSelected = true;
      }
      for (const id in state.selected) {
        state.objects[id].isEditing = false;
      }
    },
    unselectObject: (state, action) => {
      const id = action.payload;
      delete state.selected[id];
      state.objects[id].isSelected = false;
      state.objects[id].isEditing = false;
    },
    clearSelection: (state) => {
      for (const id in state.selected) {
        state.objects[id].isSelected = false;
        state.objects[id].isEditing = false;
      }
      state.selected = {};
    },
    dragSelected: (state, action) => {
      const { dx, dy } = action.payload;
      for (const id in state.selected) {
        state.objects[id].position.x -= dx;
        state.objects[id].position.y -= dy;
      }
    },
    setIsEditing: (state, action) => {
      const { id, isEditing } = action.payload;
      state.objects[id].isEditing = isEditing;
    },
    setText: (state, action) => {
      const { id, text } = action.payload;
      (state.objects[id] as TextObject).text = text;
    },
    setResized: (state, action) => {
      const resized = action.payload;
      if (resized === null) {
        const boardObject = state.objects[state.resized];
        boardObject.resizingCorner = null;
      }
      state.resized = resized;
    },
    setResizingCorner: (state, action) => {
      const { id, corner } = action.payload;
      state.objects[id].resizingCorner = corner;
    },
    resize: (state, action) => {
      const { dx, dy } = action.payload;
      const boardObject = state.objects[state.resized];
      const { position, size } = resizeBoardObject(boardObject, dx, dy);
      boardObject.position = position;
      boardObject.size = size;
    },
    setFontSize: (state, action) => {
      const { id, fontSize } = action.payload;
      (state.objects[id] as TextObject).fontSize = fontSize;
    },
    setFontStyle: (state, action) => {
      const { id, fontStyle } = action.payload;
      (state.objects[id] as TextObject).fontStyle = fontStyle;
    },
    setFontColor: (state, action) => {
      const { id, fontColor } = action.payload;
      (state.objects[id] as TextObject).fontColor = fontColor;
    },
    deleteObject: (state, action) => {
      const id = action.payload;
      delete state.objects[id];
      delete state.selected[id];
      state.order = state.order.filter((_id) => _id !== id);
    },
    addCopy: (state, action) => {
      const boardObject = action.payload;
      const copy = {
        ...JSON.parse(JSON.stringify(boardObject)),
        id: getID(),
        isSelected: false,
        isEdited: false,
        position: addOffset(boardObject.position, OBJECT_COPY_MARGIN),
      };
      state.objects[copy.id] = copy;
      state.order.push(copy.id);
    },
    bringToFront: (state, action) => {
      const id = action.payload;
      state.order = state.order.filter((_id) => _id !== id);
      state.order.push(id);
    },
    bringToRear: (state, action) => {
      const id = action.payload;
      state.order = state.order.filter((_id) => _id !== id);
      state.order.unshift(id);
    },
    setBackgroundColor: (state, action) => {
      const { id, backgroundColor } = action.payload;
      (state.objects[id] as any).backgroundColor = backgroundColor;
    },
    setRotatingPoint: (state, action) => {
      const { id, rotatingPoint } = action.payload;
      if (rotatingPoint === null) {
        state.rotated = null;
      } else {
        state.rotated = id;
      }
      state.objects[id].rotatingPoint = rotatingPoint;
    },
    rotate: (state, action) => {
      const boardObject = state.objects[state.rotated];
      const mousePosition = action.payload;

      boardObject.rotationAngle = angleBetweenTwoPoints(
        mousePosition,
        boardObject.rotatingPoint
      );
    },
  },
});

export const {
  addObject,
  selectObject,
  unselectObject,
  clearSelection,
  dragSelected,
  selectObjectsInRectangle,
  setIsEditing,
  setText,
  setResized,
  setResizingCorner,
  resize,
  setFontSize,
  setFontStyle,
  setFontColor,
  deleteObject,
  addCopy,
  bringToFront,
  bringToRear,
  setBackgroundColor,
  deleteSelected,
  setRotatingPoint,
  rotate,
} = boardObjectsSlice.actions;

export default boardObjectsSlice.reducer;

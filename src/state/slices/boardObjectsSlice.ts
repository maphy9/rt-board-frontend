import { boardObjectCleanCopy } from "@/types/BoardObjects/boardObject";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import TextObject from "@/types/BoardObjects/textObject";
import { addOffset } from "@/types/point";
import { areRectanglesIntersecting, createRectangle } from "@/types/rectangle";
import { resizeBoardObject } from "@/utils/resizing";
import { angleBetweenTwoPoints } from "@/utils/rotation";
import { createSlice } from "@reduxjs/toolkit";

const initialState: BoardObjects = {
  objects: {},
  order: [],
  selected: {},
  resized: null,
  rotated: null,
  oldObjectState: null,
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
      const id = action.payload;
      if (id === null) {
        const _id = state.resized.id;
        state.objects[_id].resizingCorner = null;
        state.resized = null;
      } else {
        state.resized = boardObjectCleanCopy(state.objects[id]);
      }
    },
    setResizingCorner: (state, action) => {
      const { id, corner } = action.payload;
      state.objects[id].resizingCorner = corner;
    },
    resize: (state, action) => {
      const { dx, dy } = action.payload;
      const _id = state.resized.id;
      const { position, size } = resizeBoardObject(state.objects[_id], dx, dy);
      state.objects[_id].position = position;
      state.objects[_id].size = size;
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
    changeOrder: (state, action) => {
      state.order = action.payload;
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
        state.rotated = boardObjectCleanCopy(state.objects[id]);
      }
      state.objects[id].rotatingPoint = rotatingPoint;
    },
    rotate: (state, action) => {
      const _id = state.rotated.id;
      const boardObject = state.objects[_id];
      const mousePosition = action.payload;

      boardObject.rotationAngle = angleBetweenTwoPoints(
        mousePosition,
        boardObject.rotatingPoint
      );
    },
    toggleIsFlippedHorizontally: (state, action) => {
      const id = action.payload;

      state.objects[id].isFlippedHorizontally =
        !state.objects[id].isFlippedHorizontally;
    },
    toggleIsFlippedVertically: (state, action) => {
      const id = action.payload;

      state.objects[id].isFlippedVertically =
        !state.objects[id].isFlippedVertically;
    },
    setProperties: (state, action) => {
      const object = action.payload;
      const id = object.id;
      state.objects[id] = object;
    },
    setOldObjectState: (state, action) => {
      state.oldObjectState = action.payload;
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
  changeOrder,
  setBackgroundColor,
  deleteSelected,
  setRotatingPoint,
  rotate,
  toggleIsFlippedHorizontally,
  toggleIsFlippedVertically,
  setProperties,
  setOldObjectState,
} = boardObjectsSlice.actions;

export default boardObjectsSlice.reducer;

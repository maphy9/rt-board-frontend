import { boardObjectCleanCopy } from "@/types/BoardObjects/boardObject";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import TextObject from "@/types/BoardObjects/textObject";
import { addOffset } from "@/types/point";
import { areRectanglesIntersecting, createRectangle } from "@/types/rectangle";
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
    addObjects: (state, action) => {
      const objects = action.payload;
      for (const object of objects) {
        state.objects[object.id] = object;
        state.order.push(object.id);
      }
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
    changePosition: (state, action) => {
      const { objectIds, dx, dy } = action.payload;
      for (const id of objectIds) {
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
      const data = action.payload;
      if (data == null) {
        if (state.resized === null) {
          return;
        }
        const id = state.resized.id;
        state.objects[id].resizingCorner = null;
        state.resized = null;
        return;
      }

      const { id, corner } = data;
      state.resized = state.objects[id];
      state.resized.resizingCorner = corner;
    },
    resizeObject: (state, action) => {
      const { id, position, size } = action.payload;
      const boardObject = state.objects[id];
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
    deleteObjects: (state, action) => {
      const ids = action.payload;
      const idMap = {};
      for (const id of ids) {
        delete state.objects[id];
        delete state.selected[id];
        idMap[id] = true;
      }
      state.order = state.order.filter((id) => !(id in idMap));
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
    rotateObject: (state, action) => {
      const { id, rotationAngle } = action.payload;
      const boardObject = state.objects[id];

      boardObject.rotationAngle = rotationAngle;
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
  addObjects,
  selectObject,
  unselectObject,
  clearSelection,
  changePosition,
  selectObjectsInRectangle,
  setIsEditing,
  setText,
  setResized,
  resizeObject,
  setFontSize,
  setFontStyle,
  setFontColor,
  deleteObjects,
  changeOrder,
  setBackgroundColor,
  setRotatingPoint,
  rotateObject,
  toggleIsFlippedHorizontally,
  toggleIsFlippedVertically,
  setProperties,
  setOldObjectState,
} = boardObjectsSlice.actions;

export default boardObjectsSlice.reducer;

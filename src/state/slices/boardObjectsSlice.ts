import { OBJECT_COPY_MARGIN } from "@/constants/boardObjectConstants";
import BoardObjects from "@/types/BoardObjects/boardObjects";
import TextObject, { createTextObject } from "@/types/BoardObjects/textObject";
import { addOffset } from "@/types/point";
import { areRectanglesIntersecting, createRectangle } from "@/types/rectangle";
import getID from "@/utils/id";
import { resizeBoardObject } from "@/utils/resizing";
import { createSlice } from "@reduxjs/toolkit";

const initialState: BoardObjects = {
  objects: {},
  order: [],
  selected: {},
  resized: null,
};

export const boardObjectsSlice = createSlice({
  name: "boardObjectsSlice",
  initialState,
  reducers: {
    addObject: (state, action) => {
      const { selectedTool, position } = action.payload;
      let boardObject = null;
      if (selectedTool === "text") {
        boardObject = createTextObject(position);
      }
      state.objects[boardObject.id] = boardObject;
      state.order.push(boardObject.id);
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
      const { id, resizingCorner } = action.payload;
      state.objects[id].resizingCorner = resizingCorner;
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
} = boardObjectsSlice.actions;

export default boardObjectsSlice.reducer;

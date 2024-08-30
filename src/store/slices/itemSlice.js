import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    selectedItem: null,
    path: [],
    items: [],
    permisos: [],
    selectedFolder: null,
  },
  reducers: {
    selectItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setPermisos: (state, action) => {
      state.permisos = action.payload;
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
  },
});

export const { selectItem, setPath, setItems, setPermisos, setSelectedFolder } =
  itemSlice.actions;
export default itemSlice.reducer;

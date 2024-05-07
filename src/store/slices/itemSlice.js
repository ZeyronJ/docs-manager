import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'item',
  initialState: { selectedItem: null, path: [], items: [], permisos: [] },
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
  },
});

export const { selectItem, setPath, setItems, setPermisos } = itemSlice.actions;
export default itemSlice.reducer;

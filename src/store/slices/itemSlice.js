import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'item',
  initialState: { selectedItem: null, path: [] },
  reducers: {
    selectItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const { selectItem, setPath } = itemSlice.actions;
export default itemSlice.reducer;

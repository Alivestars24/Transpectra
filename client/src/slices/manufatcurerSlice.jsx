import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manufacturers: [],
  isLoading: false,
};

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    setManufacturers: (state, action) => {
      state.manufacturers = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setManufacturers, setLoading } = manufacturerSlice.actions;
export default manufacturerSlice.reducer;

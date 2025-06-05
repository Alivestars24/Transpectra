import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  driver: [],
  isLoading: false,
};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setdrivers: (state, action) => {
      state.driver = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setdrivers, setLoading } = driverSlice.actions;
export default driverSlice.reducer;

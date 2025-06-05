import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departedFleets: [],
  loading: false,
  error: null,
};

const departedFleetSlice = createSlice({
  name: "departedFleet",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDepartedFleets: (state, action) => {
      state.departedFleets = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setDepartedFleets, setError } = departedFleetSlice.actions;
export default departedFleetSlice.reducer;

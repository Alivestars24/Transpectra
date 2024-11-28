// src/redux/slices/warehouseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warehouse: null,
  loading: false,
};

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    setWarehouseDetails(state, action) {
      state.warehouse = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setWarehouseDetails, setLoading } = warehouseSlice.actions;

export default warehouseSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  order: [], // Array to store fleet details
  loading: false, // Loading state for API calls
  error: null, // Error state to handle API call failures
};

// Fleet slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Action to set fleet details in the state
    setorderDetails(state, action) {
      state.order = action.payload;
    },
    // Action to update the loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },
    // Action to set error messages
    setError(state, action) {
      state.error = action.payload;
    },
    // Action to reset the fleet state
    resetorderState(state) {
      state.fleet = [];
      state.loading = false;
      state.error = null;
    },
  },
});

// Exporting actions
export const { setorderDetails, setLoading, setError, resetorderState } =orderSlice.actions;

// Exporting reducer
export default orderSlice.reducer;

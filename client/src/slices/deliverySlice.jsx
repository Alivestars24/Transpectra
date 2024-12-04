import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  delivery: [], // Array to store fleet details
  loading: false, // Loading state for API calls
  error: null, // Error state to handle API call failures
};

// Fleet slice
const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    // Action to set fleet details in the state
    setdeliveryDetails(state, action) {
      state.delivery = action.payload;
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
    resetdeliveryState(state) {
      state.delivery = [];
      state.loading = false;
      state.error = null;
    },
  },
});

// Exporting actions
export const { setdeliveryDetails, setLoading, setError, resetdeliveryState } =deliverySlice.actions;

// Exporting reducer
export default deliverySlice.reducer;

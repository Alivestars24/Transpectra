import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fleet: [], // Array to store fleet details
  loading: false, // Loading state for API calls
  error: null, // Error state to handle API call failures
};

// Fleet slice
const fleetSlice = createSlice({
  name: "fleet",
  initialState,
  reducers: {
    // Action to set fleet details in the state
    setFleetDetails(state, action) {
      state.fleet = action.payload;
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
    resetFleetState(state) {
      state.fleet = [];
      state.loading = false;
      state.error = null;
    },
  },
});

// Exporting actions
export const { setFleetDetails, setLoading, setError, resetFleetState } =fleetSlice.actions;

// Exporting reducer
export default fleetSlice.reducer;

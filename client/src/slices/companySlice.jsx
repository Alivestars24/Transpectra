import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: null, // Store company details here
  loading: false, // Indicates loading state
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setcompanyDetails(state, action) {
        console.log("Updating Redux with company data:", action.payload);
        state.company = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setcompanyDetails, setLoading } = companySlice.actions;

export default companySlice.reducer;

import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import warehouseReducer from "../slices/warehouseSlice"
import companyReducer from "../slices/companySlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  warehouse: warehouseReducer,
  company: companyReducer,
})

export default rootReducer
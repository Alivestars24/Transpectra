import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import warehouseReducer from "../slices/warehouseSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  warehouse: warehouseReducer,
})

export default rootReducer
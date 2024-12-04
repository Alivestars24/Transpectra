import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import warehouseReducer from "../slices/warehouseSlice"
import companyReducer from "../slices/companySlice"
import fleetReducer from "../slices/fleetSlice"
import departedFleetReducer from "../slices/departedFleetSlice"
import manufacturerReducer from "../slices/manufatcurerSlice"
import orderReducer from "../slices/orderSlice"
import deliveryReducer from "../slices/deliverySlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  warehouse: warehouseReducer,
  company: companyReducer,
  fleet: fleetReducer,
  departedFleet:departedFleetReducer,
  manufacturers: manufacturerReducer,
  order:orderReducer,
  delivery:deliveryReducer,
})

export default rootReducer
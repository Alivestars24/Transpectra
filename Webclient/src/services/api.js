const BASE_URL = "https://transpectra-backend.onrender.com/api/v1"
//const BASE_URL="http://localhost:4000/api/v1"
console.log("this is base url", BASE_URL);

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  WAREHOUSE_DETAILS_API: BASE_URL+"/warehouse/addWarehouse",
  COMPANY_API:BASE_URL+"/manufacturingUnit/create",
  FETCH_WAREHOUSE_API:BASE_URL+"/warehouse",
  YARD_DETAILS_API:BASE_URL+"/yard/addYard",
  FETCH_COMPANY_API:BASE_URL+"/manufacturingUnit",
  FETCH_YARD_API:BASE_URL+"/yard",
  // Fleet APIs for Yard management
  ADD_FLEET_IN_YARD_API:BASE_URL+"/fleet/add",
  FETCH_FLEET_YARD:BASE_URL+"/fleet/available",
  MARK_AS_DEPARTED_API:BASE_URL+"/fleet//trucks/departed",
  FETCH_DEPARTED_TRUCKS_API:BASE_URL+"/fleet/departed",
  //Orders creation and fetching 
  CREATE_ORDER_API:BASE_URL+"/order/create",
  FETCH_ORDER_FOR_MANUFACTURER:BASE_URL+"/order/manufacturer",
  GET_ALL_MANUFACTURERS: BASE_URL+"/manufacturer",
  //Inventory 
  FETCH_INVENTORY_FOR_WAREHOUSE:BASE_URL+"/inventory",
  //Delivery
  CREATE_DELIVERY_FOR_ORDER:BASE_URL+"/delivery/create",
  FETCH_DELIVERIES_FOR_MANUFACTURER:BASE_URL+"/delivery/manufacturing-unit",
  FETCH_DELIVERIES_FOR_WAREHOUSE:BASE_URL+"/delivery/warehouse",
  //Give out the route Details
  ROUTE_DETAILS:BASE_URL+"/routeTracking/route-tracking",
  //RealTime-Tracking 
  REAL_TIME:BASE_URL+"/routeTracking/real",
  FETCH_DRIVERS:BASE_URL+"/driver/manufacturingUnit",
  ASSIGN_DRIVER:BASE_URL+"/driver/assign-driver", 
}

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/details",
}
// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/update-picture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/update-details",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/delete",
  UPDATE_INVENTORY_EXCEL_API:BASE_URL+"/profile/update-inventory",
}
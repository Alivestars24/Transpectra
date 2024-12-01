const BASE_URL = "http://localhost:4000/api/v1"
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
}

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/details",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  UPDATE_INVENTORY_EXCEL_API:BASE_URL+"/profile/updateExcelSheet",
}
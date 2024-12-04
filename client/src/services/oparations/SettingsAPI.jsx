import { toast } from "react-hot-toast"
import { setLoading ,setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../api"
import { logout } from "./authAPI"
import Cookies from "js-cookie";
import { getUserDetails } from "./profileAPI";
import { setWarehouseDetails } from "../../slices/warehouseSlice"
import { setcompanyDetails } from "../../slices/companySlice"
const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
  UPDATE_INVENTORY_EXCEL_API,
} = settingsEndpoints

export function updateDisplayPicture(isWarehouseManager,formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile picture...");

    try {
      const response = await apiConnector(
        "POST",
        UPDATE_DISPLAY_PICTURE_API,
        formData
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )
      if (response?.data?.success) {
        toast.success("Profile picture updated successfully!");
        dispatch(getUserDetails(Cookies.get("token")));
        const warehouseData = response.data.data;
        if(isWarehouseManager){
          dispatch(setWarehouseDetails(warehouseData));
        }
        else{
          dispatch(setcompanyDetails(warehouseData));
        }
      } else {
        throw new Error(response?.data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("UPDATE_DISPLAY_PICTURE API ERROR............", error);
      toast.error(error.response?.data?.message || "Could not update profile picture.");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function updateInventoryExcelSheet(formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating Inventory Excel Sheet...")
    try {
      const response = await apiConnector(
        "POST",
        UPDATE_INVENTORY_EXCEL_API,
        formData
      )
      console.log(
        "UPDATE_Inventory_API API RESPONSE............",
        response
      )
      if (response?.data?.success) {
        toast.success("Inventory updated successfully!");
        dispatch(getUserDetails(Cookies.get("token")));
        const warehouseData = response.data.data;
        dispatch(setWarehouseDetails(warehouseData));
      } else {
        throw new Error(response?.data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Inventory API ERROR............", error);
      toast.error(error.response?.data?.message || "Could not update inventory sheet");
    } finally {
      toast.dismiss(toastId);
    }
  };
}


export function updateProfile(isWarehouseManager,token, data) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating Profile...");
    try {
      const response = await apiConnector("POST", UPDATE_PROFILE_API, data, {
        Authorization: `Bearer ${token}`, // Passing the token in the headers
      });
      console.log("UPDATE_PROFILE_API RESPONSE: ", response);

      if (response?.data?.success) {
        toast.success("Profile updated successfully!");
        dispatch(getUserDetails(Cookies.get("token")));
        const warehouseData = response.data.data;
        if(isWarehouseManager){
          dispatch(setWarehouseDetails(warehouseData));
        }
        else{
          dispatch(setcompanyDetails(warehouseData));
        }
      } else {
        throw new Error(response?.data?.message || "Profile update failed.");
      }
    } catch (error) {
      console.error("UPDATE_PROFILE_API ERROR: ", error);
      toast.error(
        error.response?.data?.message || "Unable to update profile. Please try again."
      );
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export function deleteProfile(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting the Account...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, data)
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }
}
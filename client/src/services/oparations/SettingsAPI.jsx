import { toast } from "react-hot-toast"
import { setLoading ,setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../api"
import { logout } from "./authAPI"


const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
  UPDATE_INVENTORY_EXCEL_API,
} = settingsEndpoints

export function updateProfilePicture(formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile picture...");

    try {
      const response = await apiConnector("POST", UPDATE_DISPLAY_PICTURE_API, formData);

      console.log("UPDATE_DISPLAY_PICTURE API RESPONSE............", response);

      if (response?.data?.success) {
        toast.success("Profile picture updated successfully!");
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



export function updateInventoryExcelSheet(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Uploading Inventory Excel...");
    try {
      const response = await apiConnector("PUT", UPDATE_INVENTORY_EXCEL_API, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Inventory Excel Updated Successfully");
    } catch (error) {
      console.log("Error updating inventory Excel:", error);
      toast.error("Failed to Update Inventory Excel");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      )
      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
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

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
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
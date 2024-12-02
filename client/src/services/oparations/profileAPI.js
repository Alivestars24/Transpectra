import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../api"
import { logout } from "./authAPI"
import { fetchCompanyDetails } from "./CompanyAPI"
import { fetchWarehouseDetails } from "./warehouseAPI"
import { fetchYardDetails } from "./YardAPI"

const {
    GET_USER_DETAILS_API
} = profileEndpoints


export function getUserDetails(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_API, null)
            console.log("GET_USER_DETAILS API RESPONSE............", response);


            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            const userImage = response.data.data.image
                ? response.data.data.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            
            const userData = { ...response.data.data, image: userImage };

            dispatch(setUser(userData));
            console.log(response)
            const userId = response.data.data._id; 
    if (response.data.data.accountType === "Warehouse_Manager") {
        await dispatch(fetchWarehouseDetails(userId));
    } else if (response.data.data.accountType === "Yard_managers") {
        await dispatch(fetchYardDetails(userId));
    } else {
        await dispatch(fetchCompanyDetails(userId));
    }
        } catch (error) {
            dispatch(logout(navigate))
            console.log("GET_USER_DETAILS API ERROR............", error)
            toast.error("Could Not Get User Details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}


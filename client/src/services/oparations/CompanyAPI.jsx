import { apiConnector } from "../apiConnector"; 
import { endpoints } from "../api";
import { toast } from "react-hot-toast";
import { setLoading, setcompanyDetails } from "../../slices/companySlice";
import { setManufacturers } from "../../slices/manufatcurerSlice";
import { setorderDetails } from "../../slices/orderSlice";

export function fetchCompanyDetails(managerId) {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching Manufacturing details...");
    dispatch(setLoading(true));
    try {
      // Send GET request
      const response = await apiConnector("GET", `${endpoints.FETCH_COMPANY_API}/${managerId}`);
      console.log("FETCH_COMPANY API RESPONSE............", response);
      // Check if the response contains valid data
      if (!response?.data?.company) {
        throw new Error("Invalid response structure");
      }

      // Save company details to Redux store
      dispatch(setcompanyDetails(response.data.company));
      toast.success("Company details fetched successfully");
    } catch (error) {
      console.error("FETCH_COMPANY API ERROR............", error);
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function fetchManufacturers() {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching manufacturers...");
    dispatch(setLoading(true));

    try {
      // Call the API to fetch manufacturer details
      const response = await apiConnector("GET", endpoints.GET_ALL_MANUFACTURERS);

      console.log("FETCH_MANUFACTURERS API RESPONSE............", response);

      // Validate response structure
      if (response?.data?.manufacturers && Array.isArray(response.data.manufacturers)) {
        // Save manufacturer details to Redux store
        dispatch(setManufacturers(response.data.manufacturers));
        toast.success("Manufacturers fetched successfully");
        return response.data.manufacturers;
      } else {
        console.error("Invalid response structure:", response);
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("FETCH_MANUFACTURERS API ERROR............", error);
      toast.error("Could not fetch manufacturers");
    } finally {
      // Dismiss the loading toast and reset loading state
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}


export function fetchOrderDetails({ managerId }) {
  console.log("fetch Order Details called with managerId:", managerId);
  return async (dispatch) => {
    const toastId = toast.loading("Fetching Request Order details for manufacturer...");
    try {
      const response = await apiConnector("GET", `${endpoints.FETCH_ORDER_FOR_MANUFACTURER}/${managerId}/details`);
      console.log("Order API response:", response);
      if (!response?.data) {
        throw new Error("Invalid response structure");
      }
      dispatch(setorderDetails(response.data.manufacturerDetails.linkedWarehouses));
      toast.success("Request Order details fetched successfully");
    } catch (error) {
      console.error("Order Fetch API ERROR............", error);
      toast.error("Could not fetch order details");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
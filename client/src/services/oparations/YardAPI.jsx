import { apiConnector } from "../apiConnector"; 
import { endpoints } from "../api";
import { toast } from "react-toastify";
import { setLoading, setWarehouseDetails } from "../../slices/warehouseSlice";

export function fetchYardDetails(managerId) {
    return async (dispatch) => {
      const toastId = toast.loading("Fetching warehouse details...");
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("GET", `${endpoints.FETCH_WAREHOUSE_API}/${managerId}`);
        console.log("FETCH_WAREHOUSE API RESPONSE............", response);
  
        // Check if the response contains valid data
        if (!response?.data?.warehouse) {
          throw new Error("Invalid response structure");
        }
  
        // Save warehouse details to Redux store
        dispatch(setWarehouseDetails(response.data.warehouse));
        toast.success("Warehouse details fetched successfully");
      } catch (error) {
        console.error("WAREHOUSE API ERROR............", error);
        toast.error("Could not fetch warehouse details");
      } finally {
        toast.dismiss(toastId);
        dispatch(setLoading(false));
      }
    };
  }

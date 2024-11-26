import { apiConnector } from "../apiConnector"; // Assuming you have this utility
import { endpoints } from "../api"
import { toast } from "react-toastify";
import { setLoading, setWarehouseDetails } from "../../slices/warehouseSlice"

export function fetchWarehouseDetails(managerId) {
    return async (dispatch) => {
      const toastId = toast.loading("Fetching warehouse details...");
      dispatch(setLoading(true));
      try {
        // Send GET request with managerId as a query parameter
        const response = await apiConnector("GET", `${endpoints.FETCH_WAREHOUSE_API}/${managerId}`);
        console.log("FETCH_WAREHOUSE API RESPONSE............", response);
  
        // Check if the response is successful and handle data
        if (!response.data || !response.data.warehouse) {
          throw new Error("Invalid response structure");
        }
  
        // Extract warehouse data
        const warehouseData = response.data.warehouse;
        dispatch(setWarehouseDetails(warehouseData)); // Save in Redux store
        toast.success("Warehouse details fetched successfully");
      } catch (error) {
        console.error("FETCH_WAREHOUSE API ERROR............", error);
        toast.error("Could not fetch warehouse details");
      } finally {
        toast.dismiss(toastId);
        dispatch(setLoading(false));
      }
    };
  }
  
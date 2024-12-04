import { apiConnector } from "../apiConnector"; // Assuming you have this utility
import { endpoints } from "../api"
import { toast } from "react-hot-toast";
import { setLoading, setWarehouseDetails } from "../../slices/warehouseSlice"
import { setorderDetails } from "../../slices/orderSlice";

export function fetchWarehouseDetails(managerId) {
    return async (dispatch) => {
      console.log("In warehouse fetching function :",managerId)
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
      } finally {
        toast.dismiss(toastId);
        dispatch(setLoading(false));
      }
    };
  }
  

  export async function fetchInventoryForWarehouse(token) {
    const toastId = toast.loading("Fetching inventory...");
    try {
      const response = await apiConnector("GET", endpoints.FETCH_INVENTORY_FOR_WAREHOUSE, null, {
        Authorization: `Bearer ${token}`, 
      });
      console.log("FETCH_INVENTORY_FOR_WAREHOUSE RESPONSE:", response);
  
      if (response?.data?.success) {
        toast.success("Inventory fetched successfully!");
        return response.data.data; // Return the inventory data
      } else {
        throw new Error(response?.data?.message || "Failed to fetch inventory.");
      }
    } catch (error) {
      console.error("FETCH_INVENTORY_FOR_WAREHOUSE ERROR:", error);
      toast.error("Could not fetch inventory. Please try again.");
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  }


  export function createOrder(formData,category,navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Creating a Order...");
      try {
        const response = await apiConnector("POST", endpoints.CREATE_ORDER_API, formData);
        console.log("CREATE_ORDER_API RESPONSE............", response);
        if (response?.data?.success) {
          toast.success("Order created successfully");
        } else {
          throw new Error(response?.data?.message || "Unknown error");
        }
        navigate('/dashboard/orders', { state: { category:category }})
      } catch (error) {
        console.error("CREATE_ORDER_API API ERROR............", error);
        toast.error("Could not create Order");
      } finally {
        toast.dismiss(toastId);
      }
    };
  }

  export function fetchWarehouseOrdersDetails(managerId) {
    return async (dispatch) => {
      console.log("In warehouse Orders Fetching function :",managerId.managerId)
      const toastId = toast.loading("Fetching warehouse orders...");
      try {
        // Send GET request with managerId as a query parameter
        const response = await apiConnector("GET", `${endpoints.FETCH_DELIVERIES_FOR_WAREHOUSE}/${managerId.managerId}/details`);
        console.log("FETCH_WAREHOUSE_ORDERS API RESPONSE............", response);

        // Check if the response is successful and handle data
        if (!response.data || !response.data.data.linkedOrders) {
          throw new Error("Invalid response structure");
        }
        dispatch(setorderDetails(response.data.data.linkedOrders)); // Save in Redux store
        toast.success("Warehouse Orders fetched successfully");
      } catch (error) {
        console.error("FETCH_WAREHOUSE_ORDER API ERROR............", error);
      } finally {
        toast.dismiss(toastId);
      }
    };
  }

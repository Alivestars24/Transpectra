import { apiConnector } from "../apiConnector"; 
import { endpoints } from "../api";
import { toast } from "react-hot-toast"
import { setLoading, setWarehouseDetails } from "../../slices/warehouseSlice";
import {setFleetDetails} from "../../slices/fleetSlice"
import { setDepartedFleets, setError } from "../../slices/departedFleetSlice";

//Get Warehouse Details linked to Given Yard 
export function fetchYardDetails({ managerId }) {
  console.log("fetchYardDetails called with managerId:", managerId);
  return async (dispatch) => {
    const toastId = toast.loading("Fetching warehouse details for yard...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", `${endpoints.FETCH_YARD_API}/${managerId}`);
      console.log("Yard API response:", response);
      if (!response?.data?.warehouse) {
        throw new Error("Invalid response structure");
      }
      dispatch(setWarehouseDetails(response.data.warehouse));
      toast.success("Yard-Warehouse details fetched successfully");
    } catch (error) {
      console.error("WAREHOUSE API ERROR............", error);
      toast.error("Could not fetch warehouse details");
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}
 
// Add a fleet to yard
export function addFleetToYard(formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Adding Fleet to yard...");
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("POST", endpoints.ADD_FLEET_IN_YARD_API, formData);
        console.log("ADD_FLEET_IN_YARD API RESPONSE............", response);
        if (response?.data?.success) {
          toast.success("Fleet Details successfully added");
        } else {
          throw new Error(response?.data?.message || "Unknown error");
        }
        
      } catch (error) {
        console.error("ADD_FLEET_IN_YARD API ERROR............", error);
        toast.error("Could not Update fleet details");
      } finally {
        toast.dismiss(toastId);
        dispatch(setLoading(false));
      }
    };
  }

  export function fetchFleetDetails({ yardId, yardManagerId }) {
    return async (dispatch) => {
      const toastId = toast.loading("Fetching fleet details...");
      dispatch(setLoading(true));
  
      try {
        // Call the API to fetch fleet details
        const response = await apiConnector("POST", endpoints.FETCH_FLEET_YARD, {
          yardId,
          yardManagerId,
        });
  
        console.log("FETCH_FLEET_YARD API RESPONSE............", response);
        // Validate response structure
        if (response?.data?.fleets && Array.isArray(response.data.fleets)) {
          // Save fleet details to Redux store
          dispatch(setFleetDetails(response.data.fleets));
          toast.success("Fleet details fetched successfully");
          return response.data.fleets;
        } else {
          console.error("Invalid response structure:", response);
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("FETCH_FLEET_YARD API ERROR............", error);
        toast.error("Could not fetch fleet details");
      } finally {
        // Dismiss the loading toast and reset loading state
        toast.dismiss(toastId);
        dispatch(setLoading(false));
      }
    };
  }
  
// Mark a truck as departed 
export const markAsDeparted = (fleetId) => async (dispatch, getState) => {
  const toastId = toast.loading("Marking truck as departed...");
  dispatch(setLoading(true));

  try {
    // Call the API with the correct endpoint and fleetId
    const { data } = await apiConnector(
      "POST",
      `${endpoints.MARK_AS_DEPARTED_API}/${fleetId}`, // Append fleetId to the existing API URL
      {} // No body needed if not required by the backend
    );

    console.log("MARK_AS_DEPARTED API RESPONSE............", data);

    if (data?.success) {
      // Update fleet data by removing the departed truck
      dispatch(
        setFleetDetails(
          getState().fleet.fleet.filter((truck) => truck._id !== fleetId)
        )
      );
      toast.success("Truck marked as departed successfully");
    } else {
      throw new Error("Failed to mark truck as departed");
    }
  } catch (error) {
    console.error("MARK_AS_DEPARTED API ERROR............", error);
    toast.error("Could not mark truck as departed");
  } finally {
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  }
};

export function fetchDepartedFleetDetails({ managerId }) {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching departed fleets...");
    dispatch(setLoading(true));

    try {
      // Call the API to fetch departed fleets
      const response = await apiConnector("GET", endpoints.FETCH_DEPARTED_TRUCKS_API, {
        managerId,
      });

      console.log("FETCH_DEPARTED_TRUCKS_API RESPONSE............", response);

      // Validate response structure
      if (response?.data?.success && Array.isArray(response.data.data)) {
        // Save departed fleets to Redux store
        dispatch(setDepartedFleets(response.data.data));
        toast.success("Departed fleets fetched successfully", { id: toastId }); // Update toast
        return response.data.data;
      } else {
        console.error("Invalid response structure:", response);
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("FETCH_DEPARTED_TRUCKS_API ERROR............", error);
      dispatch(setError(error.message));
      toast.error("Could not fetch departed fleets", { id: toastId }); // Update toast with error
    } finally {
      // Reset loading state
      dispatch(setLoading(false));
    }
  };
}
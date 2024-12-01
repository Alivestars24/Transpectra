import { apiConnector } from "../apiConnector"; 
import { endpoints } from "../api";
import { toast } from "react-toastify";
import { setLoading, setcompanyDetails } from "../../slices/companySlice";

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
      toast.error("Could not fetch company details");
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../api"
import Cookies from 'js-cookie';
import { fetchWarehouseDetails } from "./warehouseAPI"
import { fetchCompanyDetails } from "./CompanyAPI"
import { fetchYardDetails } from "./YardAPI"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    WAREHOUSE_DETAILS_API,
    COMPANY_API,
    YARD_DETAILS_API,
} = endpoints

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            })
            console.log("SENDOTP API RESPONSE............", response)

            console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate,
    contactNumber,
    platform = "web",
) {

    console.log("this is otp *************************************", otp);
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                contactNumber,
                platform
            })

            console.log("SIGNUP API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful");
            // Navigate based on the accountType in the response
            console.log(response)
            const userId = response.data.user._id; 

    // Navigate based on the accountType in the response and pass userId
    if (response.data.user.accountType === "Warehouse_Manager") {
        navigate(`/warehouse-form`, { state: { userId } });
    } else if (response.data.user.accountType === "Yard_managers") {
        navigate(`/yard-form`, { state: { userId } });
    } else {
        navigate(`/company-form`, { state: { userId } });
    }

        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function registerWarehouse(formData, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Registering Warehouse...");
        try {
            // Make the API call to register warehouse details
            const response = await apiConnector("POST", WAREHOUSE_DETAILS_API, formData);

            console.log("WAREHOUSE API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Warehouse Registered Successfully!");
            
            // Navigate to a specific page after successful registration
            navigate("/login"); // Replace with the appropriate route
            
            return response.data.warehouse; // Return the registered warehouse details if needed
        } catch (error) {
            console.error("WAREHOUSE API ERROR............", error);
            toast.error("Failed to Register Warehouse");
            throw error; // Re-throw the error for potential error handling at the call site
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export function registerCompany(formData, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Registering Manufacturing Unit...");
        try {
            // Make the API call to register warehouse details
            const response = await apiConnector("POST", COMPANY_API, formData);

            console.log("COMPANY API RESPONSE............", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Company Registered Successfully!");
            navigate("/login"); 
            
            return response.data; // Return the registered warehouse details if needed
        } catch (error) {
            console.error("COMPANY API ERROR............", error);
            toast.error("Failed to Register company");
            throw error; 
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export function registerYard(formData, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Registering Yard with Warehouse...");
        try {
            // Make the API call to register warehouse details
            const response = await apiConnector("POST", YARD_DETAILS_API, formData);

            console.log("YARD API RESPONSE............", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Yard Registered Successfully!");
            navigate("/login"); 
            
            return response.data; 
        } catch (error) {
            console.error("yard API ERROR............", error);
            toast.error("Failed to Register Yard");
            throw error; 
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Logging in...");
      dispatch(setLoading(true));
  
      try {
        const platform = "web";
        const response = await apiConnector("POST", LOGIN_API, { email, password, platform });
        console.log("Login form response :",response)
        if (!response.data.success) throw new Error(response.data.message || "Login failed");
  
        // Update toast to success
        toast.success("Login Successful!", { id: toastId });
  
        const token = response.data.token;
        const user = response.data.user;
        const userId = user?._id;
        const userData = { ...response.data.user};
        await dispatch(setUser(userData));
        dispatch(setToken(token));
        Cookies.set("token", token, { expires: 7 });
        Cookies.set("storeToken", response.data.storeToken, { expires: 7 });
        console.log("Login is completed but now i want to fetch other related")
        // Fetch profile details based on account type
        if (user.accountType === "Warehouse_Manager") {
            await dispatch(fetchWarehouseDetails(userId));
            navigate('/dashboard/my-profile')
        } else if (user.accountType === "Yard_managers") {
            await dispatch(fetchYardDetails(userId));
            navigate('/dashboard/my-profile-yard')
        } else {
            await dispatch(fetchCompanyDetails(userId));
            navigate('/dashboard/my-profile')
        }
  
      } catch (error) {
        console.error("Login Error:", error);
        toast.error("Login Failed", { id: toastId });
      } finally {
        dispatch(setLoading(false));
      }
    };
  }

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            })

            console.log("RESETPASSTOKEN RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent")
            setEmailSent(true)
        } catch (error) {
            console.log("RESETPASSTOKEN ERROR............", error)
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            })

            console.log("RESETPASSWORD RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Password Reset Successfully")
            navigate("/login")
        } catch (error) {
            console.log("RESETPASSWORD ERROR............", error)
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        Cookies.remove('token');
        Cookies.remove('storeToken')
        toast.success("Logged Out")
        navigate("/")
    }
}
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import Dashboard from "./pages/Dashboard";
import Analytics from "./components/core/Dashboard/Analytics";
import Inventory from "./components/core/Dashboard/Inventory";
import Cookies from "js-cookie";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Orders from "./components/core/Dashboard/Orders";
import TrackDelivery from './components/core/Dashboard/TrackDelivery'
import { getUserDetails } from "./services/oparations/profileAPI";
import FleetActivity from "./components/core/Dashboard/FleetActivity";
import SupplierOrders from "./components/core/Dashboard/SupplierOrders";
import FulfillOrder from "./components/core/Dashboard/FulfillOrder";
import OrderDetails from "./components/core/Dashboard/OrderDetails";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (Cookies.get("token")) {
      const token = Cookies.get("token");
      console.log("this is token",token);
      dispatch(getUserDetails(token, navigate));
    }
  }, []);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-white font-inter overflow-y-auto hide-horizontal-scroll ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route element={<Dashboard />}>
          {/* private Routes = */}
          <Route
            path="dashboard/my-profile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/Settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/deliveries"
            element={
              <PrivateRoute>
                <SupplierOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/track-delivery"
            element={
              <PrivateRoute>
                <TrackDelivery/>
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/fleetActivity"
            element={
              <PrivateRoute>
                <FleetActivity/>
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/fulfill-order"
            element={
              <PrivateRoute>
                <FulfillOrder/>
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/order-details"
            element={
              <PrivateRoute>
                <OrderDetails/>
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/inventory"
            element={
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
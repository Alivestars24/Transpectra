import { RiEditBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { useEffect } from "react";

export default function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.user || null); // Ensure user exists
  const warehouse = useSelector((state) => state.warehouse?.warehouse || null); // Fetch warehouse details
  const company = useSelector((state) => state.company?.company || null); // Fetch company details
  const navigate = useNavigate();

  // Debugging logs
  useEffect(() => {
    console.log("User Data:", user);
    console.log("Warehouse Data:", warehouse);
    console.log("Company Data:", company);
  }, [user, warehouse, company]);

  const isStore = user?.accountType === "supplier";
  const isWarehouseManager = user?.accountType === "Warehouse_Manager";

  // Avoid rendering if essential data is missing
  if (!user || (!warehouse && isWarehouseManager) || (!company && isStore)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-600">
          Loading data or incorrect API responses. Please try again.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-3 text-3xl font-medium text-black">
        {isStore ? "Manufacturer" : "Warehouse"}
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblue-500 bg-llblue py-3 px-8">
        <div className="flex items-center gap-x-4">
          <img
            src={
              isWarehouseManager
                ? warehouse?.warehouseImage || ""
                : company?.companyImage || ""
            }
            alt={"Profile"}
            className="aspect-square w-[82px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-ddblue">
              {isWarehouseManager
                ? warehouse?.warehouseName || "N/A"
                : company?.companyName || "N/A"}
            </p>
            <p className="text-sm text-richblue-800">
              {isWarehouseManager
                ? warehouse?.warehouseAddress || "N/A"
                : company?.companyAddress || "N/A"}
            </p>
            <p className="text-sm text-richblue-800">
              {isWarehouseManager
                ? warehouse?.warehouseArea || "N/A"
                : company?.companyArea || "N/A"}
            </p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="mt-4 mb-1 flex flex-col gap-y-2 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblue-900">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p className="text-sm font-medium text-richblue-800">
          {isWarehouseManager
            ? warehouse?.warehouseDescription || "No description available."
            : company?.companyDescription || "No description available."}
        </p>
      </div>
      <div className="my-4 flex flex-col gap-y-2 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-semibold text-richblue-900">User Details</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-1 text-sm text-ddblue">First Name</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.firstName || "N/A"}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-ddblue">Email</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.email || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-1 text-sm text-ddblue">Last Name</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.lastName || "N/A"}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-ddblue">Contact Number</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.additionalDetails?.contactNumber || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

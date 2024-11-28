import { RiEditBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { useEffect } from "react";

export default function YardProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.user || null); // Ensure user exists
  const warehouse = useSelector((state) => state.warehouse?.warehouse || null); // Fetch warehouse details
  const navigate = useNavigate();

  // Debugging logs
  useEffect(() => {
    console.log("User Data:", user);
    console.log("Warehouse Data:", warehouse);
  }, [user, warehouse]);

  const isWarehouseManager = user?.accountType === "Warehouse_Manager";

  // Avoid rendering if essential data is missing
  if (!user || !warehouse) {
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
      <h1 className="mb-3 text-3xl font-medium text-black">Warehouse</h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblue-500 bg-llblue py-3 px-8">
        <div className="flex items-center gap-x-4">
          <img
            src={warehouse?.warehouseImage || ""}
            alt={"Warehouse"}
            className="aspect-square w-[82px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-ddblue">
              {warehouse?.warehouseName || "N/A"}
            </p>
            <p className="text-sm text-richblue-800">
              {warehouse?.warehouseAddress || "N/A"}
            </p>
            <p className="text-sm text-richblue-800">
              {warehouse?.warehouseArea || "N/A"} sq. ft.
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

      <div className="my-4 flex flex-col gap-y-2 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-semibold text-richblue-900">Yard Manager Details</p>
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

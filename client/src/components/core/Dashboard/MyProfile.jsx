import { RiEditBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { RiFileCopyLine, RiShareLine } from "react-icons/ri";

export default function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.user || null); // Ensure user exists
  const warehouse = useSelector((state) => state.warehouse?.warehouse || null); // Fetch warehouse details
  const company = useSelector((state) => state.company?.company || null); // Fetch company details
  const navigate = useNavigate();
  console.log(user)
  const isStore = user?.accountType === "Supplier";
  console.log(isStore)
  const isWarehouseManager = user?.accountType === "Warehouse_Manager";
  console.log(isWarehouseManager)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(warehouse?.uniqueCode || "");
    toast.success("Unique Warehouse Code copied to clipboard");
  };

  const shareWarehouse = () => {
    const shareData = {
      title: "Warehouse Unique Code",
      text: `Check out this warehouse unique code: ${warehouse?.uniqueCode || "No code available."}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => {
        console.error("Error sharing:", err);
        toast.error("Sharing failed!");
      });
    } else {
      toast.error("Sharing is not supported on this device.");
    }
  };

  // Debugging logs
  useEffect(() => {
    console.log("User Data:", user);
    console.log("Warehouse Data:", warehouse);
    console.log("Company Data:", company);
  }, [user, warehouse, company]);


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
      { 
        isWarehouseManager?
      <div className="mt-4 mb-1 flex justify-between gap-x-2 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
      <div className="flex flex-col w-full gap-y-2 ">
        <p className="text-lg font-semibold text-richblue-900">Warehouse Code to link a Yard</p>
        <p className="text-md font-medium text-richblue-800">
        Unique Code: <span className="font-bold text-lg  text-richblue-900">{warehouse?.uniqueCode || "No code available."}</span>
       </p>
      </div>
      <div className="mt-3 ml-12 flex items-center w-3/5 gap-x-4">
        <button
          className="flex items-center gap-x-2 rounded-md bg-richblue-500 px-6 py-2 text-sm font-medium text-white hover:bg-richblue-600"
          onClick={copyToClipboard}
        >
          <RiFileCopyLine className="text-lg" />
          Copy to Clipboard
        </button>
        <button
          className="flex items-center gap-x-2 rounded-md bg-richblue-500 px-4 py-2 text-sm font-medium text-white hover:bg-richblue-600"
          onClick={shareWarehouse}
        >
          <RiShareLine className="text-lg" />
          Share
        </button>
      </div>
    </div>:null
      }

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

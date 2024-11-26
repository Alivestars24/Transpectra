import { RiEditBoxLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux";
import { fetchWarehouseDetails } from "../../../services/oparations/warehouseAPI";
import { useNavigate } from "react-router-dom"
import ima from "../../../assets/Images/image1.png"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import IconBtn from "../../Common/IconBtn"
import { useEffect } from "react";

export default function MyProfile() {
  const dispatch=useDispatch();
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const { warehouse } = useSelector((state) => state.warehouse); // Access warehouse data

  // useEffect(() => {
  //   if (user?._id) {
  //     console.log("Fetching warehouse details for manager ID:", user._id);
  //     dispatch(fetchWarehouseDetails(user._id));
  //   }
  // }, []);
 
  // Log the fetched warehouse details
  useEffect(() => {
    if (warehouse) {
      console.log("Warehouse Details:");
      console.log("Name:", warehouse.warehouseName);
      console.log("Address:", warehouse.warehouseAddress);
      console.log("Area:", warehouse.warehouseArea);
      console.log("Description:", warehouse.warehouseDescription);
      console.log("Manager ID:", warehouse.managerId);
      console.log("Inventory:", warehouse.inventory);
      console.log("Yards:", warehouse.yards);
    }
  }, [warehouse]);
  console.log("this is user fetch from the apis",user);

  const isStore= user?.accountType === ACCOUNT_TYPE.SUPPLIER ? true : false
  return (
    <>
      <h1 className="mb-3 text-3xl font-medium text-black">
      {isStore ? "Manufacturer" : "Warehouse"}
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblue-500 bg-llblue py-3 px-8">
        <div className="flex items-center gap-x-4">
          <img
            src={warehouse.warehouseImage} 
            alt={"Image of Warehouse"}
            className="aspect-square w-[82px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-ddblue">
            {warehouse.warehouseName}
            </p>
            <p className="text-sm text-richblue-800">
            {warehouse.warehouseAddress}
            </p>
            <p className="text-sm text-richblue-800">{warehouse.warehouseArea}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="mt-4 mb-1 flex flex-col gap-y-2 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg -4 font-semibold text-richblue-900">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className=" text-sm font-medium text-richblue-800 "
        >
          {warehouse.warehouseDescription}
        </p>
      </div>
      <div className="my-4 flex flex-col gap-y-2 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-semibold text-richblue-900">
            {isStore?"Company Manager Details":"Warehouse Manager Details"}
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
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
                  { `${user?.firstName}`}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-ddblue">Email</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
          <div>
              <p className="mb-1 text-sm text-ddblue">Last Name</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.lastName || "Massay"}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-ddblue">Contact Number</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.additionalDetails.contactNumber || "89"}
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}
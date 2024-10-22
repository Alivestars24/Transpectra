import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ima from "../../../assets/Images/image1.png"
import { ACCOUNT_TYPE } from "../../../utils/constants"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../Common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  console.log("this is user fetch from the apis",user);

  // const isStore= user?.accountType === ACCOUNT_TYPE.SUPPLIER ? true : false
  const isStore=false
  return (
    <>
      <h1 className="mb-3 text-3xl font-medium text-black">
      {isStore ? "Manufacturer" : "Warehouse"}
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblue-500 bg-llblue py-3 px-8">
        <div className="flex items-center gap-x-4">
          <img
            src={ima}
            alt={"Image of Warehouse"}
            className="aspect-square w-[82px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-ddblue">
            {isStore ? "Kumar & Sons Pvt Ltd" : "Bharat Logistics Hub"}
            </p>
            <p className="text-sm text-richblue-800">
            {isStore ? "C-2/17, New Industrial Area,Phase-II, Bhiwandi, Thane,Maharashtra-421302, India" : "Plot No. 45, Sector 21,Industrial Estate, Manesar,Gurgaon, Haryana- 122051, India"}
            </p>
            <p className="text-sm text-richblue-800">{isStore ? "20,000 sq.ft" : "150,000 sq.ft"}</p>
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
          {isStore ? "Kumar & Sons, based in Bhiwandi, Maharashtra, operates a 20,000 sq. ft. facility, efficiently handling bulk orders of FMCG, electronics, and pharmaceuticals. We prioritize timely delivery and optimized logistics to serve businesses across Western India.":
          " At Bharat Logistics Hub, we manage 150,000 sq. ft. of prime warehouse space in Manesar, Gurgaon. Our facility is equipped with cutting-edge inventory management and real-time tracking systems, ensuring smooth operations and fast, reliable distribution across North India."}
        </p>
      </div>
      <div className="my-4 flex flex-col gap-y-2 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-semibold text-richblue-900">
            {isStore?"Manager Details":"Warehouse Manager Details"}
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
                  {/* { `${user?.firstName}`}*/}Ajay
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-ddblue">Email</p>
              <p className="text-md font-medium text-richblue-900">
                {/* {user?.email} */}ajaymassey.work@gmail.com
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-ddblue">Gender</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.additionalDetails?.gender || "Male"}
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
              <p className="mb-1 text-sm text-ddblue">Employee Id</p>
              <p className="text-md font-medium text-richblue-900">
                {user?._id || "45678930tuyfdsfg"}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-ddblue">Date Of Birth</p>
              <p className="text-sm font-medium text-richblue-900">
                {
                  user?.additionalDetails.dateOfBirth || "Add the  Date of Birth"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
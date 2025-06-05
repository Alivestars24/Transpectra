import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/oparations/SettingsAPI"
import IconBtn from "../../../Common/IconBtn"

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const warehouseData = useSelector((state) => state.warehouse?.warehouse);
  const company = useSelector((state) => state.company?.company || null);
  const isWarehouseManager = user?.accountType === "Warehouse_Manager";
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    console.log("Form Data - ", data);

  const payload = {
    userId: user._id,
    address: data.firstName, 
    area: data.lastName,
  };
  try {
    dispatch(updateProfile(isWarehouseManager,token, payload));
  } catch (error) {
    console.log("ERROR MESSAGE - ", error.message);
  }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="mt-10 mb-3 pb-4 flex flex-col gap-y-3 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
          <h2 className="text-2xl font-bold text-richblue-900">
          {isWarehouseManager
                ? "Warehouse Details"
                : "Manufacturing Unit Details"}
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="text-richblack-700">
              {isWarehouseManager
                ?"Warehouse Address"
                :"Manufacturing Unit Address"}
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="bg-richblue-25 text-black py-2 px-3 rounded-md"
                {...register("firstName", { required: true })}
                defaultValue={isWarehouseManager
                  ? warehouseData.warehouseAddress
                  : company.companyAddress}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Address
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="text-richblack-700">
              {isWarehouseManager
                ?"Warehouse Area"
                :"Manufacturing Unit Area"}
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="bg-richblue-25 text-black py-2 px-3 rounded-md"
                {...register("lastName", { required: true })}
                defaultValue={isWarehouseManager
                  ? warehouseData.warehouseArea
                  : company.companyArea}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Area
                </span>
              )}
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-blu py-2 px-5 font-semibold text-white"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  )
}
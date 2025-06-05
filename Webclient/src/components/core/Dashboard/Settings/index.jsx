import ChangeInventoryExcelSheet from "./ChangeInventoryExcel"
import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import { useDispatch, useSelector } from "react-redux";

export default function Settings() {
  const user = useSelector((state) => state.profile?.user || null);
  const isStore = user?.accountType === "Warehouse_Manager" ;
  const isYard = user?.accountType === "Yard_managers" ;
  return (
    <>
      <h1 className="mb-4 text-3xl font-medium text-black">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      {
        !isYard &&
      <ChangeProfilePicture />
      }
      {
        isStore &&
        <ChangeInventoryExcelSheet/>
      }
      {/* Profile */}
      {
        !isYard &&
        <EditProfile />
      }
      {/* Delete Account */}
      <DeleteAccount />
    </>
  )
}
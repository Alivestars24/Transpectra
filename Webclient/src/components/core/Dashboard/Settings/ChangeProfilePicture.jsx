import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { updateDisplayPicture } from "../../../../services/oparations/SettingsAPI"
import IconBtn from "../../../Common/IconBtn"
import {toast} from "react-hot-toast"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const company = useSelector((state) => state.company?.company || null);
  const warehouse = useSelector((state) => state.warehouse?.warehouse || null);
  const isWarehouseManager = user?.accountType === "Warehouse_Manager";

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected!");
      return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Invalid file type. Only JPEG and PNG are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB.");
      return;
    }
    setImageFile(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    console.log("uploading...");
    const formData = new FormData();
    formData.append("userId", user._id); // Match the exact key used in Postman
    formData.append("image", imageFile); // Use 'image' key for the file
  
    dispatch(updateDisplayPicture(isWarehouseManager,formData));
  }

  useEffect(() => {
    console.log("To change the profile picture")
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8 text-richblue-900">
      <div className="flex items-center gap-x-4">
        <img
          src={
            isWarehouseManager
              ?  `${warehouse?.warehouseImage || ""}?t=${Date.now()}`
              :  `${company?.companyImage || ""}?t=${Date.now()}`
          }
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="font-semibold text-richblue-800 text-xl">
            Change Profile Picture
          </p>
          <div className="flex flex-row gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-blu py-1 px-5 text-white"
            >
              Select
            </button>
            <IconBtn text={loading ? "Uploading..." : "Upload"} onclick={handleFileUpload}>
              {!loading && <FiUpload className="text-lg text-white" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
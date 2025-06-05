import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateInventoryExcelSheet } from "../../../../services/oparations/SettingsAPI";
import IconBtn from "../../../Common/IconBtn";
import img from "../../../../assets/Images/Excelsheet.jpg"

export default function ChangeInventoryExcelSheet() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExcelFile(file);
    }
  };

  const handleFileUpload = () => {
    try {
      const formData = new FormData();
      formData.append("userId",user?._id)
      formData.append("file", excelFile);
      dispatch(updateInventoryExcelSheet(formData));
    } catch (error) {
      console.log("Error uploading file: ", error.message);
    }
  };

  return (
    <div className="flex items-center mt-6 gap-x-4 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8 text-richblue-900">
      <img
            src={img}
            alt={"Image of excel"}
            className="aspect-square w-[78px] border border-richblue-900 rounded-sm object-cover"
          />
      <div className="space-y-2 ">
        <p className="font-semibold text-richblue-800 text-xl">Update Inventory Excel Sheet</p>
        <div className="flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".xlsx, .xls"
          />
          <button
            onClick={handleClick}
            disabled={loading}
            className="cursor-pointer rounded-md bg-blu py-1 px-5 text-white"
          >
            Select
          </button>
          <IconBtn
            text={loading ? "Uploading..." : "Upload"}
            onclick={handleFileUpload}
          >
            {!loading && <FiUpload className="text-lg text-white" />}
          </IconBtn>
        </div>
      </div>
    </div>
  );
}

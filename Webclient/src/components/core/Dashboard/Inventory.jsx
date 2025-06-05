import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { fetchInventoryForWarehouse } from "../../../services/oparations/warehouseAPI";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Inventory() {
  const location=useLocation;
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const Cat = location.state?.category || "";
  const warehouseData = useSelector((state) => state.warehouse?.warehouse); // Assuming warehouseSlice is set correctly
  const { token } = useSelector((state) => state.auth); // Assuming token is stored in auth slice
  const navigate = useNavigate();

  // Fetch inventory on mount
  useEffect(() => {
    const fetchInventory = async () => {
      const data = await fetchInventoryForWarehouse(token);
      if (data) {
        setInventory(
          data.map((item) => ({
            type: item.productType,
            productName: item.productName,
            quantity: item.productQuantity,
            category: item.productCategory,
            threshold: item.productThreshold,
            month:item.month,
            Id:item._id,
            stockStatus: getStockStatus(item.productQuantity, item.productThreshold),
          }))
        );
      }
    };
    fetchInventory();
  }, [token]);

  function getStockStatus(quantity, threshold) {
    if (quantity < threshold) return "Low Stock";
    if (quantity < threshold + 10) return "Limited Stock";
    return "In Stock";
  }
  //const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const currentMonth="December"
  console.log(currentMonth)
  
  const filteredInventory = inventory.filter((item) => {
    console.log("Checking item:", item.productName, "Month:", item.month); // Debug logs
    return (
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      item.month && // Ensure item.month is defined
      item.month.trim().toLowerCase() === currentMonth.trim().toLowerCase()
    );
  });
  
  console.log("Filtered Inventory:", filteredInventory);
  
  const getRestockDetails = () => {
    const restockInfo = {};
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  
    inventory.forEach((item) => {
      // Ensure item has valid properties and matches conditions
      if (
        item.month &&
        item.category &&
        item.quantity !== undefined &&
        item.threshold !== undefined &&
        item.month.trim().toLowerCase() === currentMonth.trim().toLowerCase() &&
        item.quantity < item.threshold
      ) {
        // Initialize the category array if it doesn't exist
        if (!restockInfo[item.category]) {
          restockInfo[item.category] = [];
        }
        // Push the entire item object to the category
        restockInfo[item.category].push(item);
      }
    });
  
    return restockInfo;
  };
  
  const restockInfo = getRestockDetails();
  console.log("Restock recieved as:",restockInfo) 
  const handleOrder = (category) => {
    console.log("Category is ",category);
    const productsToOrder = restockInfo[category];
    console.log("Products to be ordered are :",productsToOrder);
    navigate("/dashboard/inventory-select", { state: { category:category ,restockProducts: productsToOrder } });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-2 rounded-lg shadow-sm shadow-llblue">
      {Object.keys(restockInfo).map((cat) => (
        <div key={cat} className="mb-4 flex items-center justify-between">
          <div className="flex items-center bg-blue-5 text-richblue-900 rounded-lg p-[6px] w-4/5 shadow-lg">
            <HiSparkles className="text-richblue-900" />
            <span className="text-lg pl-3 font-semibold">
              Urgent Restock required for the {cat} category
            </span>
          </div>
          <IconBtn text={`Make an Order`} onclick={() => handleOrder(cat)} />
        </div>
      ))}

      <div className="flex mt-6 justify-between items-center">
        <div>
          <h1 className="text-[26px] font-bold text-blue-900">Inventory present in Warehouse</h1>
          <h2 className="text-[16px] font-semibold opacity-70 text-blue-800">
            Real-Time Overview of Inventory in {category} Category
          </h2>
        </div>
        <div className="mt-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="All">All Categories</option>
            {Array.from(new Set(inventory.map((item) => item.category))).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search by Product Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blu text-white text-xs font-medium ">
              <th className="py-2 px-4 border-b-2 border-blue-500">Product Name</th>
              <th className="py-2 px-4 border-b-2 border-blue-500">Quantity</th>
              <th className="py-2 px-4 border-b-2 border-blue-500">Product Threshold</th>
              <th className="py-2 px-4 border-b-2 border-blue-500">Stock Status</th>
              <th className="py-2 px-4 border-b-2 border-blue-500">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredInventory.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? "bg-[#edf5ffd0]" : "bg-white"} cursor-pointer text-richblue-600 text-xs font-inter`}
                  onClick={() =>
                    navigate("/dashboard/product-order", {
                      state: {
                        category:item.category,
                        product:item,
                      },
                    })
                  }
                >
                  <td className="py-2 px-4 border-b text-center border-blue-300">{item.productName}</td>
                  <td className="py-2 px-4 border-b text-center border-blue-300">{item.quantity}</td>
                  <td className="py-2 px-4 border-b text-center border-blue-300">{item.threshold}</td>
                  <td className="py-2 px-4 border-b text-center border-blue-300">{item.stockStatus}</td>
                  <td className="py-2 px-4 border-b text-center border-blue-300">{item.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;

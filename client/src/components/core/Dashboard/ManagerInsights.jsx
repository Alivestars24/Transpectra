import { TbTruckDelivery } from "react-icons/tb";
import InventoryBarChart from "./Charts/InventoryBarChart";
import RestockTable from "./Tables/RestockTable";
import DeliveryDonutChart from "./Charts/DeliveryDonutChart";
import InventoryLineChart from "./Charts/InventoryLineChart";
import { RiCoinsFill } from "react-icons/ri";
import SupplierPerfromanceChart from "./Charts/SupplierPerfromanceChart";
import RecentDeliveriesTable from "./Tables/RecentDeliveriesTable";
import { useSelector } from "react-redux";

function ManagerInsights() {
  const warehouseData = useSelector((state) => state.warehouse?.warehouse); 
  const { categories, current, past } = getMonthlyInventoryData(warehouseData);

  return (
    <div className="flex flex-col gap-y-5 items-center">
        <div className="relative max-w-fit flex gap-x-2 ">
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-row h-auto gap-x-5 justify-between items-start">
                <div className="flex flex-col pb-6 gap-y-1 items-center justify-between border border-lblue rounded-md p-3 shadow-lg shadow-blue-25">
                 <InventoryBarChart categories={categories} currentData={current} pastData={past} />
                </div>
                <div>
                    <RestockTable/>
                </div>
            </div>

            <div className="flex flex-row gap-x-3 w-full">
                <div className="flex flex-col justify-center gap-y-3">
                <div className="bg-blu w-full  p-4 border border-lblue shadow-md rounded-lg shadow-dblue ">
                    <div className="flex flex-row items-start justify-items-end gap-x-3">
                        <div className="flex flex-col justify-center gap-y-1">
                        <p className="text-white font-medium opacity-80 text-lg">Warehouse Utilization</p>
                        <h3 className="text-white font-semibold text-xl">85%</h3>
                        </div>  
                        <div>
                            <TbTruckDelivery className="text-richblue-600 w-[40px] h-[40px]"/>
                        </div>
                    </div>
                </div>
                <div className="bg-richblue-500 w-full p-4 border border-l-blue-25 shadow-md rounded-lg shadow-dblue ">
                    <div className="flex flex-row items-start gap-x-3">
                        <div className="flex flex-col justify-center gap-y-1">
                        <p className="text-white font-medium opacity-80 text-lg">Cost Optimization</p>
                        <h3 className="text-white font-semibold text-xl">21%</h3>
                        </div>  
                        <div>
                            <RiCoinsFill className="text-lblue w-[42px] h-[40px]"/>
                        </div>
                    </div>
                </div>
                <div className="bg-blu w-full  p-4 border border-lblue shadow-md rounded-lg shadow-dblue ">
                    <div className="flex flex-row items-start justify-items-end gap-x-3">
                        <div className="flex flex-col justify-center gap-y-1">
                        <p className="text-white font-medium opacity-80 text-lg">On-Time Deliveries</p>
                        <h3 className="text-white font-semibold text-xl">95%</h3>
                        </div>  
                        <div>
                            <TbTruckDelivery className="text-richblue-600 w-[40px] h-[40px]"/>
                        </div>
                    </div>
                </div>
                </div>
                <div className="flex flex-col pb-6 gap-y-1 items-center justify-between border border-lblue rounded-md p-3 shadow-lg shadow-blue-25">
                <InventoryLineChart/>
                </div>
                <div className="flex flex-col pb-6 gap-y-1 items-center justify-between border border-lblue rounded-md p-3 shadow-lg shadow-blue-25">
                <DeliveryDonutChart/>
                </div>
            </div>
        </div>
    
    </div>
    <div className="flex flex-row h-auto gap-x-5 justify-between items-start">
                <div>
                    <RecentDeliveriesTable/>
                </div>
                <div className="flex flex-col pb-6 gap-y-1 items-center justify-between border border-lblue rounded-md p-3 shadow-lg shadow-blue-25">
                <SupplierPerfromanceChart/>
                </div>
            </div>
    </div>
  )
}

function getMonthlyInventoryData(warehouseData) {
    const currentMonthData = {};
    const pastMonthData = {};
  
    // Check if inventory data exists
    if (warehouseData && warehouseData.inventory) {
      warehouseData.inventory.forEach((item) => {
        const { productCategory, productQuantity, month } = item;
  
        // Initialize categories if they don't exist
        if (!currentMonthData[productCategory]) {
          currentMonthData[productCategory] = 0;
          pastMonthData[productCategory] = 0;
        }
  
        // Aggregate quantities based on month
        if (month === "November") {
          currentMonthData[productCategory] += productQuantity;
        } else {
          pastMonthData[productCategory] += productQuantity;
        }
      });
    }
  
    // Extract categories dynamically
    const categories = Object.keys(currentMonthData);
    return {
      categories,
      current: categories.map((category) => currentMonthData[category]),
      past: categories.map((category) => pastMonthData[category]),
    };
  }


export default ManagerInsights;
import { ACCOUNT_TYPE } from "../utils/constants"

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/analytics",
    type: ACCOUNT_TYPE.WAREHOUSE_MANAGER,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "Fleet Activity",
    path: "/dashboard/fleetActivity",
    type: ACCOUNT_TYPE.WAREHOUSE_MANAGER,
    icon: "VscCalendar",
  },
  {
    id: 4,
    name: "Inventory",
    path: "/dashboard/inventory",
    type: ACCOUNT_TYPE.WAREHOUSE_MANAGER,
    icon: "VscPreview",
  },
  {
    id: 5,
    name: "Orders",
    path: "/dashboard/orders",
    type: ACCOUNT_TYPE.WAREHOUSE_MANAGER,
    icon: "VscGraph",
  },
  {
    id: 6,
    name: "Requests",
    path: "/dashboard/deliveries",
    type: ACCOUNT_TYPE.SUPPLIER,
    icon: "VscChecklist",
  },
]
import { Outlet } from "react-router-dom";
import SideBar from "../components/LandingPageBlocks/SideBar";
const RootRestaurant = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet />
      </div>
      <div className="drawer-side border-r border-gray-700">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Sidebar content here */}
        <SideBar />
      </div>
    </div>
  );
};

export default RootRestaurant;
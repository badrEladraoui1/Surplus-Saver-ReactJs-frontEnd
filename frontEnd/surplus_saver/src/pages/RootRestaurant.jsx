import { Outlet } from "react-router-dom";
import SideBar from "../components/LandingPageBlocks/SideBar";
import NavForUser from "../components/UI/NavForUser";

import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const RootRestaurant = () => {
  const { userUserName } = useContext(UserContext);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        <div className="sticky top-0">
          <NavForUser userUserName={userUserName} />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <Outlet />
        </div>
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

import { NavLink } from "react-router-dom";

const SideBarAdmin = () => {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-xl flex flex-col gap-5">
      {/* Sidebar content here */}
      <li className="space-y-5">
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? "text-pink" : undefined)}
          end
        >
          Users
        </NavLink>
      </li>
      <br />
      <li>
        {" "}
        <NavLink
          to="/admin/posts"
          className={({ isActive }) => (isActive ? "text-green" : undefined)}
        >
          Posts
        </NavLink>
      </li>
    </ul>
  );
};

export default SideBarAdmin;

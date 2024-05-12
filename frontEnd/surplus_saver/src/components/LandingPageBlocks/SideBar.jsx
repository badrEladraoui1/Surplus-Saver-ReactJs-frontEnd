import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-xl flex flex-col gap-5">
      {/* Sidebar content here */}
      <li className="space-y-5">
        <NavLink
          to="/restaurant"
          className={({ isActive }) => (isActive ? "text-pink" : undefined)}
          end
        >
          Home Page
        </NavLink>
      </li>
      <br />
      <li>
        {" "}
        <NavLink
          to="/restaurant/newPost"
          className={({ isActive }) => (isActive ? "text-green" : undefined)}
        >
          New Post
        </NavLink>
      </li>
      {/* <li>
        {" "}
        <NavLink
          to="/restaurant/modifyPost/:id"
          className={({ isActive }) => (isActive ? "text-orange" : undefined)}
        >
          Modify Post
        </NavLink>
      </li> */}
      <li>
        {" "}
        <NavLink
          to="/restaurant/myPosts"
          className={({ isActive }) => (isActive ? "text-yellow" : undefined)}
        >
          My Posts
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink
          to="/restaurant/interest_requests"
          className={({ isActive }) => (isActive ? "text-yellow" : undefined)}
        >
          Interest Requests
        </NavLink>
      </li>
    </ul>
  );
};

export default SideBar;

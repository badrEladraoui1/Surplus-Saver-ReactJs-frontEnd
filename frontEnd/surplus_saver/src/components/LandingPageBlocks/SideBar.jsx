import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-xl flex flex-col gap-5">
      {/* Sidebar content here */}
      <li className="space-y-5">
        <NavLink
          to="/restaurant"
          className={({ isActive }) =>
            isActive ? "text-silver font-bold" : "font-bold"
          }
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
          className={({ isActive }) =>
            isActive ? "text-silver font-bold" : "font-bold"
          }
        >
          New Post
        </NavLink>
      </li>
      {/* <li>
        {" "}
        <NavLink
          to="/restaurant/modifyPost/:id"
          className={({ isActive }) => (isActive ? "text-orange font-bold" : "font-bold")}
        >
          Modify Post
        </NavLink>
      </li> */}
      <li>
        {" "}
        <NavLink
          to="/restaurant/myPosts"
          className={({ isActive }) =>
            isActive ? "text-silver font-bold" : "font-bold"
          }
        >
          My Posts
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink
          to="/restaurant/interest_requests"
          className={({ isActive }) =>
            isActive ? "text-silver font-bold" : "font-bold"
          }
        >
          Interest Requests
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink
          to="/restaurant/post_feedbacks"
          className={({ isActive }) =>
            isActive ? "text-silver font-bold" : "font-bold"
          }
        >
          Posts Feedbacks
        </NavLink>
      </li>
    </ul>
  );
};

export default SideBar;

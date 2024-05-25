import { NavLink } from "react-router-dom";

const SideBarConsumer = () => {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-xl flex flex-col gap-5">
      {/* Sidebar content here */}
      <li className="space-y-5">
        <NavLink
          to="/consumer"
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
          to="/consumer/savedPosts"
          className={({ isActive }) =>
            isActive ? "text-silver font-bold" : "font-bold"
          }
        >
          Saved Posts
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink
          to="/consumer/interests_feedbacks"
          className={({ isActive }) =>
            isActive ? "text-silver font-bold" : "font-bold"
          }
        >
          Interests Feedbacks
        </NavLink>
      </li>
    </ul>
  );
};

export default SideBarConsumer;

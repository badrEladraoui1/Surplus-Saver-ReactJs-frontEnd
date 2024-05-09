/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const NavForUser = ({ userUserName }) => {
  const { userProfilePic } = useContext(UserContext);

  const { userRole } = useContext(UserContext);
  let role = "";
  if (userRole) {
    role = userRole.split("_")[1].toLowerCase();
  }
  console.log(role);

  const { logout } = useContext(UserContext);

  return (
    <div className="navbar bg-base-100 -z-20">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          SurplusSaver
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={userProfilePic} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a>{`Hello, ${userUserName}`}</a>
            </li>
            <li>
              <Link to={`/${role}/profile`}>
                <h6 className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </h6>
              </Link>
            </li>
            {/* <li>
              <a>Settings</a>
            </li> */}
            <li>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavForUser;

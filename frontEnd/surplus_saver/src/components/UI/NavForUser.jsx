/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Button from "./Button";
import axios from "axios";
import { api } from "../../Utils/backendApi";

const NavForUser = ({ userUserName }) => {
  const { userProfilePic, userRole, logout, setSearchResults } =
    useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");

  let role = "";
  if (userRole) {
    role = userRole.split("_")[1].toLowerCase();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchInput) {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/posts/search?keyword=${searchInput}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setSearchResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="navbar bg-base-100 -z-20">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          SurplusSaver
        </Link>
      </div>
      <div className="flex-none gap-2">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              value={searchInput}
              onChange={handleInputChange}
            />
            <Button ghost type="submit">
              Search
            </Button>
          </div>
        </form>

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

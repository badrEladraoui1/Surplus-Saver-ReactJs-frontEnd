/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import LoadingImage from "./LoadingImage";

import useDisplayProfilePicInterests from "../../hooks/DisplayProfilePicInterests";

const DropDownUser = ({ name, email, address, phone, username, imagePath }) => {
  const { userProfilePic, loadingImage, imageError } =
    useDisplayProfilePicInterests({ imagePath });

  return (
    <details className="dropdown">
      <summary className="m-1 text-green font-bold text-xl">{username}</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-60">
        <div className="avatar mx-auto">
          {userProfilePic ? (
            <div className="w-24 rounded-full">
              <img src={userProfilePic} />
            </div>
          ) : loadingImage ? (
            <LoadingImage />
          ) : (
            <p>{`Error loading image: ${imageError?.message}`}</p>
          )}
        </div>
        <li>
          <a>name : {name}</a>
        </li>
        <li>
          <a>email : {email}</a>
        </li>
        <li>
          <a>address : {address}</a>
        </li>
        <li>
          <a>phone : {phone}</a>
        </li>
      </ul>
    </details>
  );
};

export default DropDownUser;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import LoadingImage from "./LoadingImage";
import useDisplayProfilePicInterests from "../../hooks/DisplayProfilePicInterests";
import TextShine from "./TextShine";
const DropDownUser = ({
  name,
  email,
  address,
  phone,
  username,
  imagePath,
  className,
}) => {
  const { userProfilePic, loadingImage, imageError } =
    useDisplayProfilePicInterests({ imagePath });

  return (
    <details className="dropdown font-mono p-3">
      <summary className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-transparent m-1 text-silver font-bold text-2xl cursor-pointer">
        {username}
      </summary>
      {/* <TextShine
        content={username}
        className="m-1 text-silver font-bold text-xl"
      /> */}
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

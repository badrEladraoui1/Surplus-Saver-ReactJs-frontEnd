/* eslint-disable no-undef */
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import LoadingImage from "../components/UI/LoadingImage";

const useProfilePic = () => {
  const { loadingImage, imageError, userProfilePic } = useContext(UserContext);

  return (
    <div className=" border-4 border-silver p-5 rounded-md flex flex-col justify-center items-center text-center w-80">
      {userProfilePic ? (
        <img className="size-[30rem]" src={userProfilePic} alt="User image" />
      ) : loadingImage ? (
        <LoadingImage />
      ) : imageError ? (
        "Error"
      ) : (
        "Upload your profile picture"
      )}
    </div>
  );
};

export default useProfilePic;

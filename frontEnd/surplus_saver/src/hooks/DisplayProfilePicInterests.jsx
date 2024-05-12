/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { api } from "../Utils/backendApi";
import axios from "axios";

const useDisplayProfilePicInterests = ({ imagePath }) => {
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    const fetchProfilePic = async () => {
      setLoadingImage(true);
      setImageError(null);

      try {
        const imageResponse = await axios.get(
          `${api}/SurplusSaverApiV1/${imagePath}`,
          {
            responseType: "blob", // Important
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        // Create a URL for the image
        const imageUrl = URL.createObjectURL(imageResponse.data);

        // Set the image URL in the state
        setUserProfilePic(imageUrl);
      } catch (error) {
        setImageError(error);
        console.error("Failed to fetch profile picture:", error);
      } finally {
        setLoadingImage(false);
      }
    };
    fetchProfilePic();
  }, [imagePath]);

  return { userProfilePic, loadingImage, imageError };
};

export default useDisplayProfilePicInterests;

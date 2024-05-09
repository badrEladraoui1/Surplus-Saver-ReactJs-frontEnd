/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { api } from "../Utils/backendApi";

export const UserContext = createContext({
  userUserName: "",
  userId: "",
  userRole: "",
  userPhone: "",
  userAddress: "",
  userProfilePic: "",
  loadingImage: false,
  imageError: null,
  setUserUserName: () => {},
  logout: () => {},
});

function UserContextProvider({ children }) {
  const [userUserName, setUserUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken((prevToken) => localStorage.getItem("token") || prevToken);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (token) {
      const { sub, id, role, phone, address } = jwtDecode(
        token.replace("Bearer ", "")
      );
      if (sub) setUserUserName(sub);
      if (id) setUserId(id);
      if (role) setUserRole(role);
      if (phone) setUserPhone(phone);
      if (address) setUserAddress(address);

      // Fetch the profile picture
      const fetchProfilePic = async () => {
        setLoadingImage(true);
        setImageError(null);
        try {
          const response = await axios.get(
            `${api}/SurplusSaverApiV1/users/profile`,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );

          const imagePath = response.data.imagePath;

          // Fetch the image
          if (imagePath) {
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
          }
        } catch (error) {
          setImageError(error);
          console.error("Failed to fetch profile picture:", error);
        } finally {
          setLoadingImage(false);
        }
      };

      fetchProfilePic();
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setUserUserName("");
    setUserId("");
    setUserRole("");
    setUserProfilePic("");
    setLoadingImage(false);
    setImageError(null);
    setToken(null);
  };

  const userCtx = {
    userUserName: userUserName,
    userId: userId,
    userRole: userRole,
    userPhone: userPhone,
    userAddress: userAddress,
    userProfilePic: userProfilePic,
    loadingImage: loadingImage,
    imageError: imageError,
    setUserUserName: setUserUserName,
    logout: logout,
  };

  return (
    <UserContext.Provider value={userCtx}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;

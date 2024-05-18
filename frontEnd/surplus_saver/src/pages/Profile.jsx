/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { api } from "../Utils/backendApi";
import useProfilePic from "../hooks/useProfilePic";

import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import LoadingImage from "../components/UI/LoadingImage";

import Toast from "../components/UI/Toast";

const Profile = () => {
  const { userProfilePic } = useContext(UserContext);
  const [toastInfo, setToastInfo] = useState("");

  const profilePic = useProfilePic();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [serverImagePath, setServerImagePath] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [imagePath, setImagePath] = useState("");
  console.log(imagePath);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/users/profile`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);

        // set form values
        setValue("username", response.data.username);
        setValue("email", response.data.email);
        setValue("phone", response.data.phone);
        setValue("address", response.data.address);

        const imagePath = response.data.imagePath;
        setServerImagePath(imagePath);

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
          setImageURL(imageUrl);
        }

        // add more fields if needed
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [setValue]); // add setValue as a dependency

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.imagePath[0]); // append the file to formData

      const response = await axios.post(
        `${api}/SurplusSaverApiV1/users/update`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data", // add this line
          },
        }
      );
      console.log("submitted : ", response.data);
      setToastInfo({
        type: "success",
        message:
          "Profile updated successfully! refresh the page to see changes.",
      });
      setTimeout(() => setToastInfo(null), 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setToastInfo({ type: "error", message: "Failed to update profile." });
      setTimeout(() => setToastInfo(null), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen gap-20">
      {profilePic ? <div className="avatar ">{profilePic}</div> : "daa"}
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <h2 className="text-center font-bold text-xl">User Profile</h2>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              disabled
              {...register("username", {
                required: true,
                pattern: /^[A-Z][a-zA-Z0-9]*$/,
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">
                Username must start with a capital letter
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              disabled
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid email address
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone"
              disabled
              {...register("phone", {
                required: true,
                pattern: /^\d{10}$/,
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">
                Phone number must be 10 digits
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Address"
              {...register("address", { required: true })}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">
                This field is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="file"
              placeholder="Image"
              {...register("imagePath")}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center ">
            <input
              type="submit"
              value="Update"
              className=" hover:bg-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center cursor-pointer"
            />
          </div>
        </form>
      </div>
      {toastInfo && (
        <Toast
          content={toastInfo.message}
          success={toastInfo.type === "success"}
          info={toastInfo.type === "info"}
          error={toastInfo.type === "error"}
        />
      )}
    </div>
  );
};

export default Profile;

/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { api } from "../Utils/backendApi";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // add this line
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

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${api}/SurplusSaverApiV1/users/profile`,
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //           },
  //         }
  //       );
  //       console.log(response.data);

  //       // set form values
  //       setValue("username", response.data.username);
  //       setValue("email", response.data.email);
  //       setValue("phone", response.data.phone);
  //       setValue("address", response.data.address);

  //       const imagePath = response.data.imagePath;
  //       setImagePath(imagePath);

  //       // Fetch the image
  //       if (imagePath) {
  //         const imageResponse = await axios.get(
  //           `${api}/SurplusSaverApiV1/${imagePath}`,
  //           {
  //             responseType: "blob", // Important
  //             headers: {
  //               Authorization: localStorage.getItem("token"),
  //             },
  //           }
  //         );

  //         // Create a URL for the image
  //         const imageUrl = URL.createObjectURL(imageResponse.data);

  //         // Set the image URL in the state
  //         setImagePath(imageUrl);
  //       }

  //       // add more fields if needed
  //     } catch (error) {
  //       console.error("Failed to fetch profile:", error);
  //     }
  //   };

  //   fetchProfile();
  // }, [setValue]); // add setValue as a dependency

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${api}/SurplusSaverApiV1/users/profile`,
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //           },
  //         }
  //       );
  //       console.log(response.data);

  //       // set form values
  //       setValue("username", response.data.username);
  //       setValue("email", response.data.email);
  //       setValue("phone", response.data.phone);
  //       setValue("address", response.data.address);
  //       setImagePath(response.data.imagePath);

  //       // add more fields if needed
  //     } catch (error) {
  //       console.error("Failed to fetch profile:", error);
  //     }
  //   };

  //   fetchProfile();
  // }, [setValue]); // add setValue as a dependen

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${api}/SurplusSaverApiV1/${imagePath}`,
  //         {
  //           responseType: "blob", // Important
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //           },
  //         }
  //       );

  //       // Create a URL for the image
  //       const imageUrl = URL.createObjectURL(response.data);

  //       // Set the image URL in the state
  //       setImagePath(imageUrl);
  //     } catch (error) {
  //       console.error("Failed to fetch image:", error);
  //     }
  //   };

  //   // Call the function to fetch the image
  //   fetchImage();
  // }, [imagePath]); // Add imagePath as a dependency

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
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen gap-20">
      <div className="border-2 border-white p-5 rounded-md">
        {imageURL && <img src={imageURL} alt="User image" />}
      </div>
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
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

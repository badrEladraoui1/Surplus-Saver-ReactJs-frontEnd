import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import { api } from "../Utils/backendApi";

const RestaurantsSignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading indicator

  const navigate = useNavigate(); // Initialize useHistory hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const loadingIcon = (
  //   <span className="loading loading-infinity loading-lg"></span>
  // ); // Loading indicator

  const onSubmit = async (data) => {
    // Function to handle form submission and API call to create a new user account in the database using the POST method of the REST API  endpoint : `${api}/SurplusSaverApi/restaurants/signup`, data: data , i am getting two succefull messages from the backend meessage1 add the loading indicator besides the first message and message2 i want you to show message1 for 3 seconds , message2 for 2 seconds and then redirect to the sign_up page and clean up the second message
    try {
      // Try block to catch errors
      setLoading(true); // Set loading to true
      const response = await axios.post(
        `${api}/SurplusSaverApi/restaurants/signup`,
        data
      );
      console.log(response.data); // Handle successful response
      setSuccessMessage(response.data.message); // Display success message
      setTimeout(() => {
        setSuccessMessage(null); // Remove success message after 3 seconds
        navigate("/sign_up"); // Redirect to the sign-in page
      }, 3000);
    } catch (error) {
      // Catch block to handle errors
      setLoading(false); // Set loading to false
      setErrorMessage(null); // Set error message to null
      if (error.response) {
        // Check if there is a response from the server
        setErrorMessage(error.response.data.message); // Set error message to response message
      } else if (error.request) {
        // Check if there is no response from the server
        setErrorMessage("No response received from server"); // Set error message to no response message
      } else {
        // Handle other errors
        setErrorMessage("An error occurred while sending the request"); // Set error message to generic error message
      }
      setTimeout(() => {
        setErrorMessage(null); // Remove error message after 3 seconds
      }, 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center p-10 gap-4"
    >
      {loading && <div>Loading...</div>} {/* Display loading indicator */}
      {errorMessage && (
        <span className="text-red-500 font-bold text-xl">{errorMessage}</span>
      )}
      {successMessage && (
        <span className="text-green font-bold text-xl">{successMessage}</span>
      )}
      <input
        type="text"
        placeholder="Restaurant Name"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("userName", {
          required: true,
          pattern: /^[A-Z][a-zA-Z]*$/, // Pattern to ensure the name starts with a capital letter
        })}
      />
      {errors.userName && errors.userName.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )}
      {errors.userName && errors.userName.type === "pattern" && (
        <span className="text-red-500">
          Restaurant name must start with a capital letter
        </span>
      )}
      <input
        type="text"
        placeholder="Email"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("email", {
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        })}
      />
      {errors.email && errors.email.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <span className="text-red-500">Invalid email format</span>
      )}
      <input
        type="text"
        placeholder="Address"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("address", { required: true })}
      />
      {errors.address && (
        <span className="text-red-500">This field is required</span>
      )}
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("password", { required: true })}
      />
      {errors.password && (
        <span className="text-red-500">This field is required</span>
      )}
      <input
        type="text"
        placeholder="Small Description"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("smallDescription", { required: true })}
      />
      {errors.smallDescription && (
        <span className="text-red-500">This field is required</span>
      )}
      <input
        type="Text"
        placeholder="Restaurant Phone Number"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("phoneNumber", {
          required: true,
          // pattern: /^\d{10}$/, // Pattern to ensure the input is a 10-digit number
        })}
      />
      {errors.phoneNumber && errors.phoneNumber.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )}
      {/* {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
        <span className="text-red-500">
          Please enter a 10-digit phone number
        </span>
      )} */}
      <input type="submit" value="Sign Up" className="btn btn-primary" />
    </form>
  );
};

export default RestaurantsSignUpPage;

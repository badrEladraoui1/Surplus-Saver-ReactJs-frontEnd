import { useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";

import { api } from "../Utils/backendApi";

const RestaurantsSignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${api}/SurplusSaverApi/restaurants/signup`,
        data
      );
      console.log(response.data); // Handle successful response
      setSuccessMessage("Signup successful!"); // Display success message
      setTimeout(() => {
        setSuccessMessage(null); // Remove success message after 3 seconds
      }, 3000);
      // Clear form and show success message
    } catch (error) {
      setErrorMessage(null);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage("An error occurred while sending the request");
      }
      setTimeout(() => {
        setErrorMessage(null); // Remove error message after 3 seconds
      }, 3000);
    }
  };

  console.log(watch("restaurant_name"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center p-10 gap-4"
    >
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
        {...register("user_name", {
          required: true,
          pattern: /^[A-Z][a-zA-Z]*$/, // Pattern to ensure the name starts with a capital letter
        })}
      />
      {errors.user_name && errors.user_name.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )}
      {errors.user_name && errors.user_name.type === "pattern" && (
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
        {...register("small_description", { required: true })}
      />
      {errors.small_description && (
        <span className="text-red-500">This field is required</span>
      )}

      <input
        type="text"
        placeholder="Restaurant Phone Number"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("phone_number", {
          required: true,
          pattern: /^\d{10}$/, // Pattern to ensure the input is a 10-digit number
        })}
      />
      {errors.phone_number && errors.phone_number.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )}
      {errors.phone_number && errors.phone_number.type === "pattern" && (
        <span className="text-red-500">
          Please enter a 10-digit phone number
        </span>
      )}

      <input type="submit" value="Sign Up" className="btn btn-primary" />
    </form>
  );
};

export default RestaurantsSignUpPage;

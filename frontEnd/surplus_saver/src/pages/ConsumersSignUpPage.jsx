import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { api } from "../Utils/backendApi";

const ConsumersSignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${api}/SurplusSaverApi/consumers/signup`,
        data
      );
      console.log(response.data); // Handle successful response
      setSuccessMessage("Signup successful!"); // Display success message
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
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center p-10 gap-4"
    >
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      {successMessage && (
        <span className="text-green-500">{successMessage}</span>
      )}
      <input
        type="text"
        placeholder="UserName"
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
          UserName must start with a capital letter
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
        type="password"
        placeholder="Password"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("password", { required: true })}
      />
      {errors.password && (
        <span className="text-red-500">This field is required</span>
      )}

      <input type="submit" value="Sign Up" className="btn btn-primary" />
    </form>
  );
};

export default ConsumersSignUpPage;

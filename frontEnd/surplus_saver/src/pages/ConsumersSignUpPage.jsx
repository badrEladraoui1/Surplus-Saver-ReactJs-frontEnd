import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { api } from "../Utils/backendApi";

const ConsumersSignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate(); // Initialize useHistory hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Function to handle form submission and API call to create a new user account in the database using the POST method of the REST API  endpoint : `${api}/SurplusSaverApi/restaurants/signup`, data: data , i am getting two succefull messages from the backend meessage1 add the loading indicator besides the first message and message2 i want you to show message1 for 3 seconds , message2 for 2 seconds and then redirect to the sign_up page and clean up the second message
    try {
      // Try block to catch errors
      const response = await axios.post(
        `${api}/SurplusSaverApiV1/auth/signup/consumer`,
        data
      );
      console.log(response.data); // Handle successful response
      setSuccessMessage(response.data); // Display success message
      setTimeout(() => {
        setSuccessMessage(null); // Remove success message after 3 seconds
        navigate("/sign_in"); // Redirect to the sign-in page
      }, 3000);
    } catch (error) {
      // Catch block to handle errors
      setErrorMessage(null); // Set error message to null
      if (error.response) {
        // Check if there is a response from the server
        console.log(error.response.data);
        setErrorMessage(error.response.data); // Set error message to response message
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
      {errorMessage && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      <input
        type="text"
        placeholder="Full Name"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("name", {
          required: true,
        })}
      />
      {errors.name && errors.name.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )}

      <input
        type="text"
        placeholder="User Name"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("username", {
          required: true,
          pattern: /^[A-Z][a-zA-Z]*$/, // Pattern to ensure the name starts with a capital letter
        })}
      />
      {errors.username && errors.username.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )}
      {errors.username && errors.username.type === "pattern" && (
        <span className="text-red-500">
          User Name must start with a capital letter and cannot contain numbers
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
        type="Text"
        placeholder="Phone Number"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("phone", {
          required: true,
          pattern: /^\d{10}$/, // Pattern to ensure the input is a 10-digit number
        })}
      />
      {errors.phone && errors.phone.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )}

      <input type="submit" value="Sign Up" className="btn btn-neutral" />

      {successMessage && (
        <div role="alert" className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            Redirecting you to the <span className="font-bold">Sign In </span>
            Page
          </span>
        </div>
      )}
    </form>
  );
};

export default ConsumersSignUpPage;

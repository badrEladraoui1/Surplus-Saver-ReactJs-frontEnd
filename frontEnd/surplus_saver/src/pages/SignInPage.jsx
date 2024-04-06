/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { api } from "../Utils/backendApi";

const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  // const navigate = useNavigate(); // Initialize useHistory hook
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const navigate = useNavigate(); // Initialize useHistory hook

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${api}/SurplusSaverApiV1/auth/signin`,
        data
      );
      setSuccessMessage("Sign in successful"); // Set the success message immediately
      console.log(response.data);
      localStorage.setItem(
        "token",
        `${response.data.tokenType} ${response.data.accessToken}`
      );
      // navigate("/some-route"); // Redirect to some route

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setErrorMessage(null);
      if (error.response) {
        setErrorMessage("Wrong credentials provided please try again");
      } else if (error.request) {
        setErrorMessage("No response received from server");
      } else {
        setErrorMessage("An error occurred while sending the request");
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  // const onSubmit = async (data) => {
  //   // Function to handle form submission and API call to create a new user account in the database using the POST method of the REST API  endpoint : `${api}/SurplusSaverApi/restaurants/signup`, data: data , i am getting two succefull messages from the backend meessage1 add the loading indicator besides the first message and message2 i want you to show message1 for 3 seconds , message2 for 2 seconds and then redirect to the sign_up page and clean up the second message
  //   try {
  //     // Try block to catch errors
  //     const response = await axios.post(
  //       `${api}/SurplusSaverApiV1/auth/signin`,
  //       data,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     console.log(response.data); // Handle successful response
  //     setSuccessMessage(response.data); // Display success message
  //     setTimeout(() => {
  //       setSuccessMessage(null); // Remove success message after 3 seconds
  //       // navigate("/sign_up"); // Redirect to the sign-in page
  //     }, 3000);
  //   } catch (error) {
  //     // Catch block to handle errors
  //     setErrorMessage(null); // Set error message to null
  //     if (error.response) {
  //       // Check if there is a response from the server
  //       setErrorMessage(error.response.data); // Set error message to response message
  //     } else if (error.request) {
  //       // Check if there is no response from the server
  //       setErrorMessage("No response received from server"); // Set error message to no response message
  //     } else {
  //       // Handle other errors
  //       setErrorMessage("An error occurred while sending the request"); // Set error message to generic error message
  //     }
  //     setTimeout(() => {
  //       setErrorMessage(null); // Remove error message after 3 seconds
  //     }, 3000);
  //   }
  // };

  // based on the previous on submit function create another one that stores the token in the local storage and redirect to the home page
  // const onSubmit = async (data) => {
  //   try {
  //     const response = await axios.post(`${api}/SurplusSaverApiV1/auth/signin`, data);
  //     console.log(response.data);
  //     setSuccessMessage(response.data);
  //     setTimeout(() => {
  //       setSuccessMessage(null);
  //       localStorage.setItem("token", response.data.token);
  //       navigate("/");
  //     }, 3000);
  //   } catch (error) {
  //     setErrorMessage(null);
  //     if (error.response) {
  //       setErrorMessage(error.response.data);
  //     } else if (error.request) {
  //       setErrorMessage("No response received from server");
  //     } else {
  //       setErrorMessage("An error occurred while sending the request");
  //     }
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 3000);
  //   }
  // };

  return (
    <section className="flex flex-col justify-center items-center p-10 gap-10 ">
      <h3 className="text-5xl font-bold gap-5">Sign In</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-5 "
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
          <div role="alert" className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username OR Email"
            {...register("usernameOrEmail", { required: true })}
          />
        </label>
        {errors.usernameOrEmail && (
          <span className="text-red-500">Username is required</span>
        )}

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <span className="text-red-500">Password is required</span>
        )}

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </section>
  );
};

export default SignInPage;

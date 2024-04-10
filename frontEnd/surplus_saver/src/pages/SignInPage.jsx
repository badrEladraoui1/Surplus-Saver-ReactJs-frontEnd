/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { api } from "../Utils/backendApi";

const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log(storedToken);
      const { role } = jwtDecode(storedToken);
      if (role) setUserRole(role);
    }
  }, []);

  useEffect(() => {
    if (userRole === "ROLE_CONSUMER") {
      navigate("/consumer");
    } else if (userRole === "ROLE_RESTAURANT") {
      navigate("/restaurant");
    }
  }, [userRole, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${api}/SurplusSaverApiV1/auth/signin`,
        data
      );
      setSuccessMessage(
        "Sign in successful. Redirecting you to the home page..."
      ); // Set the success message immediately
      console.log(response.data);
      localStorage.setItem(
        "token",
        `${response.data.tokenType} ${response.data.accessToken}`
      );
      const { role } = jwtDecode(
        `${response.data.tokenType} ${response.data.accessToken}`
      );
      console.log(role); // Log the role to the console
      if (role) setUserRole(role);
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
        if (role === "ROLE_CONSUMER") {
          navigate("/consumer");
        } else if (role === "ROLE_RESTAURANT") {
          navigate("/restaurant");
        }
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

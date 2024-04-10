/* eslint-disable no-unused-vars */
import { useForm, useFieldArray } from "react-hook-form";

import axios from "axios";

import Button from "../components/UI/Button";

import { UserContext } from "../contexts/UserContext";
import { useState, useContext, useEffect } from "react";

import { api } from "../Utils/backendApi";

const NewPostPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { userUserName } = useContext(UserContext);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      restaurantName: userUserName,
      postDescription: "",
      items: [
        {
          itemName: "",
          itemType: "",
          quantity: "",
          description: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    setValue("restaurantName", userUserName);
  }, [userUserName, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    console.log(localStorage.getItem("token"));
    try {
      const response = await axios.post(
        `${api}/SurplusSaverApiV1/posts/createPost`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"), // replace with the way you store your token
          },
        }
      );
      console.log(response.data); // Handle successful response
      setSuccessMessage(response.data); // Display success message
      setTimeout(() => {
        setSuccessMessage(null); // Remove success message after 3 seconds
      }, 3000);
      reset();
      console.log("Post created successfully");
    } catch (error) {
      // Catch block to handle errors
      setErrorMessage(null); // Set error message to null
      if (error.response) {
        // Check if there is a response from the server
        setErrorMessage("there was an error while creating the post"); // Set error message to response message
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
    <section className="flex flex-col justify-center items-center text-center gap-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          Welcome <span className="text-green">{userUserName}</span> to the New
          Post Form
        </h1>
        <p className="mb-4">
          This form allows you to create a new post with a restaurant name, post
          description, and a dynamic list of items.
          <span className=" text-green">
            You can add up to <span className="font-bold">3 items.</span>
          </span>
          After submitting, the form will be reset.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-3xl font-bold ">New Post</h1>
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
        <div className="space-y-3">
          <label className="block font-medium text-xl">Restaurant Name:</label>
          <input
            {...register("restaurantName")}
            className="block w-full p-2 border border-gray-300 rounded"
            readOnly
          />
        </div>
        <div className="space-y-3">
          <label className="block  font-medium text-xl">
            Post Description:
          </label>
          <textarea
            {...register("postDescription", {
              required: true,
            })}
            className="block w-full p-2 border border-gray-300 rounded"
          />
          {errors.postDescription &&
            errors.postDescription.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
        </div>
        <div className="flex space-x-4 ">
          {fields.map((item, index) => (
            <div key={item.id} className="space-y-2">
              <input
                {...register(`items.${index}.itemName`, {
                  required: true,
                })}
                placeholder="Enter Item Name"
                className="block w-full p-2 border border-gray-300 rounded"
              />
              {errors.items &&
                errors.items[index] &&
                errors.items[index].itemName && (
                  <span className="text-red-500">This field is required</span>
                )}
              <input
                {...register(`items.${index}.itemType`, {
                  required: true,
                })}
                placeholder="Enter Item Type"
                className="block w-full p-2 border border-gray-300 rounded"
              />
              {errors.items &&
                errors.items[index] &&
                errors.items[index].itemType && (
                  <span className="text-red-500">This field is required</span>
                )}
              <input
                {...register(`items.${index}.quantity`, {
                  required: true,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Only numbers are allowed",
                  },
                })}
                placeholder="Enter Quantity (Kg)"
                className="block w-full p-2 border border-gray-300 rounded"
              />
              {errors.items &&
                errors.items[index] &&
                errors.items[index].quantity &&
                errors.items[index].quantity.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
              {errors.items &&
                errors.items[index] &&
                errors.items[index].quantity &&
                errors.items[index].quantity.type === "pattern" && (
                  <span className="text-red-500">Only numbers are allowed</span>
                )}
              <textarea
                {...register(`items.${index}.description`, {
                  required: true,
                })}
                placeholder="Enter Description"
                className="block w-full p-2 border border-gray-300 rounded"
              />
              {errors.items &&
                errors.items[index] &&
                errors.items[index].description && (
                  <span className="text-red-500">This field is required</span>
                )}
              <div>
                {" "}
                <Button
                  outline_error
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="space-x-10 space-y-10">
          <Button
            outline_default
            type="button"
            onClick={() =>
              append({
                itemName: "",
                itemType: "",
                quantity: "",
                description: "",
              })
            }
            disabled={fields.length >= 3}
          >
            Add
          </Button>
          <Button outline_primary type="submit">
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewPostPage;

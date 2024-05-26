/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "../components/UI/Toast";

import { api } from "../Utils/backendApi";

import Button from "../components/UI/Button";
import axios from "axios";

const ModifyPostPage = () => {
  const [postData, setPostData] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [itemImages, setItemImages] = useState([]);
  console.log(itemImages);

  const { register, control, handleSubmit, reset, setValue } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/posts/getPostById/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const data = response.data;
        setPostData(data);
        Object.keys(data).forEach((key) => {
          if (key !== "items") {
            setValue(key, data[key]);
          }
        });
        if (data.items) {
          setValue("items", data.items);

          // Fetch the images for each item
          const images = await Promise.all(
            data.items.map((item) =>
              axios.get(`${api}/SurplusSaverApiV1/items/${item.id}`, {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              })
            )
          );
          setItemImages(images.map((response) => response.data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      // Convert the postedAt string to a Date object
      const postedAtDate = new Date(data.postedAt);

      // Format the Date object as a string in the correct format
      const postedAtString = postedAtDate.toISOString();

      // Replace the postedAt field in the data object with the correctly formatted string
      data.postedAt = postedAtString;

      // Make a copy of the items array
      const items = [...data.items];

      // Remove the image files from the items in the data object
      data.items = data.items.map((item) => {
        const { image, ...itemWithoutImage } = item;
        return itemWithoutImage;
      });

      // Modify the post
      const response = await axios.put(
        `${api}/SurplusSaverApiV1/posts/modifyPost/${id}`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setSuccessMessage(response.data); // assuming the response contains a message field
      setErrorMessage("");
      reset();

      // Clear messages after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while modifying the post.");
      setSuccessMessage("");

      // Clear messages after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center text-center gap-10">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-orange">
          Modify Post Form
        </h1>

        <p className="mb-4">
          This form allows you to modify an existing post. After submitting, the
          form will be reset.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-2xl font-bold text-orange">Modify Post</h1>
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
            className="input input-bordered w-full max-w-xs"
            disabled
          />
        </div>
        <div className="space-y-3">
          <label className="block  font-medium text-xl">
            Post Description:
          </label>
          <textarea
            {...register("postDescription")}
            className="textarea textarea-bordered"
          />
        </div>
        <div className="flex space-x-4  ">
          {fields.map((item, index) => (
            <div key={item.id} className="space-y-2 flex flex-col">
              <input
                {...register(`items.${index}.itemName`)}
                placeholder="Enter Item Name"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                {...register(`items.${index}.itemType`)}
                placeholder="Enter Item Type"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                {...register(`items.${index}.quantity`)}
                placeholder="Enter Quantity"
                className="input input-bordered w-full max-w-xs"
              />
              <textarea
                {...register(`items.${index}.description`)}
                placeholder="Enter Description"
                className="textarea textarea-bordered"
              />
              <Button outline_error type="button" onClick={() => remove(index)}>
                Remove
              </Button>
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
    // <section className="flex flex-col justify-center items-center text-center gap-10">
    //   <div>
    //     <h1 className="text-4xl font-bold mb-4">
    //       <div className="flex flex-col gap-2">
    //         <TextShine
    //           content="Modify Post Form"
    //           className="text-5xl font-bold text-center"
    //         />
    //         <p className="text-xl">
    //           This form allows you to modify an existing post. After submitting,
    //           the form will be reset.
    //         </p>
    //       </div>
    //     </h1>
    //   </div>
    //   <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    //     <Toast
    //       success={toastType === "success"}
    //       error={toastType === "error"}
    //       content={toast}
    //     />
    //     <div className="flex flex-col justify-center items-center gap-2 mb-10">
    //       <label className="text-2xl font-bold">Restaurant Name:</label>
    //       <input
    //         {...register("restaurantName")}
    //         className="input input-bordered max-w-xs"
    //         disabled
    //       />
    //     </div>
    //     <div className="flex flex-col justify-center items-center gap-2">
    //       <label className="text-2xl font-bold">Post Description:</label>
    //       <textarea
    //         {...register("postDescription", {
    //           required: true,
    //         })}
    //         placeholder="Post Description"
    //         className="textarea textarea-bordered max-w-xs"
    //       />
    //       {errors.postDescription &&
    //         errors.postDescription.type === "required" && (
    //           <span className="text-red-500">This field is required</span>
    //         )}
    //     </div>
    //     <div className="flex space-x-4 ">
    //       {fields.map((item, index) => (
    //         <div key={item.id} className="space-y-2 flex flex-col">
    //           <input
    //             {...register(`items.${index}.itemName`, {
    //               required: true,
    //             })}
    //             placeholder="Enter Item Name"
    //             className="input input-bordered w-full max-w-xs"
    //           />
    //           {errors.items &&
    //             errors.items[index] &&
    //             errors.items[index].itemName && (
    //               <span className="text-red-500">This field is required</span>
    //             )}
    //           <input
    //             {...register(`items.${index}.itemType`, {
    //               required: true,
    //             })}
    //             placeholder="Enter Item Type"
    //             className="input input-bordered w-full max-w-xs"
    //           />
    //           {errors.items &&
    //             errors.items[index] &&
    //             errors.items[index].itemType && (
    //               <span className="text-red-500">This field is required</span>
    //             )}
    //           <input
    //             {...register(`items.${index}.quantity`, {
    //               required: true,
    //               pattern: {
    //                 value: /^[0-9]*$/,
    //                 message: "Only numbers are allowed",
    //               },
    //             })}
    //             placeholder="Enter Quantity (Kg)"
    //             className="input input-bordered w-full max-w-xs"
    //           />
    //           {errors.items &&
    //             errors.items[index] &&
    //             errors.items[index].quantity &&
    //             errors.items[index].quantity.type === "required" && (
    //               <span className="text-red-500">This field is required</span>
    //             )}
    //           {errors.items &&
    //             errors.items[index] &&
    //             errors.items[index].quantity &&
    //             errors.items[index].quantity.type === "pattern" && (
    //               <span className="text-red-500">Only numbers are allowed</span>
    //             )}
    //           <textarea
    //             {...register(`items.${index}.description`, {
    //               required: true,
    //             })}
    //             placeholder="Item Description"
    //             className="textarea textarea-bordered max-w-xs"
    //           />{" "}
    //           {errors.items &&
    //             errors.items[index] &&
    //             errors.items[index].description && (
    //               <span className="text-red-500">This field is required</span>
    //             )}
    //           <div>
    //             <Button ghost type="button" onClick={() => remove(index)}>
    //               Remove
    //             </Button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //     <div className="space-x-10 space-y-5">
    //       <Button
    //         ghost
    //         className="bg-white text-black font-bold"
    //         type="button"
    //         onClick={() =>
    //           append({
    //             itemName: "",
    //             itemType: "",
    //             quantity: "",
    //             description: "",
    //           })
    //         }
    //         disabled={fields.length >= 3}
    //       >
    //         Add
    //       </Button>
    //       <Button
    //         neutral
    //         type="submit"
    //         className="bg-silver text-black font-bold"
    //       >
    //         Submit
    //       </Button>
    //     </div>
    //   </form>
    // </section>
  );
};

export default ModifyPostPage;

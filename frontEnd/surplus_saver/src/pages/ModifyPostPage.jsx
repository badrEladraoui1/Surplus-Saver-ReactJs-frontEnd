/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    // defaultValue: [
    //   { itemName: "", itemType: "", quantity: "", description: "" },
    //   { itemName: "", itemType: "", quantity: "", description: "" },
    //   { itemName: "", itemType: "", quantity: "", description: "" },
    // ], // initialize with three empty objects
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${api}/SurplusSaverApiV1/posts/getPostById/${id}`,
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //           },
  //         }
  //       );
  //       const data = response.data;
  //       console.log(data);
  //       setPostData(data);
  //       Object.keys(data).forEach((key) => {
  //         if (key !== "items") {
  //           setValue(key, data[key]);
  //         }
  //       });
  //       if (data.items) {
  //         setValue("items", data.items);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [id, setValue]);

  // const onSubmit = async (data) => {
  //   try {
  //     console.log(data);
  //     const updatedPost = {
  //       id: id,
  //       restaurantName: data.restaurantName,
  //       postDescription: data.postDescription,
  //       items: data.items.map((item, index) => ({
  //         id: fields[index].id, // Assuming the original item id is stored in fields
  //         ...item,
  //       })),
  //     };
  //     await axios.put(
  //       `${api}/SurplusSaverApiV1/posts/modifyPost/${id}`,
  //       updatedPost,
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     reset();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
  // const onSubmit = async (data) => {
  //   try {
  //     // Convert the postedAt string to a Date object
  //     const postedAtDate = new Date(data.postedAt);

  //     // Format the Date object as a string in the correct format
  //     const postedAtString = postedAtDate.toISOString();

  //     // Replace the postedAt field in the data object with the correctly formatted string
  //     data.postedAt = postedAtString;

  //     console.log(data);
  //     const response = await axios.put(
  //       `${api}/SurplusSaverApiV1/posts/modifyPost/${id}`,
  //       data,
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     setSuccessMessage(response.data); // assuming the response contains a message field
  //     setErrorMessage("");
  //     reset();

  //     // Clear the success message after 3 seconds
  //     setTimeout(() => {
  //       setSuccessMessage("");
  //     }, 3000);
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMessage("An error occurred while modifying the post.");
  //     setSuccessMessage("");
  //   }
  //   console.log("submitted : ", data);
  // };

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
            className="block w-full p-2 border border-gray-300 rounded"
            disabled
          />
        </div>
        <div className="space-y-3">
          <label className="block  font-medium text-xl">
            Post Description:
          </label>
          <textarea
            {...register("postDescription")}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex space-x-4  ">
          {fields.map((item, index) => (
            <div key={item.id} className="space-y-2">
              <input
                {...register(`items.${index}.itemName`)}
                placeholder="Enter Item Name"
                className="block w-full p-2 border border-gray-300 rounded"
              />
              <input
                {...register(`items.${index}.itemType`)}
                placeholder="Enter Item Type"
                className="block w-full p-2 border border-gray-300 rounded"
              />
              <input
                {...register(`items.${index}.quantity`)}
                placeholder="Enter Quantity"
                className="block w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                {...register(`items.${index}.description`)}
                placeholder="Enter Description"
                className="block w-full p-2 border border-gray-300 rounded"
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
  );
};

export default ModifyPostPage;

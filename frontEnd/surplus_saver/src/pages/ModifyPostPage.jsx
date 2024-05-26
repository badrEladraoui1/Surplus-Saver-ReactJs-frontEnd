/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/UI/Button";
import Toast from "../components/UI/Toast";
import { api } from "../Utils/backendApi";
import TextShine from "../components/UI/TextShine";

const ModifyPostPage = () => {
  const [postDetails, setPostDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [itemImages, setItemImages] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const { id } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/posts/getPostById/${id}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const postData = response.data;
        setPostDetails(postData);

        Object.keys(postData).forEach((key) => {
          if (key !== "items") {
            setValue(key, postData[key]);
          }
        });
        if (postData.items) {
          setValue("items", postData.items);
        }

        const images = await Promise.all(
          postData.items.map((item) =>
            axios.get(`${api}/SurplusSaverApiV1/items/${item.id}`, {
              headers: { Authorization: localStorage.getItem("token") },
            })
          )
        );
        setItemImages(images.map((response) => response.data));
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occurred while fetching the post data");
      }
    };
    fetchPostData();
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    try {
      const postedAtDate = new Date(formData.postedAt);
      const postedAtString = postedAtDate.toISOString();
      formData.postedAt = postedAtString;

      const itemsCopy = [...formData.items];
      formData.items = formData.items.map((item) => {
        const { image, ...itemWithoutImage } = item;
        return itemWithoutImage;
      });

      const response = await axios.put(
        `${api}/SurplusSaverApiV1/posts/modifyPost/${id}`,
        formData,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setSuccessMessage(response.data);
      setToastType("success");
      setToastMessage(response.data);
      reset();
      setTimeout(() => {
        setToastMessage("");
        setToastType(null);
      }, 3000);
    } catch (error) {
      console.error(error);
      setToastType("error");
      setToastMessage("An error occurred while sending the request");
      setTimeout(() => {
        setToastMessage("");
        setToastType(null);
      }, 3000);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center text-center gap-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          <div className="flex flex-col gap-2">
            <TextShine
              content="Modify Post Form"
              className="text-5xl font-bold text-center"
            />
          </div>
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Toast
          success={toastType === "success"}
          error={toastType === "error"}
          content={toastMessage}
        />
        <div className="flex flex-col justify-center items-center gap-2 mb-10">
          <label className="text-2xl font-bold">Restaurant Name:</label>
          <input
            {...register("restaurantName")}
            className="input input-bordered max-w-xs"
            disabled
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <label className="text-2xl font-bold">Post Description:</label>
          <textarea
            {...register("postDescription", {
              required: true,
            })}
            placeholder="Post Description"
            className="textarea textarea-bordered max-w-xs"
          />
          {errors.postDescription &&
            errors.postDescription.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
        </div>
        <div className="flex space-x-4 ">
          {fields.map((item, index) => (
            <div key={item.id} className="space-y-2 flex flex-col">
              <input
                {...register(`items.${index}.itemName`, {
                  required: true,
                })}
                placeholder="Enter Item Name"
                className="input input-bordered w-full max-w-xs"
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
                className="input input-bordered w-full max-w-xs"
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
                className="input input-bordered w-full max-w-xs"
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
                placeholder="Item Description"
                className="textarea textarea-bordered max-w-xs"
              />{" "}
              {errors.items &&
                errors.items[index] &&
                errors.items[index].description && (
                  <span className="text-red-500">This field is required</span>
                )}
              <div>
                <Button ghost type="button" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="space-x-10 space-y-5">
          <Button
            ghost
            className="bg-white text-black font-bold"
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
          <Button
            neutral
            type="submit"
            className="bg-silver text-black font-bold"
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ModifyPostPage;

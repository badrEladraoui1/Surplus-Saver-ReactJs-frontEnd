import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import Button from "../components/UI/Button";
import TextShine from "../components/UI/TextShine";
import { UserContext } from "../contexts/UserContext";
import { useState, useContext, useEffect } from "react";
import { api } from "../Utils/backendApi";
import Toast from "../components/UI/Toast";

const NewPostPage = () => {
  const { userUserName } = useContext(UserContext);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState(null);

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
    try {
      const response = await axios.post(
        `${api}/SurplusSaverApiV1/posts/createPost`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      reset();
      setToastType("success");
      setToast(response.data);
      setTimeout(() => {
        setToast("");
        setToastType(null);
      }, 3000);
    } catch (error) {
      setToastType("error");
      setToast("An error occurred while sending the request");
      setTimeout(() => {
        setToast("");
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
              content="New Post Form"
              className="text-5xl font-bold text-center"
            />
            <p className="text-xl">
              You can add up to{" "}
              <TextShine content="3 items" className="text-xl" /> per post
            </p>
          </div>
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Toast
          success={toastType === "success"}
          error={toastType === "error"}
          content={toast}
        />
        <div className="flex flex-col justify-center items-center gap-2 mb-10">
          <label className="text-2xl font-bold">Restaurant Name:</label>
          <input
            {...register("restaurantName")}
            className="input input-bordered max-w-xs"
            readOnly
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

export default NewPostPage;

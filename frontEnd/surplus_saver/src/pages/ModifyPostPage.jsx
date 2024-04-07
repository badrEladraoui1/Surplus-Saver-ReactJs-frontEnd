import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "../components/UI/Button";
import axios from "axios";

const ModifyPostPage = ({ postId }) => {
  const [postData, setPostData] = useState(null);
  const { register, control, handleSubmit, reset, setValue } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // useEffect(() => {
  //   // Fetch post data from backend
  //   axios.get(`/api/posts/${postId}`).then((response) => {
  //     const data = response.data;
  //     setPostData(data);
  //     // Set form default values
  //     Object.keys(data).forEach((key) => {
  //       setValue(key, data[key]);
  //     });
  //   });
  // }, [postId, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    // Send a PUT request to the backend to update the post
    axios.put(`/api/posts/${postId}`, data).then(() => {
      reset();
    });
  };

  return (
    <section className="flex flex-col justify-center items-center text-center gap-10">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-green">Modify Post Form</h1>
        <p className="mb-4">
          This form allows you to modify an existing post. After submitting, the
          form will be reset.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-2xl font-bold text-pink">Modify Post</h1>
        <div className="space-y-3">
          <label className="block font-medium text-xl">Restaurant Name:</label>
          <input
            {...register("restaurantName")}
            className="block w-full p-2 border border-gray-300 rounded"
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
        <div className="flex space-x-4 ">
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

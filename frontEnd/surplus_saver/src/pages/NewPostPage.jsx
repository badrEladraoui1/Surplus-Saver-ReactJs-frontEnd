import { useForm, useFieldArray } from "react-hook-form";

import Button from "../components/UI/Button";

const NewPostPage = () => {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      restaurantName: "",
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

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <section className="flex flex-col justify-center items-center text-center gap-10">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-green">
          Welcome to the New Post Form
        </h1>
        <p className="mb-4">
          This form allows you to create a new post with a restaurant name, post
          description, and a dynamic list of items.
          <span className="font-bold text-orange">
            You can add up to 3 items.
          </span>
          After submitting, the form will be reset.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-2xl font-bold text-pink">New Post</h1>
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

export default NewPostPage;

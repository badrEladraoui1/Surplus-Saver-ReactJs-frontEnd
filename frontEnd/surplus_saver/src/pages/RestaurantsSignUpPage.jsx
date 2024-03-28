import { useForm } from "react-hook-form";
import axios from "axios";

const RestaurantsSignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "/SurplusSaverApi/restaurants/signup",
        data
      );
      console.log(response.data); // Handle successful response
    } catch (error) {
      console.log(error); // Handle error
    }
  };

  console.log(watch("restaurant_name"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center p-10 gap-4"
    >
      <input
        type="text"
        placeholder="Restaurant Name"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("restaurant_name", {
          required: true,
          pattern: /^[A-Z][a-zA-Z]*$/, // Pattern to ensure the name starts with a capital letter
        })}
      />
      {errors.restaurant_name && errors.restaurant_name.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )}
      {errors.restaurant_name && errors.restaurant_name.type === "pattern" && (
        <span className="text-red-500">
          Restaurant name must start with a capital letter
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
        placeholder="Small Description"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("description", { required: true })}
      />
      {errors.password && (
        <span className="text-red-500">This field is required</span>
      )}

      <input
        type="text"
        placeholder="Restaurant Phone Number"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("phone_number", {
          required: true,
          pattern: /^\d{10}$/, // Pattern to ensure the input is a 10-digit number
        })}
      />
      {errors.phone_number && errors.phone_number.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )}
      {errors.phone_number && errors.phone_number.type === "pattern" && (
        <span className="text-red-500">
          Please enter a 10-digit phone number
        </span>
      )}

      <input type="submit" value="Sign Up" className="btn btn-primary" />
    </form>
  );
};

export default RestaurantsSignUpPage;

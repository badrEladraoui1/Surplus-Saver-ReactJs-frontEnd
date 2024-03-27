import { useForm } from "react-hook-form";

const ConsumersSignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("full_name"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center p-10 gap-4"
    >
      <input
        type="text"
        placeholder="Full Name"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("full_name", { required: true })}
      />
      {errors.full_name && (
        <span className="text-red-500">This field is required</span>
      )}

      <input
        type="text"
        placeholder="UserName"
        className="input input-bordered input-lg w-full max-w-xs"
        {...register("user_name", {
          required: true,
          pattern: /^[A-Z][a-zA-Z]*$/, // Pattern to ensure the name starts with a capital letter
        })}
      />
      {errors.user_name && errors.user_name.type === "required" && (
        <span className="text-red-500">This field is required</span>
      )}
      {errors.user_name && errors.user_name.type === "pattern" && (
        <span className="text-red-500">
          UserName must start with a capital letter
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

      <input type="submit" value="Sign Up" className="btn btn-primary" />
    </form>
  );
};

export default ConsumersSignUpPage;

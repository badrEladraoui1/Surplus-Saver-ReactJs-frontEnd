// // create a useSignup hook for the signup form and the /SurplusSaverApiV1/auth/signup/"this should be customizable" endpoint
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// import { api } from "../Utils/backendApi";

// const useSignUpForm = ({ endPoint }) => {
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         `${api}/SurplusSaverApiV1/auth/signup/${endPoint}`,
//         data
//       );
//       setSuccessMessage(response.data);
//       setTimeout(() => {
//         setSuccessMessage(null);
//         navigate("/sign_up");
//       }, 3000);
//     } catch (error) {
//       setErrorMessage(null);
//       if (error.response) {
//         setErrorMessage(error.response.data);
//       } else if (error.request) {
//         setErrorMessage("No response received from server");
//       } else {
//         setErrorMessage("An error occurred while sending the request");
//       }
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 3000);
//     }
//   };

//   return { onSubmit, register, errors, errorMessage, successMessage };
// };

// export default useSignUpForm;

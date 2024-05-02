/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Post.jsx
import axios from "axios";
import { useState, useContext } from "react";
import Button from "./Button";
import { api } from "../../Utils/backendApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import ButtonRotatingBackgroundGradient from "./ButtonRotatingBackgroundGradient";
import ButtonAnimatedGradient from "./ButtonAnimatedGradient";

const Post = ({ post, onDelete, restaurant, consumer }) => {
  const { userPhone } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const modifyPost = () => {
    navigate(`/restaurant/modifyPost/${post.id}`);
  };

  const deletePostResto = async () => {
    try {
      const response = await axios.delete(
        `${api}/SurplusSaverApiV1/posts/deletePost/${post.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setSuccessMessage(response.data);
      setErrorMessage(null);
      setTimeout(() => onDelete(post.id), 2000); // 2000ms = 2 seconds
    } catch (error) {
      setErrorMessage("Failed to delete post: " + error);
      setSuccessMessage(null);
    }
  };

  const deletePostConsumer = async () => {
    try {
      const response = await axios.delete(
        `${api}/SurplusSaverApiV1/posts/removeSavedPost/${post.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setSuccessMessage(response.data);
      setErrorMessage(null);
      setTimeout(() => onDelete(post.id), 2000); // 2000ms = 2 seconds
    } catch (error) {
      setErrorMessage("Failed to delete post: " + error);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="mb-6 p-4 border rounded shadow">
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
        <div role="alert" className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{successMessage}</span>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-2">
        Restaurant&apos;s name : {post.restaurantName}
      </h2>
      <h2 className="text-2xl font-bold mb-2">Posted at : {post.postedAt}</h2>
      <h2 className="text-2xl font-bold mb-2">
        Restaurant&apos;s phone : {userPhone}
      </h2>
      <p className="mb-2">Post&apos;s description : {post.postDescription}</p>
      {post.items && (
        <ul className="list-disc pl-5">
          {post.items.map((item) => (
            <li key={item.id} className="mb-2">
              <h4 className="font-bold">{item.itemName}</h4>
              <p>Type: {item.itemType}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Description: {item.description}</p>
            </li>
          ))}
        </ul>
      )}
      {restaurant && (
        <div className="flex gap-3 justify-center p-5">
          <Button info onClick={modifyPost}>
            Modify
          </Button>
          <Button warning onClick={deletePostResto}>
            Delete
          </Button>
        </div>
      )}
      {consumer && (
        <ButtonAnimatedGradient
          onClick={deletePostConsumer}
          content={"Remove"}
        />
      )}
    </div>
  );
};

export default Post;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Post.jsx
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import Button from "./Button";
import { api } from "../../Utils/backendApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import ButtonRotatingBackgroundGradient from "./ButtonRotatingBackgroundGradient";
import ButtonAnimatedGradient from "./ButtonAnimatedGradient";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";

const Post = ({ post, onDelete, restaurant, consumer }) => {
  console.log(post);
  const { userPhone } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imagePath, setImagePath] = useState("");
  console.log(imagePath);

  useEffect(() => {
    const getImage = async () => {
      if (post.userProfilePictureUrl) {
        const imageResponse = await axios.get(
          `${api}/SurplusSaverApiV1/${post.userProfilePictureUrl}`,
          {
            responseType: "blob", // Important
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        // Create a URL for the image
        const imageUrl = URL.createObjectURL(imageResponse.data);

        // Set the image URL in the state
        setImagePath(imageUrl);
      }
    };

    getImage();
  }, [post.userProfilePictureUrl]);
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
    <div className="mb-6 border-4 border-silver shadow p-7 rounded-lg w-[60rem]">
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
      <div className="flex flex-col">
        <h2 className="text-4xl font-bold text-green-500 mb-10">
          <div className="flex justify-center items-center gap-3">
            <div className="avatar">
              <div className="w-24 mask mask-hexagon">
                <img src={imagePath} />
              </div>
            </div>
            <span className="italic text-[#bec6d5]">{post.restaurantName}</span>
          </div>
        </h2>
        <div className="flex flex-col gap-1 mb-5">
          <h2 className="text-2xl font-bold text-green-500">
            Posted at : <span className="text-[#8f96a2]">{post.postedAt}</span>
          </h2>
          <h2 className="text-2xl font-bold text-green-500">
            Restaurant&apos;s Phone:{" "}
            <span className="text-[#8f96a2]">{userPhone}</span>
          </h2>
          <p className=" text-2xl font-bold text-green-500">
            Post Description:{" "}
            <span className="text-[#8f96a2]">{post.postDescription}</span>
          </p>
        </div>
      </div>

      {post.items.map((item, index) => (
        <section className="flex flex-col" key={item.id}>
          <div className="border border-gray-300 p-4 my-4 rounded-md bg-gray-50 bg-opacity-90">
            <div className="flex gap-3 text-3xl font-bold text-gray-600 mb-2">
              <FontAwesomeIcon icon={faBowlFood} className="size-10" />
              <span className="italic text-3xl font-extrabold">
                {item.itemName}
              </span>
            </div>
            <p className="text-2xl text-gray-500 font-bold">
              Type:{" "}
              <span className="text-[#463f3a] font-mono">{item.itemType}</span>
            </p>
            <p className="text-2xl text-gray-500 font-bold">
              Quantity:{" "}
              <span className="text-[#463f3a] font-mono">
                {item.quantity}KG
              </span>
            </p>
            <p className="text-2xl text-gray-500 font-bold">
              Description:{" "}
              <span className="text-[#463f3a] font-mono">
                {item.description}
              </span>
            </p>
          </div>
        </section>
      ))}
      {restaurant && (
        <div className="flex gap-3 justify-center p-5">
          <Button ghost onClick={deletePostResto} className="font-bold">
            Delete
          </Button>
          <Button
            ghost
            onClick={modifyPost}
            className="bg-silver text-black font-bold"
          >
            Modify
          </Button>
          {/* <Button
            neutral
            type="submit"
            className="bg-silver text-black font-bold"
          >
            Submit
          </Button> */}
        </div>
      )}
      {consumer && (
        <div className="text-center">
          <ButtonAnimatedGradient
            onClick={deletePostConsumer}
            content={"Remove"}
            className="font-bold"
          />
        </div>
      )}
    </div>
  );
};

export default Post;

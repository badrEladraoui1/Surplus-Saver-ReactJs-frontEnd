/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// HomePost.js

import { api } from "../../Utils/backendApi";
import axios from "axios";
import { useState } from "react";
import useProfilePic from "../../hooks/useProfilePic";

import LoadingImage from "../UI/LoadingImage";
import InterestedPostModal from "../UI/InterestedPostModal";

import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import ButtonBackgroundShine from "./ButtonBackgroundShine ";
import Toast from "./Toast";
import Menu from "../UI/Menu";

const HomePost = ({ post, consumer, restaurant }) => {
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/${post.userProfilePictureUrl}`,
          {
            responseType: "blob",
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        const imageUrl = URL.createObjectURL(response.data);
        setImageURL(imageUrl);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [post.userProfilePictureUrl]);

  const profilePic = useProfilePic();

  const { userPhone } = useContext(UserContext);
  const [toastInfo, setToastInfo] = useState(null);

  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/posts/${post.id}/reactions`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setReactions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReactions();
  }, [post.id]);

  const savePost = async () => {
    try {
      const response = await axios.post(
        `${api}/SurplusSaverApiV1/posts/savePost/${post.id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      if (response.data === "Post is already saved!") {
        setToastInfo({ type: "info", message: "Post is already saved!" });
        setTimeout(() => setToastInfo(null), 3000);
        return;
      }
      setToastInfo({ type: "success", message: "Post saved successfully!" });
      setTimeout(() => setToastInfo(null), 3000);
    } catch (error) {
      console.error(error);
      setToastInfo({ type: "error", message: "Failed to save post." });
      setTimeout(() => setToastInfo(null), 3000);
    }
  };

  return (
    <div className="border-4 border-[#8f96a2] p-6 my-6 rounded-lg">
      <div className="flex gap-5 space-y-3">
        <div className="border-4 border-[#8f96a2] p-3 my-3 rounded-md">
          {isLoading ? (
            <LoadingImage className="size-[18rem]" />
          ) : error ? (
            <div className="size-[18rem]">Error: {error}</div>
          ) : (
            <img className="size-[18rem]" src={imageURL} />
          )}
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <h2 className="text-4xl font-bold text-green-500 mb-10">
            Restaurant&apos;s Name :{" "}
            <span className="italic text-[#bec6d5] ">
              {post.restaurantName}
            </span>
          </h2>
          <h2 className="text-2xl font-bold text-green-500 mb-4">
            Posted at : <span className="text-[#8f96a2]">{post.postedAt}</span>
          </h2>
          <h2 className="text-2xl font-bold text-green-500 mb-4">
            Restaurant&apos;s Phone:{" "}
            <span className="text-[#8f96a2]">{userPhone}</span>
          </h2>
          <p className=" text-2xl font-bold text-green-500 mb-4">
            Post Description:{" "}
            <span className="text-[#8f96a2]">{post.postDescription}</span>
          </p>
        </div>
      </div>

      {post.items.map((item, index) => (
        <section className="flex flex-col" key={item.id}>
          <div className="border border-gray-300 p-4 my-4 rounded-md bg-gray-50">
            <h3 className="text-3xl font-bold text-gray-600 mb-2">
              ITEM {index + 1} :{" "}
              <span className="underline-offset-4">
                <span className="italic text-3xl font-extrabold">
                  {item.itemName}
                </span>
              </span>
            </h3>
            <p className="text-2xl text-gray-500 font-bold">
              Type:{" "}
              <span className="text-black font-mono">{item.itemType}</span>
            </p>
            <p className="text-2xl text-gray-500 font-bold">
              Quantity:{" "}
              <span className="text-black font-mono">{item.quantity}KG</span>
            </p>
            <p className="text-2xl text-gray-500 font-bold">
              Description:{" "}
              <span className="text-black font-mono">{item.description}</span>
            </p>
          </div>
        </section>
      ))}
      <div className="flex justify-center">
        {consumer && (
          <div className="flex justify-between border-4 border-[#8f96a2] p-5 rounded-lg">
            <div className="inline-block">
              <ButtonBackgroundShine
                content="I am interested"
                onClick={openModal}
              />
              <InterestedPostModal
                isModalOpen={isModalOpen}
                onCloseModal={closeModal}
                restaurantName={post.restaurantName}
                postId={post.id}
              />
            </div>
            <Menu className="mx-10" postId={post.id} reactions={reactions} />
            <div className="inline-block">
              <ButtonBackgroundShine onClick={savePost} content="Save post" />
            </div>
          </div>
        )}
      </div>
      {toastInfo && (
        <Toast
          content={toastInfo.message}
          success={toastInfo.type === "success"}
          info={toastInfo.type === "info"}
          error={toastInfo.type === "error"}
        />
      )}
    </div>
  );
};

export default HomePost;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// HomePost.js

import { api } from "../../Utils/backendApi";
import axios from "axios";
import { useState } from "react";

import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ButtonBackgroundShine from "./ButtonBackgroundShine ";
import ButtonShadowGradient from "./ButtonShadowGradient";
import Toast from "./Toast";

const HomePost = ({ post, consumer }) => {
  const { userPhone } = useContext(UserContext);
  const [toastInfo, setToastInfo] = useState(null);

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
    <div className="border border-gray-300 p-6 my-6 rounded-md">
      <h2 className="text-xl font-bold text-green-500 mb-4">
        Restaurant&apos;s Name : {post.restaurantName}
      </h2>
      <h2 className="text-2xl font-bold text-green-500 mb-4">
        Posted at : {post.postedAt}
      </h2>
      <h2 className="text-2xl font-bold text-green-500 mb-4">
        Restaurant&apos;s Phone: {userPhone}
      </h2>

      <p className=" mb-4">Post Description: {post.postDescription}</p>
      {post.items.map((item, index) => (
        <section className="flex flex-col" key={item.id}>
          <div className="border border-gray-300 p-4 my-4 rounded-md bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              ITEM {index + 1}: {item.itemName}
            </h3>
            <p className="text-sm text-gray-500">Type: {item.itemType}</p>
            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            <p className="text-sm text-gray-500">
              Description: {item.description}
            </p>
          </div>
        </section>
      ))}
      <div className="flex justify-end">
        {consumer && (
          <div className="inline-block">
            <ButtonBackgroundShine onClick={savePost} content="Save post" />
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

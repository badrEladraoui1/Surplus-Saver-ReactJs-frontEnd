import { useState, useEffect } from "react";
import { api } from "../Utils/backendApi";
import axios from "axios";

import Post from "../components/UI/Post";

const ConsumerSavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const getSavedPosts = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/posts/getSavedPosts`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setSavedPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getSavedPosts();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-green text-3xl font-bold mb-4 text-center">
        Saved Posts
      </h1>
      <p className=" mb-8 text-center font-bold">
        Here are all the posts you&apos;ve saved. You can view them at any time.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {savedPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ConsumerSavedPosts;

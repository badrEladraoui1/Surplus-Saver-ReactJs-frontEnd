import { useState, useEffect } from "react";
import { api } from "../Utils/backendApi";
import axios from "axios";

import Loading from "../components/UI/Loading";

import Post from "../components/UI/Post";
import TextShine from "../components/UI/TextShine";

const ConsumerSavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSavedPosts = async () => {
      setIsLoading(true);
      setError(null);
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
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getSavedPosts();
  }, []);

  const handleDelete = (id) => {
    setSavedPosts(savedPosts.filter((post) => post.id !== id));
  };

  if (isLoading) {
    return <Loading className="text-silver" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <TextShine
        content="Saved Posts"
        className="text-5xl font-bold text-center"
      />
      {/* <h1 className="text-green text-3xl font-bold mb-4 text-center">
        Saved Posts
      </h1> */}
      {/* <p className="mb-8 text-center font-bold">
        {savedPosts.length > 0
          ? `Here are all the posts you've saved. You can view them at any time.`
          : `You haven't saved any posts yet. Save a post to view it here.`}
      </p> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-3">
        {savedPosts.map((post) => (
          <Post
            consumer={true}
            key={post.id}
            post={post}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsumerSavedPosts;

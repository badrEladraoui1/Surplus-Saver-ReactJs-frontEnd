import { useState, useEffect } from "react";
import { api } from "../Utils/backendApi";
import axios from "axios";

import Loading from "../components/UI/Loading";

import Post from "../components/UI/Post";
import TextShine from "../components/UI/TextShine";
import EmptyAnim from "../components/UI/EmptyAnim";

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
    <div className="flex flex-col justify-center items-center gap-3">
      <TextShine
        content="Saved Posts"
        className="text-5xl font-bold text-center"
      />
      <div className="flex flex-col justify-center items-center">
        {savedPosts.length > 0 ? (
          savedPosts.map((post) => (
            <Post
              consumer={true}
              key={post.id}
              post={post}
              onDelete={handleDelete}
            />
          ))
        ) : (
          // <p className="font-bold text-2xl">No Saved Posts yet ...</p>
          <div>
            <p className="font-bold text-2xl">No Saved Posts yet :(</p>
            <EmptyAnim />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerSavedPosts;

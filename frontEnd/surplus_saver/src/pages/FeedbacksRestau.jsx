import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../Utils/backendApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";

import PostLoading from "../components/UI/PostLoading";

const FeedbacksRestau = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reactionIcons = {
    handHoldingHeart: faHandHoldingHeart,
    thumbsUp: faThumbsUp,
    thumbsDown: faThumbsDown,
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/posts/reactions`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <PostLoading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="m-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-orange">Feedbacks</h1>
        <p className="text-xl mb-8">
          Here you can see all the feedbacks received for your posts.
        </p>
      </div>

      {posts ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="mb-4 border border-white p-2 rounded w-[40rem]"
          >
            <h2 className=" text-2xl font-bold m-3">
              Post Description:{" "}
              <span className="underline">{post.postDescription}</span>
            </h2>
            <div className="flex flex-col">
              {post.reactions.map((reaction, index) => (
                <p key={index} className="text-xl flex gap-2 p-2">
                  You got a{" "}
                  <FontAwesomeIcon
                    className="size-[1rem] text-yellow p-2 border-2 border-yellow rounded-full"
                    icon={reactionIcons[reaction.type]}
                  />{" "}
                  reaction from{" "}
                  <span className="text-emerald-400 font-bold">
                    {reaction.username}
                  </span>
                </p>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No feedbacks yet</p>
      )}
    </div>
  );
};

export default FeedbacksRestau;

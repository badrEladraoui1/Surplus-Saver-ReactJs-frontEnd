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

import TextShine from "../components/UI/TextShine";
import EmptyAnim from "../components/UI/EmptyAnim";

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
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* <h1 className="text-4xl font-bold mb-4 text-orange">Feedbacks</h1> */}
        <TextShine
          content="Feedbacks"
          className="text-5xl font-bold text-center"
        />
        {/* <p className="font-bold text-2xl">
          {posts.length === 0 && <p> No feedbacks yet :( </p>}
        </p> */}
        <p className="font-bold text-2xl">
          {posts.length === 0 && (
            <div>
              <p>No feedbacks yet :(</p>
              <EmptyAnim />
            </div>
          )}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {posts &&
          posts.map((post) => (
            <div
              key={post.id}
              className="mb-4 border-4 border-silver p-2 rounded-lg w-[40rem] flex flex-col gap-2 bg-silver bg-opacity-10"
            >
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold m-3">
                  The post described by :{" "}
                </h2>
                <span className="text-black font-mono text-2xl font-bold m-3">
                  {post.postDescription}
                </span>
              </div>
              <div className="flex flex-col">
                {post.reactions.map((reaction, index) => (
                  <p key={index} className="text-xl flex gap-2 p-2">
                    <FontAwesomeIcon
                      className="size-[1rem] text-silver p-2 border-2 border-black rounded-full"
                      icon={reactionIcons[reaction.type]}
                    />{" "}
                    reaction from{" "}
                    <span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-xl text-transparent font-bold">
                      {reaction.username}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedbacksRestau;

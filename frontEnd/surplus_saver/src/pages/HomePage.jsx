/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { api } from "../Utils/backendApi";
import HomePost from "../components/UI/HomePost";
import PostLoading from "../components/UI/PostLoading";
import { UserContext } from "../contexts/UserContext";
import TextShine from "../components/UI/TextShine";
import EmptyAnim from "../components/UI/EmptyAnim"; // Import EmptyAnim

const HomePage = ({ restaurant, consumer }) => {
  const { searchResults } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/posts/getAllPosts`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const memoizedPosts = useMemo(() => {
    return searchResults.length > 0 ? searchResults : posts;
  }, [searchResults, posts]);

  if (isLoading) {
    return <PostLoading />;
  }
  if (error) {
    return <div className="text-red-500 font-bold text-xl">Error: {error}</div>;
  }

  return (
    <div className="p-20 flex flex-col">
      <div className="text-center">
        <TextShine
          content="HomePage"
          className="text-4xl font-bold text-pink m-4"
        />
      </div>
      {memoizedPosts.length > 0 ? (
        memoizedPosts.map((post) => (
          <HomePost
            key={post.id}
            post={post}
            consumer={consumer}
            restaurant={restaurant}
          />
        ))
      ) : (
        <div>
          <p className="font-bold text-2xl">
            No posts. Still waiting for someone to post ...
          </p>
          <EmptyAnim />
        </div>
      )}
    </div>
  );
};

export default HomePage;

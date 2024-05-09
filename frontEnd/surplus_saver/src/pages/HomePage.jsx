/* eslint-disable no-unused-vars */
// HomePage.js
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../Utils/backendApi";
import HomePost from "../components/UI/HomePost";
import PostLoading from "../components/UI/PostLoading";

// eslint-disable-next-line react/prop-types
const HomePage = ({ restaurant, consumer }) => {
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

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${api}/SurplusSaverApiV1/posts/getAllPosts`,
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //           },
  //         }
  //       );

  //       setPosts(response.data);
  //       setIsLoading(false);

  //       // Extract userProfilePictureUrl from the first post
  //       const userProfilePictureUrl = response.data[0].userProfilePictureUrl;
  //       console.log(userProfilePictureUrl);

  //       // Fetch the image
  //       const imageResponse = await axios.get(
  //         `${api}/SurplusSaverApiV1/${userProfilePictureUrl}`,
  //         {
  //           responseType: "blob", // Important
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //           },
  //         }
  //       );

  //       // Create a URL for the image
  //       const imageUrl = URL.createObjectURL(imageResponse.data);

  //       // Set the image URL in the state
  //       setImageURL(imageUrl);
  //     } catch (error) {
  //       setError(error.message);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  if (isLoading) {
    return <PostLoading />;
  }
  if (error) {
    return <div className="text-red-500 font-bold text-xl">Error: {error}</div>;
  }

  return (
    <div className="p-20 flex flex-col">
      <h1 className="text-2xl font-bold text-pink text-center m-4">HomePage</h1>
      <p className=" mb-4 text-center">
        Welcome to the HomePage! This page displays all the posts from various
        restaurants. Each post includes details about the restaurant and the
        items they offer. Browse through the posts to find the best deals!
      </p>
      {posts.map((post) => (
        <HomePost
          key={post.id}
          post={post}
          consumer={consumer}
          restaurant={restaurant}
        />
      ))}
    </div>
  );
};

export default HomePage;

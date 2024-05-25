/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// // HomePage.js

// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { api } from "../Utils/backendApi";
// import HomePost from "../components/UI/HomePost";
// import PostLoading from "../components/UI/PostLoading";
// import { UserContext } from "../contexts/UserContext"; // Import UserContext
// import TextShine from "../components/UI/TextShine";

// // eslint-disable-next-line react/prop-types
// const HomePage = ({ restaurant, consumer }) => {
//   const { searchResults } = useContext(UserContext);
//   console.log(searchResults);

//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `${api}/SurplusSaverApiV1/posts/getAllPosts`,
//           {
//             headers: {
//               Authorization: localStorage.getItem("token"),
//             },
//           }
//         );

//         setPosts(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (isLoading) {
//     return <PostLoading />;
//   }
//   if (error) {
//     return <div className="text-red-500 font-bold text-xl">Error: {error}</div>;
//   }

//   return (
//     <div className="p-20 flex flex-col">
//       {/* <h1 className="text-2xl font-bold text-pink text-center m-4">HomePage</h1> */}
//       <div className="flex flex-col justify-center items-center">
//         <TextShine
//           content="HomePage"
//           className="text-4xl font-bold text-pink text-center m-4"
//         />
//         {/* <p className=" mb-4 text-center font-bold">
//           Welcome to the HomePage! This page displays all the posts from various
//           restaurants. Each post includes details about the restaurant and the
//           items they offer. Browse through the posts to find the best deals!
//         </p> */}
//       </div>
//       {searchResults.length > 0
//         ? searchResults.map(
//             (
//               post // If searchResults is truthy, display searchResults
//             ) => (
//               <HomePost
//                 key={post.id}
//                 post={post}
//                 consumer={consumer}
//                 restaurant={restaurant}
//               />
//             )
//           )
//         : posts.map(
//             (
//               post // Otherwise, display posts
//             ) => (
//               <HomePost
//                 key={post.id}
//                 post={post}
//                 consumer={consumer}
//                 restaurant={restaurant}
//               />
//             )
//           )}
//     </div>
//   );
// };

// export default HomePage;

import { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { api } from "../Utils/backendApi";
import HomePost from "../components/UI/HomePost";
import PostLoading from "../components/UI/PostLoading";
import { UserContext } from "../contexts/UserContext";
import TextShine from "../components/UI/TextShine";

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
      {memoizedPosts.map((post) => (
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

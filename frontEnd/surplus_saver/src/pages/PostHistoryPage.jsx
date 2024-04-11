import { useEffect, useState } from "react";
import axios from "axios";

import { api } from "../Utils/backendApi";

const PostHistoryPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/posts/viewPersonalPosts`,
          {
            headers: {
              Authorization: localStorage.getItem("token"), // replace with the way you store your token
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-3xl">PostHistoryPage</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.restaurantName}</h2>
          <p>{post.postDescription}</p>
          {post.user && <h3>Posted by: {post.user.username}</h3>}{" "}
          {/* Assuming user object has a username property */}
          {post.items && (
            <ul>
              {post.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <h4>{item.itemName}</h4>
                  <p>Type: {item.itemType}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Description: {item.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostHistoryPage;

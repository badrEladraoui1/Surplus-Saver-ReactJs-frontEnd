import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/UI/Button";
import { api } from "../Utils/backendApi";

const PostHistoryPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApi/restaurants/viewPersonalPosts`,
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">PostHistoryPage</h1>
      <p className="mb-4">
        This page displays all your posts. You can modify or delete each post
        using the buttons provided.
      </p>
      {posts.map((post, index) => (
        <div key={index} className="mb-6 p-4 border rounded shadow">
          <h2 className="text-2xl font-bold mb-2">{post.restaurantName}</h2>
          <p className="mb-2">{post.postDescription}</p>
          {post.items && (
            <ul className="list-disc pl-5">
              {post.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-2">
                  <h4 className="font-bold">{item.itemName}</h4>
                  <p>Type: {item.itemType}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Description: {item.description}</p>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-3 justify-center p-5">
            <Button info onClick={() => console.log("Modify post")}>
              Modify
            </Button>
            <Button warning onClick={() => console.log("Delete post")}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostHistoryPage;

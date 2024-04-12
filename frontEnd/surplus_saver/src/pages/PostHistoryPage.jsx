// PostHistoryPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../Utils/backendApi";
import Post from "../components/UI/Post";
import Loading from "../components/UI/Loading";

const PostHistoryPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${api}/SurplusSaverApiV1/posts/viewPersonalPosts`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-yellow text-center">
        PostHistoryPage
      </h1>
      <p className="mb-4">
        This page displays all your posts. You can modify or delete each post
        using the buttons provided.
      </p>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} onDelete={handleDelete} />
        ))
      ) : (
        <p className="text-center text-4xl">No posts yet.</p>
      )}
    </div>
  );
};

export default PostHistoryPage;

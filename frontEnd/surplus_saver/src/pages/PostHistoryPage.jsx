// PostHistoryPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../Utils/backendApi";
import Post from "../components/UI/Post";
import Loading from "../components/UI/Loading";
import TextShine from "../components/UI/TextShine";
import EmptyAnim from "../components/UI/EmptyAnim";

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
    <div className="p-6 flex flex-col justify-center items-center gap-5">
      <TextShine
        content="Post History"
        className="text-5xl font-bold text-center"
      />
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            restaurant={true}
            key={post.id}
            post={post}
            onDelete={handleDelete}
          />
        ))
      ) : (
        // <p className="text-center text-4xl">No posts yet.</p>
        <div>
          <p className="font-bold text-2xl">No posts yet. :(</p>
          <EmptyAnim />
        </div>
      )}
    </div>
  );
};

export default PostHistoryPage;

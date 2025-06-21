import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/posts.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null); // store logged-in user id

  useEffect(() => {
    // Fetch posts
    axios
      .get("https://blog-app-backend-tmqo.onrender.com/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
    // Fetch logged-in user id from token
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id); // matches JWT payload
    }
  }, []);
    const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete posts.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await axios.delete(`https://blog-app-backend-tmqo.onrender.com/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      alert(error.response?.data?.error || "Error deleting post");
    }
  };

  return (
    <div className="posts-container">
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>by: {post.author?.username || "Unknown"}</small>
            {userId === post.author?._id && (
              <div className="post-actions">
                <Link to={`/edit/${post._id}`} className="edit-btn">Edit</Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
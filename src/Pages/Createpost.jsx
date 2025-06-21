import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css"; 

const Createpost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in to create a post");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "https://blog-app-backend-tmqo.onrender.com/api/posts",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/"); // Go back to home after creating
    } catch (error) {
      alert(error.response?.data?.error || "Error creating post");
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
        ></textarea>
        <button type="submit">Publish</button>
      </form>
    </div>
  )
}

export default Createpost

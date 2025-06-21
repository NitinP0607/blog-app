import React from 'react'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/forms.css"


const Editpost = () => {

    const { id } = useParams();
  const navigate = useNavigate();


   const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch existing post data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        alert("Error loading post");
        navigate("/"); // go back home if error
      });
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must log in to edit posts.");

    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/"); // go back home after save
    } catch (error) {
      alert(error.response?.data?.error || "Error updating post");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default Editpost

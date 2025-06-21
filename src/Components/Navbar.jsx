import React from "react";
import {Link, useNavigate } from "react-router-dom";
import "../Components/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="navbar">
    <div className="log">
      <h1>Blog</h1>
    </div>
    <nav>
      <Link to="/">Home</Link>
      {token ? (
        <>
          <Link to="/create">New Post</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
    </div>
  )
};

export default Navbar;

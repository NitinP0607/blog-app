import React from 'react'
import './Styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import CreatePost from './Pages/Createpost'
import Editpost from './Pages/Editpost'


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreatePost />} />
           <Route path="/edit/:id" element={<Editpost />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

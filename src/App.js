import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./componet/Header";
import Auth from "./componet/Auth";
import BlogDetailes from "./componet/BlogDetailes";
import Blogs from "./componet/Blogs";
import UserBlogs from "./componet/UserBlogs";
import React from "react";
import AddBlogs from "./componet/AddBlogs";
import Login from "./componet/Login";
function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/edit/:id" element={<BlogDetailes />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/addblog" element={<AddBlogs />} />
          <Route path="/userblogs" element={<UserBlogs />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;

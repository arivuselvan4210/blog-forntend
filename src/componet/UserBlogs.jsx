import axios from "axios";
import { getUser } from "../api/api";
import React, { useEffect, useState } from "react";
import Blog from "./Blogg";

const UserBlogs = () => {
  const [blog, setblog] = useState([]);
  const id = localStorage.getItem("user");
  const isuser = id === blog._id;

  const sentrequsest = async () => {
    const data = await axios
      .get(`${getUser}/${id}`)
      .then((data) => setblog(data.data))
      .catch((err) => console.log(err));
    return data;
  };
  useEffect(() => {
    sentrequsest();
  }, [blog]);
  return (
    <div>
      {blog &&
        blog.blogs &&
        blog.blogs.map((blogs, index) => (
          <Blog
            id={blogs._id}
            key={index}
            titale={blogs.titale}
            img={blogs.img}
            desc={blogs.desc}
            isuser={isuser}
            username={blog.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;

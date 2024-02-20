import React, { useEffect, useState } from "react";
import Blog from "./Blogg";
import axios from "axios";
const Blogs = () => {
  const [blog, setblog] = useState("");

  const sentreq = async () => {
    const data = await axios
      .get("http://localhost:5000/blog/getall")

      .catch((err) => console.log(err));
    return data;
  };
  useEffect(() => {
    sentreq().then((data) => setblog(data.data));
  }, [blog]);

  return (
    <div>
      {blog &&
        blog.map((blogs, index) => (
          <Blog
            isuser={localStorage.getItem("user") === blogs.user._id}
            titale={blogs.titale}
            img={blogs.img}
            desc={blogs.desc}
            username={blogs.user.name}
            key={index}
            id={blogs._id}
          />
        ))}
    </div>
  );
};

export default Blogs;

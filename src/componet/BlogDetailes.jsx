import React, { useEffect, useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getBlog, updateBlog } from "../api/api";
const BlogDetailes = () => {
  const id = useParams().id;
  const histroy = useNavigate();
  const [blogs, setblogs] = useState({
    titale: "",
    desc: "",
    user: localStorage.getItem("user"),
  });
  useEffect(() => {
    axios.get(`${getBlog}/${id}`).then((res) => setblogs(res.data.blogs));
  }, [id]);

  const sentreqest = async () => {
    const data = await axios
      .put(`${updateBlog}/${id}`, {
        titale: blogs.titale,
        desc: blogs.desc,
        user: blogs.user,
      })
      .catch((err) => console.log(err));
    return data;
  };

  const handelChange = (e) => {
    setblogs((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    sentreqest().then(() => histroy("/userblogs"));
  };
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <Box
          border={3}
          borderRadius={10}
          padding={3}
          margin={"auto"}
          marginTop={2}
          display={"flex"}
          flexDirection={"column"}
          boxShadow={"10px 10px 20px #ccc"}
          width={"80%"}
        >
          <Typography variant="h4" textAlign={"center"}>
            Post Your Blog
          </Typography>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px" }}>Title</InputLabel>
          <TextField
            value={blogs.titale}
            name="titale"
            onChange={handelChange}
            variant="outlined"
          />
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px" }}>
            Description
          </InputLabel>

          <TextField
            value={blogs.desc}
            name="desc"
            onChange={handelChange}
            variant="outlined"
          />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default BlogDetailes;

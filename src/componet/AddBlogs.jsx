import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlogs = () => {
  const history = useNavigate();
  const [blogs, setblogs] = useState({
    titale: "",
    desc: "",
    img: "",
    user: localStorage.getItem("user"),
  });
  const sentreqest = async () => {
    const data = await axios
      .post("https://blog-backend-1ou4.vercel.app/blog/add", {
        titale: blogs.titale,
        desc: blogs.desc,
        img: blogs.img,
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
    sentreqest().then(() => history("/userblogs"));
    // console.log(blogs);
  };
  return (
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
          value={blogs.tital}
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
        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px" }}>Image</InputLabel>

        <TextField
          value={blogs.img}
          name="img"
          onChange={handelChange}
          variant="outlined"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AddBlogs;

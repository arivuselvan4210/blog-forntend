import { Button, Box, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authacton } from "../store/intex";

const Auth = () => {
  const dispatch = useDispatch();
  const navigat = useNavigate();
  const [issing, setissing] = useState(false);
  const [inputs, setinputs] = useState({ name: "", email: "", password: "" });
  const sentrequst = async (type = "singin") => {
    await axios
      .post(`http://localhost:5000/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .then((res) => res.data)
      .then((data) => localStorage.setItem("user", data._id))
      .then(() => {
        navigat("/blog");
        dispatch(authacton.login());
      })
      .catch((err) => console.log(err));
  };
  const handelchange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const hanelsubmit = (e) => {
    e.preventDefault();
    if (issing) {
      sentrequst("singup");
    } else {
      sentrequst();
    }
  };

  return (
    <div>
      <form onSubmit={hanelsubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={5}
          gap={"1rem"}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
          maxWidth={400}
          margin={"auto"}
        >
          <Typography variant="h2">{!issing ? "login" : "singup"}</Typography>
          {issing && (
            <TextField
              name="name"
              value={inputs.name}
              onChange={handelchange}
              placeholder="name"
            />
          )}
          <TextField
            name="email"
            value={inputs.email}
            onChange={handelchange}
            placeholder="email"
            type="email"
          />
          <TextField
            name="password"
            value={inputs.password}
            onChange={handelchange}
            placeholder="password"
            type="password"
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button variant="contained" onClick={() => setissing(!issing)}>
            change to {issing ? "singin" : "singup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
